import { Grid, Link } from '@mui/material'
import { useSelector } from 'react-redux'
import VideoRoom from './VideoRoom'
import { useFullScreenHandle } from 'react-full-screen'
function WaitRoom(props) {
  const user = useSelector(state => state.Reducers.user)
  const roomName = props.match.params.roomID
  const handle = useFullScreenHandle()
  return (
    <div>
      {user ? (
        <VideoRoom user={user} roomName={roomName} handle={handle}></VideoRoom>
      ) : (
        <Grid container component="main" sx={{ height: '100vh' }}>
          <div className="w-full  bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
            <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
              <div className="w-full md:w-1/2">
                <div className="mb-10 md:mb-20 text-gray-600 font-light">
                  <h1 className="font-black  text-3xl lg:text-5xl text-indigo-700 mb-10">
                    401 Unauthorized
                  </h1>
                  <p> {roomName}번방에 접근할려면 로그인을 해야 합니다.</p>
                  <p>로그인을 해서 화상회의에 참여하세요.</p>
                </div>
                <div className="mb-20 md:mb-0">
                  <a href="/login">
                    <button className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-blue-500 hover:text-blue-600">
                      로그인
                    </button>
                  </a>
                </div>
              </div>
            </div>
            <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
            <div className="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
          </div>
        </Grid>
      )}
    </div>
  )
}

export default WaitRoom
