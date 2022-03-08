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
function ChatContainer(props) {
  const messages = useSelector(state => state.Reducers.message)
  const currentUser = useSelector(state => state.Reducers.user)
  const [newMessage, setNewMessage] = useState()
  const [files, setFiles] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const open1 = Boolean(anchorEl)
  const [open, setOpen] = React.useState(false)
  const loading = useSelector(state => state.Reducers.message_pending)
  const chatBody = useRef(null)
  const dispatch = useDispatch()
  const scrollChatToBottom = chatBody =>
    (chatBody.current.scrollTop = chatBody.current.scrollHeight)
  const handleOpen = () => setOpen(true)
  const { t } = useTranslation(['lang'])
  const [following, setFollowing] = useState([])
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    e.preventDefault()
    setAnchorEl(null)
    setOpen(false)
  }
  const handleFileInput = e => {
    setFiles(e.target.files)
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
    let users = JSON.parse(props.room.users)
    for (let i = 0; i < users.length; i++) {
      console.log(users[i])
      if (users[i].position === 'offical') {
        axios
          .post('/api/messageBot/send', {
            message: newMessage,
            room_id: props.room.id,
            user_id: users[i].user_id,
          })
          .then(res => {
            console.log(res.data)
          })
      }
    }
  }

  const sendMessage = () => {
    console.log(newMessage === '')
    if (newMessage == '') {
      // console.log(files);
      if (files && files.length >= 1) {
        // console.log(e.target.files);
        // return ;
        // setFiles(e.target.files);
        console.log(files)
        const formData = new FormData()
        formData.append('room_id', props.room.id)
        formData.append('user_id', props.user.id)
        if (files.length > 1) {
          for (let i = 0; i < files.length; i++) {
            formData.append('file[]', files[i])
          }
        } else {
          formData.append('file', files[0])
        }
        // console.log(files);
        axios
          .post('api/message/send', formData, {
            headers: { 'Content-Type': 'multipart/from-data' },
          })
          .then(response => {
            console.log(response)
            transBotChat()
            dispatch(getMessage(props.room.id))
          })
        setFiles(null)
      } else {
        return
      }
      return
    } else {
      axios
        .post('/api/message/send', {
          message: newMessage,
          room_id: props.room.id,
          user_id: props.user.id,
        })
        .then(res => {
          console.log(res.data)
          // setMessages([...messages, res.data]);
        })
      setNewMessage('')
    }
  }
  const onKeyPress = e => {
    if (e.key == 'Enter') {
      sendMessage()
    }
  }
  useEffect(() => {
    // console.log(files);
    if (files !== null) {
      // console.log(111111111111111);
      sendMessage()
    }
  }, [files])

  const inviteUser = room => {
    var users = JSON.parse(room.users)
    console.log(users)
    setOpen(true)
  }

  useEffect(() => {
    console.log(props.room)
    console.log('chat 컨테이너')
    if (props.room.id && props.user.id) {
      dispatch(getMessage(props.room.id))
      console.log(props.room.id)
    }
  }, [props.room, props.user])

  useEffect(() => {
    // console.log(messages);
    window.Echo.channel('chat').listen('.send-message', e => {
      dispatch({ type: 'ADD_MESSAGE', payload: { message: e.message } })
      // setMessages(messages => ([...messages, e.message]));
      scrollChatToBottom(chatBody)
    })
  }, [])

  return (
    <div className="w-full">
      {props.room.id ? (
        <div className=" w-full ">
          <RoomInviteUserModal
            following={following}
            room={props.room}
            open={open}
            user={props.user}
            handleClose={handleClose}
          />
          <div className="w-full flex  flex-col  flex-grow">
            <div class="flex flex-col h-full w-full bg-white p-2">
              <div class="flex flex-row items-center">
                <div class="flex items-center justify-center h-10 w-10 rounded-2xl bg-primary300 font-bold uppercase text-xl">
                  {props.room.title
                    ? props.room.title
                    : userName(props.room.types, props.room.users).substring(
                        0,
                        1
                      )}
                </div>
                <div class="flex flex-col ml-3">
                  <div class="font-bold text-sm">
                    {props.room.title
                      ? props.room.title
                      : userName(props.room.types, props.room.users)}
                  </div>
                  <div class="text-xs text-gray-500">온라인</div>
                </div>
                <div class="ml-auto">
                  <ul class="flex flex-row items-center space-x-2">
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center bg-primary300 hover:bg-primaryactive text-primarytext h-10 w-10 rounded-2xl"
                      >
                        <span>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center bg-primary300 hover:bg-primaryactive text-primarytext h-10 w-10 rounded-2xl"
                      >
                        <span>
                          <svg
                            class="w-5 h-5"
                            fill="currentColor"
                            stroke="none"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        class="flex items-center justify-center bg-primary300 hover:bg-primaryactive text-primarytext h-10 w-10 rounded-2xl"
                      >
                        <span>
                          <svg
                            class="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            ></path>
                          </svg>
                        </span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div
              ref={chatBody}
              className=" flex flex-col w-full h-[calc(100vh-230px)] overflow-y-auto p-2"
            >
              {loading && (
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
              )}
              {!loading && messages
                ? messages.map((message, index) => (
                    <>
                      <div>
                        {messages[index - 1] ? (
                          moment(messages[index].created_at)
                            .startOf('day')
                            .diff(
                              moment(messages[index - 1].created_at).startOf(
                                'day'
                              ),
                              'days'
                            ) > 0 ? (
                            <div className="p-3 font-bold">
                              <div class="relative flex py-5 items-center">
                                <div class="flex-grow border-t border-gray-400"></div>
                                <span class="flex-shrink mx-4 text-gray-400">
                                  <Moment format="yyyy-MM-DD dddd" local>
                                    {messages[index].created_at}
                                  </Moment>
                                </span>
                                <div class="flex-grow border-t border-gray-400"></div>
                              </div>
                            </div>
                          ) : null
                        ) : null}
                        {/* {moment(messages[index].created_at).diff(
                          messages[index + 1].created_at
                        )} */}
                      </div>
                      <Message
                        message={message}
                        user={props.user}
                        key={index}
                      />
                    </>
                  ))
                : null}
            </div>
            <div className=" w-full flex">
              {JSON.parse(props.room.users).findIndex(officalCheck) ? (
                <div class="flex flex-row  items-center  bottom-0 my-2 w-full">
                  <div class="ml-2 flex flex-row border-gray bg-white items-center w-full border rounded-3xl h-12 px-2">
                    <button class="focus:outline-none flex items-center justify-center h-10 w-10 hover:text-red-600 text-red-400 ml-1">
                      <svg
                        class="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                        ></path>
                      </svg>
                    </button>
                    <div class="w-full">
                      <input
                        value={newMessage || ''}
                        onKeyPress={onKeyPress}
                        onChange={e => setNewMessage(e.target.value)}
                        type="text"
                        class="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
                        placeholder="메세지를 입력해주세요"
                      />
                    </div>
                    <div class="flex flex-row">
                      <button class="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-blue-600  text-blue-400">
                        <svg
                          class="w-5 h-5 "
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          ></path>
                        </svg>
                      </button>
                      <button
                        id="capture"
                        class="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-green-600 text-green-400 ml-1 mr-2"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
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
        <div className="bg-blue-100 h-full flex-grow shadow-xl">
          메세지를 보내보세요
        </div>
      )}
    </div>
  )
}
export default ChatContainer
