import { Icon, IconButton } from '@mui/material'
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
  const deleteRoom = e => {
    axios
      .post('/api/room/check', {
        room: currentRoom,
        user_id: currentUser.id,
      })
      .then(res => {
        // dispatch(getRooms(currentUser.id))
        dispatch({ type: 'DELETE_ROOM', payload: { room: res.data } })
        dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: null } })
        dispatch({ type: 'CHAT_SIDE_CLOSE' })
        // setCurrentChatRoom('')
      })
  }
  const roomUsers = users => {
    users = JSON.parse(users)
    users = users.filter(user => user.user_id !== currentUser.id)
    return users
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
      <div className="flex flex-row  items-center  top-0  w-full">
        <div className="flex flex-row border-gray bg-tabbg rounded-t-xl  items-center w-full border-1  h-12 ">
          <span className="ml-2 font-bold text-xl">채팅방 서랍</span>
        </div>
      </div>
      <div className="primary-bg w-full h-[calc(100vh-170px)]  overflow-y-auto">
        <div className="text-sm text-left font-bold">
          <div className="text-sm p-2">
            파일
            {files
              ? files.map(message =>
                  JSON.parse(message.file).map((file, index) => (
                    <div
                      className="flex text-left mr-2 py-3 px-4   rounded-xl border-2 "
                      key={file + index}
                    >
                      <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center mr-1">
                        <a
                          className="p-3 w-12 h-12"
                          download
                          href={'http://localhost:8000/storage/' + file.path}
                        >
                          <FileIcon
                            extension={file.type}
                            {...defaultStyles[file.type]}
                          ></FileIcon>
                        </a>
                      </div>
                      <div className="flex flex-col">
                        <div>
                          <a
                            href={'http://localhost:8000/storage/' + file.path}
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
                          href={'http://localhost:8000/storage/' + file.path}
                        >
                          <span className="text-primarytext">
                            <DownloadIcon />
                          </span>
                        </a>
                      </div>
                    </div>
                  ))
                )
              : null}
          </div>
        </div>
        <div className="font-bold text-left p-2 text-sm">이미지</div>
        {images
          ? images.map((image, index) => (
              <div className="flex" key={index}>
                <img
                  className="w-1/2"
                  src={'http://localhost:8000/storage/' + image.file}
                  onClick={() => setOpen(true)}
                ></img>
                <ReactImageViewer
                  imgs={'http://localhost:8000/storage/' + image.file}
                  isOpen={isOpen}
                  onClose={() => setOpen(false)}
                />
              </div>
            ))
          : null}
        <div className=" font-bold text-sm text-left">
          <span className="p-2">대화상대</span>
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

              <div className="text-xl">{currentUser.name}</div>
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
                        <IconButton>
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
