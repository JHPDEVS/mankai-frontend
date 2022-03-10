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
function Message({ message: msg, user: user }) {
  const [message, setMessage] = useState(msg)
  const [isOpen, setOpen] = useState(false)
  useEffect(() => {
    // console.log(user);
  }, [user])

  const translation = msg => {
    // console.log(msg);
    // console.log(user.Reducers.user.country);
    // return ;
    if (msg === '') {
      return
    }
    axios
      .post('api/translate/text', { country: user.country, text: msg })
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
      <div
        className={
          user.id === message.user.id
            ? 'flex p-1 mr-2 justify-end relative'
            : 'flex p-1 mr-2 justify-start relative  max-w-[50%]'
        }
      >
        {user.id != message.user.id ? (
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
                {message.file ? (
                  message.message ? null : message.file.startsWith('[{') ? (
                    JSON.parse(message.file).map((file, index) => (
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
                  ) : message.file.startsWith('[') ? (
                    <div>사진 여러개</div>
                  ) : (
                    <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2">
                      <img
                        src={'http://localhost:8000/storage/' + message.file}
                        onClick={() => setOpen(true)}
                      ></img>
                      <ReactImageViewer
                        imgs={'http://localhost:8000/storage/' + message.file}
                        isOpen={isOpen}
                        onClose={() => setOpen(false)}
                      />
                    </div>
                  )
                ) : (
                  <div
                    onDoubleClick={e => translation(message.message)}
                    className="text-left mr-2 py-3 px-4 bg-secondary    rounded-xl border "
                  >
                    <span className="break-all break-word ">
                      {message.message}
                      {message.translation ? (
                        <div className="divide-x-2">
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
            </span>
          </>
        ) : null}

        {/* 자신이 타이핑한 메세지 */}
        {user.id === message.user.id ? (
          <>
            <div className="relative">
              <span className="absolute bottom-0 right-2">
                <Moment format="H:mm" local>
                  {message.created_at}
                </Moment>
              </span>
            </div>
            {message.file ? (
              message.message ? null : message.file.startsWith('[{') ? (
                JSON.parse(message.file).map((file, index) => (
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
              ) : message.file.startsWith('[') ? (
                <div>사진 여러개</div>
              ) : (
                <div className="flex text-left mr-2 py-3 px-4   rounded-xl border-2  max-w-[50%]">
                  <img
                    src={'http://localhost:8000/storage/' + message.file}
                    onClick={() => setOpen(true)}
                  ></img>
                  <ReactImageViewer
                    imgs={'http://localhost:8000/storage/' + message.file}
                    isOpen={isOpen}
                    onClose={() => setOpen(false)}
                  />
                </div>
              )
            ) : (
              <div
                onDoubleClick={e => translation(message.message)}
                className="text-left mr-2 py-3 px-4 bg-primary   text-white  rounded-xl border max-w-[50%]"
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
