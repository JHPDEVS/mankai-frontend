import { HighlightOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import axios from 'axios'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserModel from '../../models/user-model'
import MiniChatMessage from './MiniChatMessage'
import './MiniChat.css'
function Chat(props) {
  const dispatch = useDispatch()
  const chatBody = useRef()
  const [message, setMessage] = useState(null)
  const user = useSelector(state => state.Reducers.user)
  const [messageList, setMessageList] = useState([])
  const sendMessage = () => {
    if (props.user && message && user) {
      let messageValue = message.replace(/ +(?= )/g, '')
      if (messageValue !== '' && messageValue !== ' ') {
        const data = {
          message: messageValue,
          date: moment().format(),
          nickname: props.user.getNickname(),
          streamId: props.user.getStreamManager().stream.streamId,
          user: user,
        }
        props.user.getStreamManager().stream.session.signal({
          data: JSON.stringify(data),
          type: 'chat',
        })
      }
    }
    setMessage('')
  }

  const sendFile = e => {
    const file = e.target.files[0]
    if (props.user && file && user) {
      const formData = new FormData()
      formData.append('file', file)
      axios
        .post('/api/video/filesave', formData, {
          headers: { 'Content-Type': 'multipart/from-data' },
        })
        .then(res => {
          const data = {
            file: res.data,
            date: moment().format(),
            nickname: props.user.getNickname(),
            streamId: props.user.getStreamManager().stream.streamId,
            user: user,
          }
          props.user.getStreamManager().stream.session.signal({
            data: JSON.stringify(data),
            type: 'chat-file',
          })
          e.target.value = ''
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  const onKeyPress = e => {
    if (e.key == 'Enter') {
      sendMessage()
    }
  }
  const scrollToBottom = () => {
    setTimeout(() => {
      try {
        chatBody.current.scrollTop = chatBody.current.scrollHeight
      } catch (err) {}
    }, 20)
  }
  useEffect(() => {
    if (props.user) {
      props.user.getStreamManager().stream.session.on('signal:chat', event => {
        const data = JSON.parse(event.data)
        let message = messageList
        message.push({
          connectionId: event.from.connectionId,
          nickname: data.nickname,
          message: data.message,
          user: data.user,
          date: data.date,
        })
        setMessageList([...message])
        scrollToBottom()
      })

      props.user
        .getStreamManager()
        .stream.session.on('signal:chat-file', event => {
          const data = JSON.parse(event.data)
          let message = messageList
          message.push({
            connectionId: event.from.connectionId,
            nickname: data.nickname,
            message: undefined,
            file: data.file,
            user: data.user,
            date: data.date,
          })
          setMessageList([...message])
          scrollToBottom()
        })
    }
  }, [props.user])

  return (
    <div id="chatContainer">
      <div id="chatComponent">
        <div id="chatToolbar">
          <span>
            {/* {this.props.user.getStreamManager().stream.session.sessionId} - */}
            CHAT
          </span>
          <IconButton id="closeButton" onClick={() => props.close()}>
            <HighlightOff color="secondary" />
          </IconButton>
        </div>
        <div className="message-wrap" ref={chatBody}>
          {messageList &&
            messageList.map((message, index) => (
              <MiniChatMessage
                message={message}
                user={user}
                key={message + index}
              />
            ))}
        </div>

        <div>
          <input
            type="text"
            value={message}
            className="w-full h-10 rounded-xl"
            placeholder="메세지를 입력해주세요"
            onKeyPress={onKeyPress}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
export default Chat
