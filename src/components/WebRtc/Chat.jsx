import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import UserModel from '../../models/user-model'
import ChatMessage from './ChatMessage'

function Chat(props) {
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  const user = useSelector(state => state.Reducers.user)
  const [messageList, setMessageList] = useState([])
  const sendMessage = () => {
    if (props.user && message && user) {
      let messageValue = message.replace(/ +(?= )/g, '')
      if (messageValue !== '' && messageValue !== ' ') {
        const data = {
          message: messageValue,
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
  }

  const onKeyPress = e => {
    if (e.key == 'Enter') {
      sendMessage()
    }
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
        })
        setMessageList([...message])
      })
    }
  }, [props.user])

  return (
    <div className=" w-full h-[calc(100vh-275px)]  bg-primary300">
      <div className="w-full ">
        <div className="h-[calc(100vh-370px)] bg-white mb-1 rounded-xl">
          채팅창
          {messageList &&
            messageList.map((message, index) => (
              <ChatMessage
                message={message}
                user={user}
                key={message + index}
              />
            ))}
        </div>
        <input
          type="text"
          className="border rounded-2xl border-transparent w-full focus:outline-none text-sm h-10 flex items-center"
          placeholder="메세지를 입력해주세요"
          onKeyPress={onKeyPress}
          onChange={e => setMessage(e.target.value)}
        />
      </div>
      <div className="flex flex-row">
        <label
          className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-blue-600  text-blue-400"
          htmlFor="input-file"
        >
          <svg
            className="w-5 h-5 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
            ></path>
          </svg>
        </label>
        <input type="file" id="input-file" className="hidden" multiple />

        <button
          id="capture"
          className="focus:outline-none flex items-center justify-center h-10 w-8 hover:text-green-600 text-green-400 ml-1 mr-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  )
}
export default Chat
