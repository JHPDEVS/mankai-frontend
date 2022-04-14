import axios from 'axios'
import { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'

import Moment from 'react-moment'
import 'moment-timezone'
import { FileIcon, defaultStyles } from 'react-file-icon'
import ReactImageViewer from '../../layouts/ReactImageViewer'
import prettyBytes from 'pretty-bytes'
import { useDispatch, useSelector } from 'react-redux'
function ChatMessage({ message: msg, user: user, date: date }) {
  const [message, setMessage] = useState(msg)
  const [isOpen, setOpen] = useState(false)
  const translation = msg => {
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
      {user && user.id === message.user.id ? (
        <div className="flex p-1 mr-2 justify-end relative">
          <div className="relative">
            <span className="absolute bottom-0 right-2">
              <Moment format="H:mm" local>
                {message.date}
              </Moment>
            </span>
          </div>

          <div
            onDoubleClick={e => translation(message.message)}
            className="text-left mr-2 py-3 px-4 bg-primary opacity-75   text-white  rounded-xl border max-w-[80%] border-2"
          >
            {message.message == undefined ? (
              <div className="flex " key={message.file}>
                <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
                  <a
                    className="p-3 w-12 h-12"
                    download
                    href={
                      'http://localhost:8000/storage/' + message.file[0].path
                    }
                    target="_blank"
                  >
                    <FileIcon
                      extension={message.file[0].type}
                      {...defaultStyles[message.file[0].type]}
                    ></FileIcon>
                  </a>
                </div>
                <div className="flex flex-col p-2">
                  <div>
                    <a
                      href={
                        'http://localhost:8000/storage/' + message.file[0].path
                      }
                      download
                      className="font-bold break-all"
                      target="_blank"
                    >
                      {message.file[0].name}
                    </a>
                  </div>
                  <span>{prettyBytes(message.file[0].size)}</span>
                  {message.file[0].type == 'gif' ||
                  message.file[0].type == 'jpg' ||
                  message.file[0].type == 'jpeg' ||
                  message.file[0].type == 'png' ||
                  message.file[0].type == 'gif' ||
                  message.file[0].type == 'bmp' ? (
                    <div>
                      <img
                        src={
                          'http://localhost:8000/storage/' +
                          message.file[0].path
                        }
                        onClick={() => setOpen(true)}
                      />
                      {message && (
                        <ReactImageViewer
                          imgs={
                            'http://localhost:8000/storage/' +
                            message.file[0].path
                          }
                          isOpen={isOpen}
                          onClose={() => setOpen(false)}
                        />
                      )}
                    </div>
                  ) : null}
                </div>
                <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-2">
                  <a
                    className="p-3"
                    download
                    target="_blank"
                    href={
                      'http://localhost:8000/storage/' + message.file[0].path
                    }
                  >
                    <span className="text-primarytext">
                      <DownloadIcon />
                    </span>
                  </a>
                </div>
              </div>
            ) : (
              <span className="break-all break-word">{message.message}</span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex p-1 mr-2 justify-start relative  max-w-[80%]">
          <div className="">
            {message.user.profile ? (
              <img
                src={message.user.profile_photo_url}
                alt="Avatar"
                className="w-10 h-10 rounded-full"
              />
            ) : (
              <div className="flex items-center justify-center h-10 w-10 rounded-2xl bg-primary300 font-bold uppercase text-xl">
                {message.nickname.substring(0, 1)}
              </div>
            )}
          </div>
          <div className="text-left ml-2 ">
            <span>{message.nickname}</span>
            <div className="text-left mr-2 py-3 px-4 bg-secondary    rounded-xl border  ">
              {message.message == undefined ? (
                <div className="flex " key={message.file}>
                  <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
                    <a
                      className="p-3 w-12 h-12"
                      download
                      href={
                        'http://localhost:8000/storage/' + message.file[0].path
                      }
                      target="_blank"
                    >
                      <FileIcon
                        extension={message.file[0].type}
                        {...defaultStyles[message.file[0].type]}
                      ></FileIcon>
                    </a>
                  </div>
                  <div className="flex flex-col p-2">
                    <div>
                      <a
                        href={
                          'http://localhost:8000/storage/' +
                          message.file[0].path
                        }
                        download
                        className="font-bold break-all"
                        target="_blank"
                      >
                        {message.file[0].name}
                      </a>
                    </div>
                    <span>{prettyBytes(message.file[0].size)}</span>
                    {message.file[0].type == 'gif' ||
                    message.file[0].type == 'jpg' ||
                    message.file[0].type == 'jpeg' ||
                    message.file[0].type == 'png' ||
                    message.file[0].type == 'gif' ||
                    message.file[0].type == 'bmp' ? (
                      <div>
                        <img
                          src={
                            'http://localhost:8000/storage/' +
                            message.file[0].path
                          }
                          onClick={() => setOpen(true)}
                        />
                        {message && (
                          <ReactImageViewer
                            imgs={
                              'http://localhost:8000/storage/' +
                              message.file[0].path
                            }
                            isOpen={isOpen}
                            onClose={() => setOpen(false)}
                          />
                        )}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-12 h-12 bg-primary300  flex rounded-2xl items-center ml-2">
                    <a
                      className="p-3"
                      download
                      target="_blank"
                      href={
                        'http://localhost:8000/storage/' + message.file[0].path
                      }
                    >
                      <span className="text-primarytext">
                        <DownloadIcon />
                      </span>
                    </a>
                  </div>
                </div>
              ) : (
                <span className="break-all break-word">{message.message}</span>
              )}
            </div>
          </div>
          <span className="flex items-end ml-1">
            <Moment format="H:mm" local>
              {message.date}
            </Moment>
          </span>
        </div>
      )}
    </>
  )
}
export default ChatMessage
