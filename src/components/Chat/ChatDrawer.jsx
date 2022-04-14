import {
  Icon,
  IconButton,
  ImageList,
  ImageListItem,
  ImageListItemBar,
} from '@mui/material'
import axios from 'axios'
import prettyBytes from 'pretty-bytes'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DownloadIcon from '@mui/icons-material/Download'
import { FileIcon, defaultStyles } from 'react-file-icon'
import ReactImageViewer from '../../layouts/ReactImageViewer'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import SettingsIcon from '@mui/icons-material/Settings'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt'
import { Add, AddCircleOutlined } from '@mui/icons-material'
import { blue, green, red } from '@mui/material/colors'
import { getCurrentRoom } from '../../store/modules/getCurrentRoom'
import { getFollows } from '../../store/modules/getFollows'
import MemosModal from './MemosModal'

function ChatDrawer() {
  const dispatch = useDispatch()
  const currentRoom = useSelector(state => state.Reducers.currentRoom)
  const currentRoomUsers = useSelector(
    state => state.Reducers.current_room_users
  )
  const currentUser = useSelector(state => state.Reducers.user)
  const files = useSelector(state => state.Reducers.room_files)
  const images = useSelector(state => state.Reducers.room_images)
  const memos = useSelector(state => state.Reducers.room_memos)
  const inviteOpen = useSelector(state => state.Reducers.chat_invite_modal)
  const follows = useSelector(state => state.Reducers.follows)
  const [isOpen, setOpen] = useState(false)
  const [open2, setOpen2] = useState(false)
  const follow = user_id => {
    axios
      .post('/api/user/follow', {
        user_id: currentUser.id,
        to_user_id: user_id,
      })
      .then(res => {
        dispatch(getFollows(currentUser.id))
        dispatch(getCurrentRoom(currentRoom.id))
        // setCurrentChatRoom('')
      })
  }
  const deleteRoom = e => {
    axios
      .post('/api/room/check', {
        room: currentRoom,
        user_id: currentUser.id,
      })
      .then(res => {
        // dispatch(getRooms(currentUser.id))
        dispatch({ type: 'DELETE_ROOM', payload: { room: res.data } })
        dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: '' } })
        dispatch({ type: 'CHAT_SIDE_CLOSE' })
        // setCurrentChatRoom('')
      })
  }
  const roomUsers = users => {
    users = JSON.parse(users)
    users = users.filter(user => user.user_id !== currentUser.id)
    return users
  }

  const memoModalOpen = () => {
    setOpen2(true)
  }
  const handleClose = e => {
    e.preventDefault()
    setOpen2(false)
  }

  useEffect(() => {
    console.log(files)
    console.log(images)
    console.log(memos)
  }, [files, images, memos])

  useEffect(() => {
    if (currentRoom) {
      axios.get('/api/sidebar/' + currentRoom.id).then(res => {
        dispatch({
          type: 'SET_CHAT_SIDE_DATAS',
          payload: {
            files: res.data.files,
            images: res.data.images,
            memos: res.data.memos,
          },
        })
      })
    }
  }, [currentRoom])
  return (
    <>
      <MemosModal open={open2} handleClose={handleClose} />
      <div className="flex flex-row  items-center  top-0  w-full">
        <div className="flex flex-row border-gray bg-tabbg rounded-t-xl  items-center w-full border-1  h-12 ">
          <span className="ml-2 font-bold text-xl">채팅방 서랍</span>
        </div>
      </div>
      <div className="primary-bg w-full h-[calc(100vh-170px)]  overflow-y-auto">
        <div className="text-sm text-left font-bold">
          <div className="text-sm p-2">
            <div className="flex w-full p-2">
              <span className="px-2 py-1 text-sm  text-blue-900  rounded-md ">
                내 메모
              </span>
              <button
                onClick={memoModalOpen}
                className="ml-auto px-2 py-1 text-sm font-bold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
              >
                보기
              </button>
            </div>
            <div className="flex w-full p-2">
              <span className="px-2 py-1 text-sm  text-blue-900  rounded-md ">
                파일
              </span>
              <button className="ml-auto px-2 py-1 text-sm font-bold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
                더보기
              </button>
            </div>

            {files
              ? files.map((message, index) =>
                  JSON.parse(message.message).map(file => (
                    <>
                      {index <= 2 ? (
                        <div
                          className="flex text-left m-2 py-3 px-4   rounded-xl border-2 "
                          key={file + index}
                        >
                          <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center mr-1">
                            <a
                              className="p-3 w-12 h-12"
                              download
                              href={
                                'http://localhost:8000/storage/' + file.path
                              }
                            >
                              <FileIcon
                                extension={file.type}
                                {...defaultStyles[file.type]}
                              ></FileIcon>
                            </a>
                          </div>
                          <div className="flex flex-col mr-2">
                            <div>
                              <a
                                href={
                                  'http://localhost:8000/storage/' + file.path
                                }
                                download
                                className="font-bold break-all"
                              >
                                {file.name}
                              </a>
                            </div>
                            <span>{prettyBytes(file.size)}</span>
                          </div>
                          <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-auto ">
                            <a
                              className="p-3"
                              download
                              href={
                                'http://localhost:8000/storage/' + file.path
                              }
                            >
                              <span className="text-primarytext">
                                <DownloadIcon />
                              </span>
                            </a>
                          </div>
                        </div>
                      ) : null}
                    </>
                  ))
                )
              : null}
          </div>
        </div>
        <div className="flex w-full p-2">
          <span className="px-2 py-1 text-sm  font-bold text-blue-900  rounded-md ">
            이미지
          </span>
          <button className="ml-auto px-2 py-1 text-sm font-bold text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500">
            더보기
          </button>
        </div>

        {images ? (
          <div className="flex">
            <ImageList variant="quilted" cols={2} gap={8}>
              {images.map((image, index) => (
                <>
                  {index < 4 ? (
                    image.message.startsWith('[') ? (
                      JSON.parse(image.message).map((image, file) => (
                        <ImageListItem key={image}>
                          <img
                            src={`http://localhost:8000/storage/${image}?w=161&fit=crop&auto=format`}
                            srcSet={`http://localhost:8000/storage/${image}?w=161&fit=crop&auto=format&dpr=2 2x`}
                            loading="lazy"
                          />
                        </ImageListItem>
                      ))
                    ) : (
                      <ImageListItem key={image.message}>
                        <img
                          src={`http://localhost:8000/storage/${image.message}?w=161&fit=crop&auto=format`}
                          srcSet={`http://localhost:8000/storage/${image.message}?w=161&fit=crop&auto=format&dpr=2 2x`}
                          loading="lazy"
                        />
                      </ImageListItem>
                    )
                  ) : null}
                </>
              ))}
            </ImageList>
          </div>
        ) : null}
        <div className=" font-bold text-sm text-left p-2">
          <div className="flex w-full">
            <span className="px-2 py-1 text-sm font-bold text-blue-900  rounded-md ">
              대화상대
            </span>
          </div>
          <div className="text-sm  ">
            <div className="flex items-center w-full">
              <IconButton
                className="inline-flex justify-center item  s-center group"
                aria-haspopup="true"
              >
                <div className="flex flex-row items-center text-center">
                  <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                    <span> {currentUser.name.substr(0, 1)}</span>
                  </div>
                </div>
              </IconButton>

              <div className="text-xl block overflow-hidden text-ellipsis whitespace-nowrap ">
                {currentUser.name}
              </div>
              {/* <div className="rounded-2xl bg-gray-500 text-white ml-auto p-1 mr-2">
                ME
              </div> */}
            </div>
            {currentRoom &&
              currentRoomUsers &&
              roomUsers(currentRoomUsers).map((user, index) => (
                <div key={index}>
                  <div className="flex w-full items-center">
                    <IconButton
                      className="inline-flex justify-center items-center group"
                      aria-haspopup="true"
                    >
                      <div className="flex flex-row items-center text-center">
                        <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                          <span> {user.user_name.substr(0, 1)}</span>
                        </div>
                      </div>
                    </IconButton>
                    <div className="text-xl">{user.user_name}</div>
                    <div className=" text-white ml-auto mr-2">
                      {follows.findIndex(
                        follow => user.user_id === follow.id
                      ) === -1 ? (
                        <IconButton onClick={() => follow(user.user_id)}>
                          <PersonAddAltIcon fontSize="large" />
                        </IconButton>
                      ) : null}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="flex flex-row  items-center   bottom-0  w-full">
        <div className="flex flex-row border-gray bg-tabbg rounded-b-xl items-center w-full border-1  h-12 ">
          <IconButton onClick={deleteRoom}>
            <ExitToAppIcon sx={{ color: red[400] }} fontSize="large" />
          </IconButton>
          <div className="w-full"></div>
          <div className="flex flex-row">
            <IconButton
              onClick={() => dispatch({ type: 'CHAT_INVITE_MODAL_OPEN' })}
            >
              <AddCircleOutlined sx={{ color: blue[400] }} fontSize="large" />
            </IconButton>

            <IconButton>
              <SettingsIcon fontSize="large" />
            </IconButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default ChatDrawer
