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
import MemosModal from './MemosModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMessage } from '../../store/modules/getMessage'
import Moment from 'react-moment'
import moment from 'moment'
import 'moment/locale/ko'
import MessageIcon from '@mui/icons-material/Message'
import InfiniteScroll from 'react-infinite-scroll-component'
function ChatContainer() {
  const messages = useSelector(state => state.Reducers.message)
  const currentUser = useSelector(state => state.Reducers.user)
  const currentChatRoom = useSelector(state => state.Reducers.currentRoom)
  const [newMessage, setNewMessage] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const open1 = Boolean(anchorEl)
  const [open, setOpen] = React.useState(false)
  const [open2, setOpen2] = React.useState(false)
  const loading = useSelector(state => state.Reducers.message_pending)
  const chatBody = useRef(null)
  const dispatch = useDispatch()
  const [toUsers, setToUsers] = React.useState([]);
  const [toUser, setToUser] = useState({})
  const chatCurrentPage = useSelector(state => state.Reducers.chat_current_page)
  const chatInfHandle = useSelector(state => state.Reducers.chat_inf_handle)
  const [infHandle, setInfHandle] = useState(true)
  const scrollChatToBottom = chatBody =>
    (chatBody.current.scrollTop = chatBody.current.scrollHeight)
  const handleOpen = () => setOpen(true)
  const { t } = useTranslation(['lang'])
  // 라라벨 에서 데이터 받아 state 저장
  const loadMessage = () => {
    axios
      .get('/api/messages/' + currentChatRoom.id + '?page=' + chatCurrentPage)
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
  
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }


  const handleClose = e => {
    e.preventDefault()
    setAnchorEl(null)
    setOpen(false)
    setOpen2(false)
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
      }
      axios
        .post('api/message/send', formData, {
          headers: { 'Content-Type': 'multipart/from-data' },
        })
        .then(res => {
          console.log('파일 전송됨')
          e.target.value = ''
        })
    }
  }
  const officalCheck = user => {
    if (user.position === 'offical') {
      return true
    }
  }
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
          })
          .then(res => {
            console.log(res.data)
            console.log('번역봇가동')
          })
      }
    }
  }

  const sendMessage = () => {
    let toUsers = []
    for (let i = 0; i < toUser.length; i++) {
      toUsers.push(toUser[i]['user_id'])
    }
    axios
      .post('/api/message/send', {
        message: newMessage,
        room_id: currentChatRoom.id,
        to_users: toUsers,
        user_id: currentUser.id,
      })
      .then(res => {
        transBotChat()
      })
    setNewMessage('')
  }

  const onKeyPress = e => {
    if (e.key == 'Enter') {
      sendMessage()
    }
  }

  const inviteUser = () => {
    setOpen(true)
  }

  const memoModal = () => {
    setOpen2(true);
  }
  useEffect(() => {
    console.log(currentUser);
    if (currentUser) {
      window.Echo.channel('user.' + currentUser.id).listen(
        '.send-message',
        e => {
          scrollChatToBottom(chatBody)
        }
      )
    }
  }, [currentUser])
  useEffect(() => {
    console.log(currentChatRoom)
    console.log('chat 컨테이너')
    if (currentChatRoom && currentUser.id) {
      dispatch(getMessage(currentChatRoom.id, chatCurrentPage))
      let toUsers = JSON.parse(currentChatRoom.users)
      setToUser(toUsers)
    }
  }, [currentChatRoom, currentUser])
  return (
    <div className="w-full">
      {currentChatRoom ? (
        <div className=" w-full ">
          {/* <RoomInviteUserModal open={open} handleClose={handleClose} /> */}
          {/* <MemosModal open={open} handleClose={handleClose} /> */}
          <div className="w-full flex  flex-col  flex-grow">
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
                <div className="flex flex-col ml-3">
                  <div className="font-bold text-sm">
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
                        href="#"
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
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
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
                        aria-controls={open1 ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open1 ? 'true' : undefined}
                        onClick={e => {
                          handleClick(e)
                        }}
                        aria-label="more-vert"
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
                      <Menu
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                          vertical: 'top',
                          horizontal: 'right',
                        }}
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open1}
                        onClose={handleClose}
                        MenuListProps={{
                          'aria-labelledby': 'basic-button',
                        }}
                      >
                        <MenuItem
                          onClick={e => {
                            handleClose(e)
                            inviteUser()
                          }}
                        >
                          invite
                        </MenuItem>
                        <MenuItem onClick={handleClose}
                        >photos
                        </MenuItem>
                        <MenuItem 
                          onClick={ e => {
                            handleClose(e)
                            memoModal()
                          }}

                        >memos
                        </MenuItem>
                      </Menu>
                      <MemosModal open={open2} toUser={toUser} handleClose={handleClose} />
                      <RoomInviteUserModal
                        open={open}
                        handleClose={handleClose}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {messages ? (
              <div
                id="scrollableDiv"
                ref={chatBody}
                className=" flex flex-col-reverse w-full h-[calc(100vh-230px)] overflow-y-auto p-2"
              >
                {/*Put the scroll bar always on the bottom*/}
                <InfiniteScroll
                  dataLength={messages.length}
                  next={loadMessage}
                  style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
                  inverse={true} //
                  hasMore={chatInfHandle}
                  endMessage={
                    <p style={{ textAlign: 'center' }}>
                      <b>채팅 내역 없음</b>
                    </p>
                  }
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
                        <>
                          <Message message={message} key={message.id} />
                          <div>
                            {index == messages.length - 1 ? (
                              <div className="relative flex items-center">
                                <div className="flex-grow border-t border-gray-400"></div>
                                <span className="flex-shrink mx-4 text-gray-400">
                                  <Moment format="yyyy-MM-DD dddd" local>
                                    {messages[index].created_at}
                                  </Moment>
                                </span>
                                <div className="flex-grow border-t border-gray-400"></div>
                              </div>
                            ) : null}
                            {messages[index - 1] ? (
                              moment(messages[index].created_at)
                                .startOf('day')
                                .diff(
                                  moment(
                                    messages[index - 1].created_at
                                  ).startOf('day'),
                                  'days'
                                ) > 0 ? (
                                <div className="p-3 font-bold">
                                  <div className="relative flex py-5 items-center">
                                    <div className="flex-grow border-t border-gray-400"></div>
                                    <span className="flex-shrink mx-4 text-gray-400">
                                      <Moment format="yyyy-MM-DD dddd" local>
                                        {messages[index].created_at}
                                      </Moment>
                                    </span>
                                    <div className="flex-grow border-t border-gray-400"></div>
                                  </div>
                                </div>
                              ) : null
                            ) : null}
                          </div>
                        </>
                      ))
                    : null}
                </InfiniteScroll>
              </div>
            ) : null}

            <div className=" w-full flex">
              {JSON.parse(currentChatRoom.users).findIndex(officalCheck) ? (
                <div className="flex flex-row  items-center  bottom-0 my-2 w-full">
                  <div className="ml-2 flex flex-row border-gray bg-white items-center w-full border rounded-3xl h-12 px-2">
                    <button className="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1">
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

                      <button
                        id="capture"
                        className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-green-600 text-green-400 ml-1 mr-2"
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
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}
            </div>
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
