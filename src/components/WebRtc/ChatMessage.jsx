import axios from 'axios'
import { useEffect, useState } from 'react'
import DownloadIcon from '@mui/icons-material/Download'

import Moment from 'react-moment'
import 'moment-timezone'
import { FileIcon, defaultStyles } from 'react-file-icon'
import ReactImageViewer from '../../layouts/ReactImageViewer'
import prettyBytes from 'pretty-bytes'
import { useDispatch, useSelector } from 'react-redux'
function ChatMessage({ message: msg, props: props }) {
  const [message, setMessage] = useState(msg)
  const translation = msg => {
    if (msg === '') {
      return
    }
    axios
      .post('api/translate/text', { country: props.user.country, text: msg })
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
      <div>{message.message}</div>
    </>
  )
}
export default ChatMessage
