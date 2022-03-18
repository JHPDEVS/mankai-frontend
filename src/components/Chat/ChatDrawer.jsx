import { IconButton } from '@mui/material'
import { useSelector } from 'react-redux'

function ChatDrawer() {
  const currentRoom = useSelector(state => state.Reducers.currentRoom)
  const currentUser = useSelector(state => state.Reducers.user)
  const roomUsers = users => {
    users = JSON.parse(users)
    users = users.filter(user => user.user_id !== currentUser.id)
    return users
  }
  return (
    <div className="primary-bg w-full h-[calc(100vh-100px)]  overflow-y-auto">
      <div className="text-2xl font-bold">
        파일
        <div className="text-sm">파일이 없습니다.</div>
      </div>
      <div className="text-2xl font-bold">이미지</div>
      <div className=" font-bold text-2xl ">
        대화상대
        <div className="text-sm  ">
          <div className="flex justify-center items-center">
            <IconButton
              className="inline-flex justify-center items-center group"
              aria-haspopup="true"
            >
              <div className="flex flex-row items-center text-center">
                <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                  <span> {currentUser.name.substr(0, 1)}</span>
                </div>
              </div>
            </IconButton>

            <div>{currentUser.name}</div>
            <div className="rounded-2xl bg-gray-500 text-white ml-2 p-1">
              ME
            </div>
          </div>
          {roomUsers(currentRoom.users).map((user, index) => (
            <>
              <div className="flex justify-center items-center">
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
                <div>{user.user_name}</div>
              </div>
            </>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ChatDrawer
