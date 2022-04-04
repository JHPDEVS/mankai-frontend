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
            className="text-left mr-2 py-3 px-4 bg-primary opacity-75   text-white  rounded-xl border max-w-[50%]"
          >
            <span className="break-all break-word">{message.message}</span>
          </div>
        </div>
      ) : (
        <div className="flex p-1 mr-2 justify-start relative  max-w-[50%]">
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

          <div className="text-left mx-2 py-3 px-4 bg-secondary    rounded-xl border ">
            <span>{message.user.name}</span>
            <span className="break-all break-word ">{message.message}</span>
          </div>
          <span className="flex items-end ml-1">
            <Moment format="H:mm" local>
              {message.created_at}
            </Moment>
          </span>
        </div>
      )}
    </>
  )
}
export default ChatMessage
