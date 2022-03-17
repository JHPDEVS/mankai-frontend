import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Sidebar from '../../admin/layout/Sidebar'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import ChatContainer from './ChatContainer'
import i18n from 'i18next'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { useTranslation } from 'react-i18next'
import * as React from 'react'
import ChatInviteModal from './ChatInviteModal'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Badge, IconButton } from '@mui/material'
import Header from '../../admin/layout/Header'
import Echo from 'laravel-echo'
import { getRooms } from '../../store/modules/getRoom'
import { CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Moment from 'react-moment'
import 'moment-timezone'
import moment from 'moment'
import { now } from 'moment'
function Chat() {
  const [index, setIndex] = useState(0)
  const currentUser = useSelector(state => state.Reducers.user)
  const state = useSelector(state => state.Reducers.user)
  const rooms = useSelector(state => state.Reducers.rooms)
  const loading = useSelector(state => state.Reducers.room_pending)
  const currentRoom = useSelector(state => state.Reducers.currentRoom)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const { t } = useTranslation(['lang'])
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const open1 = Boolean(anchorEl)
  const dispatch = useDispatch()
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = e => {
    e.preventDefault()
    setAnchorEl(null)
    setOpen(false)
  }
  useEffect(() => {
    if (currentUser) {
      const channel = window.Echo.channel('user.' + currentUser.id) // 채팅방 참여
        .listen('.send-message', e => {
          dispatch({
            type: 'ADD_MESSAGE_REVERSE',
            payload: {
              message: e.message,
            },
          })

          dispatch({
            type: 'SET_ROOM_UPDATED_AT',
            payload: {
              updated_at: e.message.updated_at,
              last_message: e.message.message,
              room_id: e.message.room_id,
            },
          })
        })
      return () => {
        channel.subscription.unbind(
          channel.eventFormatter.format('.send-message')
        )
      }
    }
  }, [currentUser])
  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      // console.log(currentUser.Reducers.user.following);
      dispatch(getRooms(currentUser.id))
    }
  }, [currentUser])

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      // console.log(currentUser.Reducers.user.following);
      getRooms(currentUser.id)
      // console.log(following);
    }
  }, [currentUser])

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
  const deleteRoom = e => {
    e.preventDefault()

    handleClose(e)
    axios
      .post('http://localhost:8000/api/room/check', {
        room: currentRoom,
        user_id: currentUser.id,
      })
      .then(res => {
        // dispatch(getRooms(currentUser.id))
        dispatch({ type: 'DELETE_ROOM', payload: { room: res.data } })
        dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: null } })
        // setCurrentChatRoom('')
      })
  }
  const selectChatRoom = (e, room) => {
    //chatting room choose
    e.preventDefault()
    console.log(room)
    if (currentRoom) {
      if (currentRoom.id != room.id) {
        dispatch({ type: 'CHAT_PAGE_ONE' })
        dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: room } })
      }
    } else {
      dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: room } })
      dispatch({ type: 'CHAT_PAGE_ONE' })
    }
    // setCurrentChatRoom(room)
  }

  const roomList = types => (
    <div className="w-full h-full ">
      {rooms && !loading
        ? rooms.map((room, index) => (
            <div
              className={
                room.type === types
                  ? room == currentRoom
                    ? 'room border-b flex w-full bg-active p-2 hover:bg-gray-100'
                    : 'room border-b flex w-full p-2 hover:bg-gray-100'
                  : 'hidden'
              }
              id={'room' + index}
              onClick={e => {
                selectChatRoom(e, room)
              }}
              key={room.id}
            >
              <div className="room flex w-4/5  ">
                <IconButton
                  className="inline-flex justify-center items-center group"
                  aria-haspopup="true"
                >
                  <div class="flex flex-row items-center text-center">
                    <div class="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                      <span> {userName(types, room.users).substr(0, 1)}</span>
                    </div>
                  </div>
                </IconButton>
                <div className="room truncate flex flex-col text-left">
                  <div className="flex">
                    {room.type === types ? (
                      room.title ? (
                        room.title
                      ) : (
                        <span className="mr-1 block overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                          {userName(types, room.users)}
                        </span>
                      )
                    ) : (
                      ''
                    )}{' '}
                    <span className=" mr-1 text-gray-400 font-semibold">
                      {types === 'group' ? JSON.parse(room.users).length : ''}
                    </span>
                  </div>

                  <span className="room text-sm text-left block overflow-hidden text-ellipsis whitespace-nowrap">
                    {room.last_message}
                  </span>
                </div>
              </div>
              <div className="flex flex-col  w-1/5 text-xs font-semibold">
                {moment(room.updated_at)
                  .startOf('day')
                  .diff(moment().startOf('day'), 'days') == 0 ? (
                  <Moment format="H:mm" local className="">
                    {room.updated_at}
                  </Moment>
                ) : (
                  <Moment format="MMMM Do" local className="">
                    {room.updated_at}
                  </Moment>
                )}

                <div className="flex flex-grow justify-center items-center">
                  <Badge
                    badgeContent={5}
                    color="error"
                    invisible={5 != 0 ? false : true}
                  ></Badge>
                </div>
              </div>
            </div>
          ))
        : null}
    </div>
  )
  return (
    <>
      <div className="flex  h-screen overflow-hidden">
        <div className="relative flex flex-col flex-1 h-screen  overflow-y-hidden overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full ">
            <div className=" bg-primarybg rounded-3xl flex relative ">
              <div className="sm:flex sm:flex-col w-full sm:w-1/4 md:w-1/4 border rounded-2xl bg-white shrink-0 p-3 text-gray-800 relative items-center text-center">
                <div className="w-full  sm:flex sm:justify-between p-2">
                  <span className="text-primarytext font-bold p-2">
                    {t('lang:MESSAGE')}
                  </span>
                  <button
                    onClick={handleOpen}
                    className="border bg-primary300  text-primarytext rounded-3xl p-2 hidden sm:block"
                  >
                    <AddIcon />
                  </button>
                </div>
                <div className="w-full h-full relative p-1">
                  <Tabs
                    className="w-full"
                    selectedIndex={index}
                    onSelect={index => setIndex(index)}
                  >
                    <TabList className="flex sm:flex bg-tabbg rounded-xl border ">
                      <Tab
                        className={
                          index === 0
                            ? 'w-1/2 p-2 border-primarytext bg-primary300 rounded-xl border text-primarytext'
                            : 'w-1/2 p-2 rounded-2xl'
                        }
                      >
                        <span>{t('lang:DM')}</span>
                      </Tab>
                      <Tab
                        className={
                          index === 1
                            ? 'w-1/2 p-2 border-primarytext bg-primary300 rounded-xl border text-primarytext'
                            : 'w-1/2 p-2 rounded-2xl'
                        }
                      >
                        <span>{t('lang:GROUP')}</span>
                      </Tab>
                    </TabList>
                    <TabPanel>
                      <div className="py-2">{roomList('dm')}</div>
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
                    </TabPanel>
                    <TabPanel>
                      <div className="py-2">{roomList('group')}</div>
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
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
              <div className="flex w-3/4  rounded-3xl sm:flex-col p-4 hidden mx-5 my-2 text-gray-800 relative sm:flex items-center text-center  bg-white sm:block">
                <ChatContainer />
              </div>
            </div>
          </div>
          <ChatInviteModal open={open} handleClose={handleClose} />
        </div>
      </div>
    </>
  )
}
export default Chat
