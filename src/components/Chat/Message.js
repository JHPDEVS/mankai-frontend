import { Avatar } from '@mui/material'
import { indigo } from '@mui/material/colors'
import axios from 'axios'
import { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'
import Moment from 'react-moment'
import 'moment-timezone'
import { FileIcon, defaultStyles } from 'react-file-icon'
import ReactImageViewer from '../../layouts/ReactImageViewer'
import prettyBytes from 'pretty-bytes'
import MemoReadModal from './MemoReadModal'
import { useDispatch, useSelector } from 'react-redux'
function Message({ message: msg }) {
  const [message, setMessage] = useState(msg)
  const currentUser = useSelector(state => state.Reducers.user)
  const currentRoom = useSelector(state => state.Reducers.currentRoom)
  const [isOpen, setOpen] = useState(false)
  const dispatch = useDispatch()
  const [memoOpen, setMemoOpen] = useState(false)

  const handleClose = e => {
    e.preventDefault()
    setMemoOpen(false)
  }

  const memoModal = () => {
    console.log(JSON.parse(message.message).id)
    setMemoOpen(true)
  }
  useEffect(() => {
    if (message.type == 'memo') {
      console.log(JSON.parse(message.message))
    }
  }, [message])

  const translation = msg => {
    if (msg === '') {
      return
    }
    axios
      .post('api/translate/text', { country: currentUser.country, text: msg })
      .then(res => {
        setMessage(prevState => ({
          ...prevState,
          translation: res.data,
        }))
        console.log(message)
      })
      .catch(err => {
        console.log(err)
      })
  }
  return (
    <>
      {message.type == 'memo' ? (
        <MemoReadModal
          open={memoOpen}
          handleClose={handleClose}
          memo={JSON.parse(message.message)}
        />
      ) : (
        ''
      )}

      <div
        className={
          currentUser.id === message.user.id
            ? 'flex p-1 mr-2 justify-end relative'
            : 'flex p-1 mr-2 justify-start relative  max-w-[50%]'
        }
      >
        {currentUser.id != message.user.id ? (
          <>
            <div className="">
              {message.user.profile ? (
                <img
                  src={message.user.profile_photo_url}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-primary300 font-bold uppercase text-xl">
                  {message.user.name.substring(0, 1)}
                </div>
              )}
            </div>
            <div onDoubleClick={e => translation(message.message)}>
              <div className="text-left ml-2 ">
                <span>{message.user.name}</span>
                {message.type == 'file' ? (
                  message.message.startsWith('[{') ? (
                    JSON.parse(message.message).map((file, index) => (
                      <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2  ">
                        <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
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
                        <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-2">
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
                  ) : message.message.startsWith('[') ? (
                    <div className="flex text-left mr-2 p-2 flex-wrap rounded-xl border-2  max-w-[50%]">
                      {JSON.parse(message.message).map((image, index) => (
                        <img
                          key={index}
                          className="w-1/2"
                          src={'http://localhost:8000/storage/' + image}
                          onClick={() => setOpen(true)}
                        ></img>
                      ))}
                    </div>
                  ) : (
                    <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2">
                      <img
                        src={'http://localhost:8000/storage/' + message.message}
                        onClick={() => setOpen(true)}
                      ></img>
                      <ReactImageViewer
                        imgs={
                          'http://localhost:8000/storage/' + message.message
                        }
                        isOpen={isOpen}
                        onClose={() => setOpen(false)}
                      />
                    </div>
                  )
                ) : message.type == 'memo' ? (
                  // <div onClick={memoModal} className="transform transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 bg-primary hover:bg-blue-700 text-white rounded-xl border max-w-[50%]">
                  //   <span>
                  //     {JSON.parse(message.memos).memo_title}
                  //   </span>
                  // </div>
                  <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2  ">
                    <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
                      <a className="p-3 w-12 h-12" download href="#">
                        <FileIcon></FileIcon>
                      </a>
                    </div>
                    <div className="flex flex-col">
                      <div>
                        <a href="#" download className="font-bold break-all">
                          {JSON.parse(message.message).memo_title}
                        </a>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-2">
                      <a className="p-3" download href="#">
                        <span className="text-primarytext">
                          <DownloadIcon />
                        </span>
                      </a>
                    </div>
                  </div>
                ) : message.type == 'group' ? (
                  <a
                    href={
                      'http://localhost:3000/group/' +
                      JSON.parse(message.message).id
                    }
                    className="transform transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 bg-primary hover:bg-blue-700 text-white rounded-xl border"
                  >
                    {JSON.parse(message.message).name} group에서 초대메세지가
                    왔습니다.
                  </a>
                ) : message.type == 'video' ? (
                  <a
                    href={'http://localhost:3000/video/' + currentRoom.id}
                    className="flex transform border-indigo-500/100 transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 hover:bg-blue-700 hover:text-white text-primary rounded-xl border"
                  >
                    <div className="flex flex-col">
                      <span className="">{message.message}</span>
                      <span>
                        {'http://localhost:3000/video/' + currentRoom.id}
                      </span>
                    </div>
                  </a>
                ) : (
                  <div
                    onDoubleClick={e => translation(message.message)}
                    className="text-left mr-2 py-3 px-4 bg-secondary    rounded-xl border "
                  >
                    <span className="break-all break-word">
                      {message.message}
                      {message.translation ? (
                        <div className="">
                          <hr></hr>
                          {message.translation}
                        </div>
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <span className="flex items-end ml-1">
              <Moment format="H:mm" local>
                {message.created_at}
              </Moment>
              {/* <span className='ml-2'>
                <div className="text-primarytext text-sm mr-2">{JSON.parse(message.read_users).length !== 0 ? JSON.parse(message.read_users).length : ''}</div>  
              </span> */}
            </span>
          </>
        ) : null}

        {/* 자신이 타이핑한 메세지 */}
        {currentUser.id === message.user.id ? (
          <>
            <div className="relative">
              <span className="absolute bottom-0 right-2">
                <Moment format="H:mm" local>
                  {message.created_at}
                </Moment>
              </span>
              {/* <span>
                  <div className="text-primarytext text-sm mr-2">{JSON.parse(message.read_users).length !== 0 ? JSON.parse(message.read_users).length : ''}</div>  
              </span> */}
            </div>
            {message.type == 'file' ? (
              message.message.startsWith('[{') ? (
                JSON.parse(message.message).map((file, index) => (
                  <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2  max-w-[50%]">
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
                    <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-2">
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
              ) : message.message.startsWith('[') ? (
                <div className="flex text-left mr-2 p-2 flex-wrap rounded-xl border-2  max-w-[50%]">
                  {JSON.parse(message.message).map((image, index) => (
                    <img
                      key={index}
                      className="w-1/2"
                      src={'http://localhost:8000/storage/' + image}
                      onClick={() => setOpen(true)}
                    ></img>
                  ))}
                </div>
              ) : (
                <div className="flex text-left mr-2 py-3 px-4 rounded-xl border-2  max-w-[50%]">
                  <img
                    src={'http://localhost:8000/storage/' + message.message}
                    onClick={() => setOpen(true)}
                  ></img>
                  <ReactImageViewer
                    imgs={'http://localhost:8000/storage/' + message.message}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                  />
                </div>
              )
            ) : message.type == 'memo' ? (
              // <button onClick={memoModal} className="transform transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 bg-primary hover:bg-blue-700 text-white rounded-xl border max-w-[50%]">
              //   <span>
              //     {JSON.parse(message.memos).memo_title}
              //   </span>
              //   </button>
              <div className="flex text-left mr-2 py-3 px-4 rounded-xl border-2  ">
                <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
                  <button className="p-3 w-12 h-12" onClick={memoModal}>
                    <FileIcon></FileIcon>
                  </button>
                </div>
                <div className="flex flex-col">
                  <div>
                    <button
                      onClick={memoModal}
                      className="font-bold break-all m-2"
                    >
                      {JSON.parse(message.message).memo_title}
                    </button>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary300 hover:bg-blue-200 flex rounded-2xl items-center ml-2">
                  <button
                    className="ml-auto px-2 py-1 text-sm font-bold text-blue-900 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={memoModal}
                  >
                    보기
                  </button>
                </div>
              </div>
            ) : message.type == 'group' ? (
              <a
                href={
                  'http://localhost:3000/group/' +
                  JSON.parse(message.message).id
                }
                className="transform transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 bg-primary hover:bg-blue-700 text-white rounded-xl border max-w-[50%]"
              >
                {JSON.parse(message.message).name} group에서 초대메세지가
                왔습니다.
              </a>
            ) : message.type == 'video' ? (
              <a
                href={'http://localhost:3000/video/' + currentRoom.id}
                className="transform border-indigo-500/100 border- transition duration-500 hover:scale-105 text-left mr-2 py-3 px-4 hover:bg-blue-700 hover:text-white text-primary rounded-xl border max-w-[50%]"
              >
                <div className="flex flex-col">
                  <span className="w-full">{message.message}</span>
                  <span>{'http://localhost:3000/video/' + currentRoom.id}</span>
                </div>
              </a>
            ) : (
              <div
                onDoubleClick={e => translation(message.message)}
                className="text-left mr-2 py-3 px-4 bg-primary text-white rounded-xl border max-w-[50%]"
              >
                <span className="break-all break-word">
                  {message.message}
                  {message.translation ? (
                    <div className="">
                      <hr></hr>
                      {message.translation}
                    </div>
                  ) : (
                    ''
                  )}
                </span>
              </div>
            )}
          </>
        ) : null}
      </div>
    </>
  )
}
export default Message
