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
import { Avatar, IconButton } from '@mui/material'
import Header from '../../admin/layout/Header'
import Echo from 'laravel-echo'
import { getRooms } from '../../store/modules/getRoom'
import { CircularProgress } from '@mui/material'
import Moment from 'react-moment'
import 'moment-timezone'

function Home() {
  const [index, setIndex] = useState(0)
  const currentUser = useSelector(state => state.Reducers.user)
  const state = useSelector(state => state.Reducers.user)
  const rooms = useSelector(state => state.Reducers.rooms)
  const loading = useSelector(state => state.Reducers.room_pending)
  const [currentRoom, setCurrentRoom] = useState({})
  const [currentChatRoom, setCurrentChatRoom] = useState({})
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const { t } = useTranslation(['lang'])
  const [following, setFollowing] = useState([])
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

  function newRoomList(newRoom) {
    //  setRooms([...rooms, newRoom]);
  }

  useEffect(() => {
    console.log(currentUser)
    if (currentUser) {
      // console.log(currentUser.Reducers.user.following);
      dispatch(getRooms(currentUser.id))
      setFollowing(currentUser.following)
      // console.log(following);
    }
  }, [currentUser])

  useEffect(() => {
    console.log(rooms)
  }, [rooms, currentRoom])

  const userName = (types, users) => {
    users = JSON.parse(users)
    // console.log((users));
    users = users.filter((user, index) => user.user_name !== currentUser.name)
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
    // setRooms(rooms.filter(room => room.id !== currentRoom.id));
    // console.log(currentRoom);
    // console.log(currentUser.Reducers.user);
    handleClose(e)
    axios
      .post('http://localhost:8000/api/room/check', {
        room: currentRoom,
        user_id: currentUser.Reducers.user.id,
      })
      .then(res => {
        console.log(res.data)
      })
  }
  const selectRoom = (e, room) => {
    //room setting room
    e.preventDefault()
    console.log(room)
    setCurrentRoom(room)
  }
  const selectChatRoom = (e, room) => {
    //chatting room choose
    e.preventDefault()
    console.log(room)
    setCurrentChatRoom(room)
  }
  const deleteChatRoom = e => {
    e.preventDefault()
    console.log(11)
    setCurrentChatRoom({})
  }
  const roomList = types => (
    <ul className="w-full h-full">
      {rooms
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
                  <div>
                    {room.type === types
                      ? room.title
                        ? room.title
                        : userName(types, room.users)
                      : ''}{' '}
                    <span className="font-medium">
                      {types === 'group' ? JSON.parse(room.users).length : ''}
                    </span>
                  </div>
                  <span className="room text-xs ">안녕하세요 안녕하세요</span>
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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <div className="flex">
          <div className="flex-1 flex flex-col min-h-[89vh] h-[89vh]">
            <div className="flex h-12">
              <div className="bg-white rounded-t-2xl w-56 flex-none flex items-center justify-between border-b border-gray-900 px-3 py-2">
                <div>Message</div>
                <button className="border rounded-3xl p-2 hidden sm:block">
                  create
                </button>
              </div>
              <div className="flex-1 bg-primarybg flex items-center justify-between border-b border-gray-900 px-4">
                <div className="flex items-center">
                  <div className="text-gray-500 text-2xl">#</div>
                  <div className="ml-2 text-sm ">room title</div>
                </div>
                <div className="flex items-center">
                  <a href="#" className="ml-4">
                    <form action="#" className="relative">
                      <input
                        type="text"
                        placeholder="Search"
                        className="rounded bg-gray-900 text-gray-200 text-xs px-2 py-1"
                      />
                      <span className="absolute right-0 top-0 mr-1 mt-1.5">
                        <svg
                          className="w-4 h-4 text-gray-500 hover:text-gray-200"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          width="24"
                          height="24"
                        >
                          <path
                            className="heroicon-ui"
                            d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                          ></path>
                        </svg>
                      </span>
                    </form>
                  </a>
                </div>
              </div>
            </div>
            <div className="flex-1 flex overflow-y-hidden">
              <div className=" w-56 flex-none flex flex-col justify-between">
                <div className="hashtag-bar text-sm leading-relaxed overflow-y-auto">
                  <Tabs
                    className="w-full text-center"
                    selectedIndex={index}
                    onSelect={index => setIndex(index)}
                  >
                    <TabList className="flex sm:flex bg-gray-100">
                      <Tab
                        className={
                          index === 0 ? 'w-1/2 p-2 border-b-4' : 'w-1/2 p-2'
                        }
                      >
                        <span>{t('lang:DM')}</span>
                      </Tab>
                      <Tab
                        className={
                          index === 1 ? 'w-1/2 p-2 border-b-4' : 'w-1/2 p-2'
                        }
                      >
                        <span>{t('lang:GROUP')}</span>
                      </Tab>
                    </TabList>
                    <TabPanel className="w-full">
                      <div>{roomList('dm')}</div>
                    </TabPanel>
                    <TabPanel>
                      <div>{roomList('group')}</div>
                    </TabPanel>
                  </Tabs>
                </div>
              </div>
              <div className="flex-1 flex justify-between">
                <div className="bg-primarybg flex-1 flex flex-col justify-between">
                  <div className="px-4 flex-1">
                    <ChatContainer
                      room={currentChatRoom}
                      user={currentUser}
                      deleteChatRoom={deleteChatRoom}
                    />
                  </div>
                </div>

                <div className="sidebar-users text-sm bg-gray-800 w-56 flex-none px-3 py-3 overflow-y-auto">
                  <h3 className="uppercase tracking-wide font-semibold text-xs text-gray-500 mb-2">
                    Online
                  </h3>
                  <ul className="mb-6 truncate">
                    <li className="text-gray-500 px-2 hover:text-gray-200 hover:bg-gray-750 py-1 my-2">
                      <a href="#" className="flex items-center">
                        <span className="flex-none">
                          <a href="#">
                            <Avatar>프로필</Avatar>
                          </a>
                        </span>
                        <span className="ml-2">adamwathan</span>
                      </a>
                    </li>
                  </ul>
                  <h3 className="uppercase tracking-wide font-semibold text-xs text-gray-500 mb-2">
                    Offline
                  </h3>

                  <ul className="mb-6 truncate">
                    <li className="text-gray-500 px-2 hover:text-gray-200 hover:bg-gray-750 py-1 my-2">
                      <a href="#" className="flex items-center">
                        <span className="flex-none">
                          <a href="#">
                            <Avatar>프로필</Avatar>
                          </a>
                        </span>
                        <span className="ml-2">adamwathan</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
