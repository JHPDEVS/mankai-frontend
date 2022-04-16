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
import { IconButton } from '@mui/material'
import Header from '../../admin/layout/Header'
import Echo from 'laravel-echo'
import { getRooms } from '../../store/modules/getRoom'
import { CircularProgress } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
function Chat() {
  const [index, setIndex] = useState(0)
  const currentUser = useSelector(state => state.Reducers.user)
  const state = useSelector(state => state.Reducers.user)
  const rooms = useSelector(state => state.Reducers.rooms)
  const loading = useSelector(state => state.Reducers.room_pending)
  const [currentRoom, setCurrentRoom] = useState({})
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
    console.log(currentUser)
    if (currentUser) {
      dispatch(getRooms(currentUser.id))
    }
  }, [currentUser])

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      getRooms(currentUser.id)
      window.Echo.channel('user.' + currentUser.id).listen(
        '.send-message',
        e => {
          dispatch({
            type: 'ADD_MESSAGE_REVERSE',
            payload: { message: e.message },
          })
          dispatch({
            type: 'SET_ROOM_UPDATED_AT',
            payload: {
              updated_at: e.message.updated_at,
              last_message: e.message.message,
              room_id: e.message.room_id,
            },
          })
        }
      )
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
  const selectRoom = (e, room) => {
    //room setting room
    e.preventDefault()
    setCurrentRoom(room)
  }
  const selectChatRoom = (e, room) => {
    //chatting room choose
    e.preventDefault()
    console.log(room)
    dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: room } })
    dispatch({ type: 'CHAT_PAGE_ONE' })
    // setCurrentChatRoom(room)
  }

  const roomList = types => (
    <ul className="w-full h-full">
      {rooms && !loading
        ? rooms.map((room, index) => (
            <li
              className={
                room.type === types
                  ? 'room border-b flex w-full p-2 hover:bg-gray-100'
                  : 'hidden'
              }
              id={'room' + index}
              onClick={e => {
                selectChatRoom(e, room)
              }}
              key={room.id}
            >
              <img src="#" className="room" />
              <div className="room flex w-full justify-between ml-2">
                <div className="room truncate flex flex-col text-left">
                  <div className="bg-indigo">
                    {room.type === types
                      ? room.title
                        ? room.title
                        : userName(types, room.users)
                      : ''}{' '}
                    <span className="font-medium">
                      {types === 'group' ? JSON.parse(room.users).length : ''}
                    </span>
                  </div>
                  <span className="room text-xs ">{room.last_message}</span>
                </div>
                <IconButton
                  aria-controls={open1 ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open1 ? 'true' : undefined}
                  onClick={e => {
                    handleClick(e)
                    selectRoom(e, room)
                  }}
                  aria-label="more-vert"
                  size="small"
                >
                  <MoreVertIcon />
                </IconButton>
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
                  {/* <MenuItem onClick={(e) => {handleClose(e); deleteRoom(room); }}>{t("lang:DELETE")}</MenuItem> */}
                  <MenuItem onClick={deleteRoom}>{t('lang:DELETE')}</MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            </li>
          ))
        : null}
    </ul>
  )
  return (
    <>
      <div className="flex  h-screen overflow-hidden">
        {/* <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} /> */}
        <div className="relative flex flex-col flex-1 h-screen  overflow-y-hidden overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="w-full ">
            <div className=" bg-primarybg rounded-3xl flex relative ">
              <div className="sm:flex sm:flex-col w-full sm:w-1/4 md:w-1/4 border rounded-2xl bg-white sm:mr-5 p-3 text-gray-800 relative items-center text-center">
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
                    <TabPanel className="w-full py-2">
                      <div>{roomList('dm')}</div>
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
                      <div>{roomList('group')}</div>
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
