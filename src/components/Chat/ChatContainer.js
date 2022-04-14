import { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import Message from './Message'
import { CircularProgress, IconButton, Menu, MenuItem } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import AttachmentIcon from '@mui/icons-material/Attachment'
import SettingsIcon from '@mui/icons-material/Settings'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import RoomInviteUserModal from './RoomInviteUserModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMessage } from '../../store/modules/getMessage'
import Moment from 'react-moment'
import moment from 'moment'
import 'moment/locale/ko'
import MessageIcon from '@mui/icons-material/Message'
import InfiniteScroll from 'react-infinite-scroll-component'

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition
const mic = new SpeechRecognition()

mic.continuous = true
mic.interimResults = true
// mic.lang = 'ja'

function ChatContainer() {
  const messages = useSelector(state => state.Reducers.message)
  const currentUser = useSelector(state => state.Reducers.user)
  const currentChatRoom = useSelector(state => state.Reducers.currentRoom)
  const [newMessage, setNewMessage] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const isOpen = useSelector(state => state.Reducers.chat_side)
  const open1 = Boolean(anchorEl)
  const [open, setOpen] = React.useState(false)
  const loading = useSelector(state => state.Reducers.message_pending)
  const chatBody = useRef(null)
  const dispatch = useDispatch()
  const chatCurrentPage = useSelector(state => state.Reducers.chat_current_page)
  const chatInfHandle = useSelector(state => state.Reducers.chat_inf_handle)
  const [speechBoolean, setSpeechBoolean] = useState(false)
  const [speechList, setSpeechList] = useState(false)
  const [usersCountry, setUsersCountry] = useState([])
  const [checkLag, setCheckLag] = useState(null)
  const [sendSpeech, setSendSpeech] = useState(false)
  // const [toUser, setToUser] = useState({})
  const toUser = useSelector(state => state.Reducers.to_users)
  const scrollChatToBottom = chatBody =>
    (chatBody.current.scrollTop = chatBody.current.scrollHeight)
  const handleOpen = () => setOpen(true)
  const { t } = useTranslation(['lang'])
  const [isListening, setIsListening] = useState(false)
  const [speech, setSpeech] = useState(null)
  const [tempSpeech, setTempSpeech] = useState(null)
  const [sendNewMessage, setSendNewMessage] = useState(null)
  const chatScroll = document.getElementById('scrollableDiv')

  useEffect(() => {
    if (currentChatRoom) {
      document
        .getElementById('scrollableDiv')
        .addEventListener('scroll', handleScroll)

      return () => {
        document
          .getElementById('scrollableDiv')
          .removeEventListener('scroll', handleScroll)
      }
    }
  })

  const handleScroll = () => {
    if (document.getElementById('scrollableDiv').scrollTop == 0) {
      setSendNewMessage(null)
    }
  }

  // 라라벨 에서 데이터 받아 state 저장
  const loadMessage = () => {
    axios
      .get(
        '/api/messages/' +
          currentChatRoom.id +
          '/' +
          currentUser.id +
          '?page=' +
          (chatCurrentPage + 1)
      )
      .then(res => {
        // if (Array.isArray(res.data.data) && res.data.data.length === 0) {
        //   alert('없음 ㅠ')
        // }
        if (res.data.last_page == res.data.current_page) {
          dispatch({
            type: 'CHAT_PAGE_NOT',
          })
        } else {
          dispatch({ type: 'ADD_CHAT_PAGE' })
        }
        for (let i = 0; i < res.data.data.length; i++) {
          dispatch({
            type: 'ADD_MESSAGE',
            payload: { message: res.data.data[i] },
          })
          console.log(res.data.data[i])
        }
      })
  }

  useEffect(() => {
    if (sendSpeech) {
      console.log('보내기')
      if (window.confirm(`녹음을 보낼까요? ${tempSpeech} => ${speech}`)) {
        let toUsers = []
        for (let i = 0; i < toUser.length; i++) {
          toUsers.push(toUser[i]['user_id'])
        }
        axios
          .post('/api/message/send', {
            message: speech,
            room_id: currentChatRoom.id,
            to_users: toUsers,
            user_id: currentUser.id,
            type: 'message',
          })
          .then(res => {
            transBotChat()
          })
      }
      setCheckLag(null)
      setSendSpeech(false)
    }

    setSpeech(null)
  }, [sendSpeech, tempSpeech])
  const speechToText = () => {
    setSpeechList(!speechList)
    // console.log(speechBoolean);
  }

  const speechStart = lang => {
    setCheckLag(lang)
    setSpeechList(!speechList)
    setSpeechBoolean(!speechBoolean)
  }

  useEffect(() => {
    // console.log(speechBoolean);
    if (speechBoolean) {
      // console.log('start');
      mic.start()
      mic.onend = () => {
        console.log('continue..')
        mic.start()
      }
    } else {
      // console.log('stop');
      mic.stop()
      mic.onend = () => {
        console.log('stopped mic on click')
      }
      if (speech) {
        console.log(checkLag)
        setTempSpeech(speech)
        axios
          .post('api/translate/text', { country: checkLag, text: speech })
          .then(res => {
            setSpeech(res.data)
            setSendSpeech(true)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    mic.onstart = () => {
      console.log('mics on')
    }

    mic.onresult = event => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')
      // console.log(transcript)
      setSpeech(transcript)

      mic.onerror = event => {
        console.log(event.error)
      }
    }
  }, [speechBoolean])

  useEffect(() => {
    console.log(speech)
  }, [speech])
  useEffect(() => {
    if (currentChatRoom) {
      const channel = window.Echo.channel('room.' + currentChatRoom.id) // 채팅방 참여
        .listen('.send-message', e => {
          // e.message.read_users = "[]";
          dispatch({
            type: 'ADD_MESSAGE_REVERSE',
            payload: {
              message: e.message,
            },
          })
          if (
            document.getElementById('scrollableDiv').scrollTop != 0 &&
            e.message.user_id != currentUser.id
          ) {
            //메세지 왔을 때 밑에 띄워주는 newMsg에 메세지 저장
            if (
              e.message.type == 'message' ||
              e.message.type == 'group' ||
              e.message.type == 'video'
            ) {
              setSendNewMessage(e.message.message)
            } else if (e.message.type == 'file') {
              setSendNewMessage('파일이 도착했습니다')
            } else {
              setSendNewMessage('메모가 도착했습니다')
            }
          }
          dispatch({
            type: 'SET_ROOM_UPDATED_AT',
            payload: {
              updated_at: e.message.updated_at,
              last_message: e.message.message,
              room_id: e.message.room_id,
            },
          })

          if (e.message.type == 'file' || e.message.type == 'memo') {
            if (
              e.message.type == 'file' &&
              e.message.message.startsWith('[{')
            ) {
              dispatch({
                type: 'ADD_CHAT_SIDE_FILES',
                payload: {
                  files: e.message,
                },
              })
            } else if (
              e.message.message.startsWith('[') ||
              e.message.type == 'file'
            ) {
              dispatch({
                type: 'ADD_CHAT_SIDE_IMAGES',
                payload: {
                  images: e.message,
                },
              })
            } else {
              dispatch({
                type: 'ADD_CHAT_SIDE_MEMOS',
                payload: {
                  memos: e.message,
                },
              })
            }
          }
        })

      return () => {
        channel.subscription.unbind(
          channel.eventFormatter.format('.send-message')
        )
      }
    }
  }, [currentChatRoom])

  useEffect(() => {
    if (currentChatRoom) {
      const currentRoomUsersCountry = []
      for (let i = 0; i < JSON.parse(currentChatRoom.users).length; i++) {
        console.log(JSON.parse(currentChatRoom.users)[i].country)
        if (
          currentRoomUsersCountry.includes(
            JSON.parse(currentChatRoom.users)[i].country
          ) == false &&
          JSON.parse(currentChatRoom.users)[i].country != null
        ) {
          console.log(JSON.parse(currentChatRoom.users)[i].country)
          currentRoomUsersCountry.push(
            JSON.parse(currentChatRoom.users)[i].country
          )
        }
      }
      setUsersCountry(currentRoomUsersCountry)
    }
  }, [currentChatRoom])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    setAnchorEl(null)
    setOpen(false)
  }
  const handleFile = e => {
    if (e.target.files) {
      console.log(e.target.files)
      const formData = new FormData()
      formData.append('room_id', currentChatRoom.id)
      formData.append('user_id', currentUser.id)
      for (let i = 0; i < toUser.length; i++) {
        formData.append('to_users[]', toUser[i]['user_id'])
      }
      if (e.target.files.length > 1) {
        for (let i = 0; i < e.target.files.length; i++) {
          formData.append('file[]', e.target.files[i])
        }
      } else {
        formData.append('file', e.target.files[0])
        formData.append('type', 'file')
      }
      axios
        .post('api/message/send', formData, {
          headers: { 'Content-Type': 'multipart/from-data' },
        })
        .then(res => {
          console.log('파일 전송됨')
          if (document.getElementById('scrollableDiv').scrollTop != 0) {
            //메세지 왔을 때 밑에 띄워주는 newMsg에 메세지 저장
            document.getElementById('scrollableDiv').scrollTop =
              document.getElementById('scrollableDiv').scrollHeight
          }
          e.target.value = ''
        })
    }
  }
  const officalCheck = user => {
    if (user.position === 'offical') {
      return true
    }
  }

  const changeVideo = () => {
    window.location.href = 'http://localhost:3000/video/' + currentChatRoom.id
  }

  // useEffect(() => {

  // }[messages]);

  const userName = (types, users) => {
    users = JSON.parse(users)
    // console.log((users));
    users = users.filter((user, index) => user.user_id !== currentUser.id)
    if (types === 'dm') {
      return users[0].user_name
    } else {
      var userNames = ''
      users = users.map((user, index) =>
        index !== users.length - 1
          ? (userNames += user.user_name + ',')
          : (userNames += user.user_name)
      )
      return userNames
    }
  }
  const transBotChat = () => {
    let users = JSON.parse(currentChatRoom.users)
    for (let i = 0; i < users.length; i++) {
      if (users[i].position === 'official') {
        let toUsers = []
        for (let i = 0; i < toUser.length; i++) {
          toUsers.push(toUser[i]['user_id'])
        }
        axios
          .post('/api/messageBot/send', {
            message: newMessage,
            room_id: currentChatRoom.id,
            user_id: users[i].user_id,
            to_users: toUsers,
            type: 'message',
          })
          .then(res => {
            console.log(res.data)
            console.log('번역봇가동')
          })
      }
    }
  }

  const sendMessage = type => {
    let toUsers = []
    for (let i = 0; i < toUser.length; i++) {
      toUsers.push(toUser[i]['user_id'])
    }
    if (type == 'video') {
      axios
        .post('/api/message/send', {
          message: currentUser.name + '님이 화상채팅에 초대했습니다',
          room_id: currentChatRoom.id,
          to_users: toUsers,
          user_id: currentUser.id,
          type: type,
        })
        .then(res => {
          console.log(res.data)
          changeVideo()
        })
    } else {
      axios
        .post('/api/message/send', {
          message: newMessage,
          room_id: currentChatRoom.id,
          to_users: toUsers,
          user_id: currentUser.id,
          type: type,
        })
        .then(res => {
          console.log(res.data)
          transBotChat()
          if (document.getElementById('scrollableDiv').scrollTop != 0) {
            //메세지 왔을 때 밑에 띄워주는 newMsg에 메세지 저장
            document.getElementById('scrollableDiv').scrollTop =
              document.getElementById('scrollableDiv').scrollHeight
          }
        })
      setNewMessage('')
    }
  }

  const onKeyPress = e => {
    if (e.key == 'Enter') {
      sendMessage('message')
    }
  }

  const inviteUser = room => {
    var users = JSON.parse(room.users)
    console.log(users)
    setOpen(true)
  }
  const deleteRoom = e => {
    e.preventDefault()

    handleClose(e)
    axios
      .post('/api/room/check', {
        room: currentChatRoom,
        user_id: currentUser.id,
      })
      .then(res => {
        dispatch({ type: 'DELETE_ROOM', payload: { room: res.data } })
        dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: null } })
      })
  }

  useEffect(() => {
    console.log(currentChatRoom)
    console.log('chat 컨테이너')
    if (currentChatRoom && currentUser.id) {
      dispatch(getMessage(currentChatRoom.id, 1))
      // setFollowing(currentUser.following)
      let toUsers = JSON.parse(currentChatRoom.users)
      dispatch({ type: 'SET_TO_USERS', payload: { toUsers: toUsers } })
      mic.lang = currentUser.country

      // setToUser(toUsers)
    }
  }, [currentChatRoom, currentUser])
  return (
    <div className="w-full overflow-hidden">
      {currentChatRoom ? (
        <div className=" w-full ">
          <div className="w-full flex flex-col  flex-grow">
            <div className="flex flex-col h-full w-full bg-white p-2">
              <div className="flex flex-row items-center">
                <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-primary300 font-bold uppercase text-xl">
                  {currentChatRoom.title
                    ? currentChatRoom.title
                    : userName(
                        currentChatRoom.types,
                        currentChatRoom.users
                      ).substring(0, 1)}
                </div>
                <div className="flex flex-col ml-2 w-[70vh] ">
                  <div className=" text-left block overflow-hidden text-ellipsis whitespace-nowrap font-bold text-sm">
                    {currentChatRoom.title
                      ? currentChatRoom.title
                      : userName(currentChatRoom.types, currentChatRoom.users)}
                  </div>
                  <div className="text-left text-xs text-gray-500">온라인</div>
                </div>
                <div className="ml-auto">
                  <ul className="flex flex-row items-center space-x-2">
                    <li>
                      <a
                        // href={'video/'+currentChatRoom.id}
                        href="#"
                        onClick={e => {
                          sendMessage('video')
                        }}
                        className="flex items-center justify-center bg-primary300 hover:bg-primaryactive text-primarytext h-10 w-10 rounded-2xl"
                      >
                        <span>
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <button
                        onClick={() =>
                          isOpen
                            ? dispatch({ type: 'CHAT_SIDE_CLOSE' })
                            : dispatch({ type: 'CHAT_SIDE_OPEN' })
                        }
                        className="flex items-center justify-center bg-primary300 hover:bg-primaryactive text-primarytext h-10 w-10 rounded-2xl"
                      >
                        <span>
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </span>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {messages ? (
              <div
                id="scrollableDiv"
                ref={chatBody}
                className=" flex flex-col-reverse w-full relative h-[calc(100vh-230px)]  overflow-y-auto p-2"
              >
                {/*Put the scroll bar always on the bottom*/}
                <InfiniteScroll
                  dataLength={messages.length}
                  next={loadMessage}
                  style={{
                    display: 'flex',
                    flexDirection: 'column-reverse',
                    overflowX: 'hidden',
                  }} //To put endMessage and loader to the top.
                  inverse={true} //
                  hasMore={chatInfHandle}
                  loader={
                    <CircularProgress
                      size={48}
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginTop: '-24px',
                        marginLeft: '-24px',
                      }}
                    />
                  }
                  scrollableTarget="scrollableDiv"
                >
                  {!loading && messages
                    ? messages.map((message, index) => (
                        <div key={message.id}>
                          <div>
                            {index == messages.length - 1 ? (
                              <div
                                className="flex justify-center"
                                key={messages[index].created_at + index}
                              >
                                <span className=" flex-shrink p-1 text-white  bg-primary opacity-70 font-bold rounded-xl text-center">
                                  <Moment format="yyyy-MM-DD dddd" local>
                                    {messages[index].created_at}
                                  </Moment>
                                </span>
                              </div>
                            ) : null}
                          </div>
                          <Message
                            message={message}
                            key={message.id + message.user_id}
                          />
                          {messages[index - 1] ? (
                            moment(messages[index - 1].created_at)
                              .startOf('day')
                              .diff(
                                moment(messages[index].created_at).startOf(
                                  'day'
                                ),
                                'days'
                              ) > 0 ? (
                              <div
                                className="p-3 font-bold"
                                key={messages[index].id + message.room_id}
                              >
                                <div className="relative flex py-5 items-center">
                                  <div className="flex-grow border-t border-gray-400"></div>
                                  <span className="fon-bold flex-shrink p-1 text-white  bg-primary opacity-70 rounded-xl">
                                    <Moment format="yyyy-MM-DD dddd" local>
                                      {messages[index - 1].created_at}
                                    </Moment>
                                  </span>
                                  <div className="flex-grow border-t border-gray-400"></div>
                                </div>
                              </div>
                            ) : null
                          ) : null}
                        </div>
                      ))
                    : null}
                </InfiniteScroll>

                {speechBoolean ? (
                  <span className="rounded-xl bg-blue-300 p-2 absolute bottom-0">
                    인식중
                  </span>
                ) : (
                  <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                )}
                {speechList ? (
                  <div className="rounded-xl w-1/6 border p-1 absolute bottom-0">
                    {currentChatRoom
                      ? usersCountry.map((country, index) => (
                          <button
                            onClick={e => speechStart(country)}
                            className="bg-blue-300 w-1/3 text-white p-1 rounded-sm m-1"
                          >
                            {country}
                          </button>
                        ))
                      : ''}
                  </div>
                ) : (
                  <i class="fa-solid fa-spinner fa-spin-pulse"></i>
                )}
              </div>
            ) : null}

            <div className=" w-full flex ">
              {JSON.parse(currentChatRoom.users).findIndex(officalCheck) ? (
                <div className="flex flex-row  items-center  bottom-0 my-2 w-full">
                  <div className="ml-2 flex flex-row border-gray bg-white items-center w-full border rounded-3xl h-12 px-2">
                    {speechBoolean ? (
                      <button
                        onClick={e => setSpeechBoolean(!speechBoolean)}
                        className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          ></path>
                        </svg>
                      </button>
                    ) : (
                      <button
                        onClick={speechToText}
                        className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                          ></path>
                        </svg>
                      </button>
                    )}
                    <div className="w-full">
                      <input
                        value={newMessage || ''}
                        onKeyPress={onKeyPress}
                        onChange={e => setNewMessage(e.target.value)}
                        type="text"
                        className="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                        placeholder="메세지를 입력해주세요"
                      />
                    </div>
                    <div className="flex flex-row">
                      <label
                        className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-blue-600  text-blue-400"
                        htmlFor="input-file"
                      >
                        <svg
                          className="w-5 h-5 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          ></path>
                        </svg>
                      </label>
                      <input
                        type="file"
                        id="input-file"
                        className="hidden"
                        multiple
                        onChange={e => {
                          handleFile(e)
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
            {sendNewMessage ? (
              <button
                onClick={e =>
                  (document.getElementById('scrollableDiv').scrollTop = 0)
                }
                class="absolute bottom-20 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 bg-gray-300 rounded-xl opacity-50"
              >
                {sendNewMessage}
              </button>
            ) : (
              ''
            )}
          </div>
        </div>
      ) : (
        <div className=" flex flex-row w-full h-[calc(100vh-110px)] flex-grow ">
          <div className="m-auto ">
            <MessageIcon
              style={{ fontSize: 169 }}
              className="motion-safe:animate-bounce text-primary"
            />
            <div className="text-3xl text-primarytext font-bold">
              메세지 선택되지 않음
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ChatContainer
