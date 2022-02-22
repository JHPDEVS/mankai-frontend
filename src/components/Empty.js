import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid'
function Empty() {
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <div className="w-full  bg-blue-100 flex items-center p-5 lg:p-20 overflow-hidden relative">
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-white shadow-xl p-10 lg:p-20 text-gray-800 relative md:flex items-center text-center md:text-left">
          <div className="w-full md:w-1/2">
            <div className="mb-10 md:mb-20 text-gray-600 font-light">
              <h1 className="font-black  text-3xl lg:text-5xl text-indigo-700 mb-10">
                404 NotFound
              </h1>
              <p>찾고 계시는 어플리케이션이 없어진 것 같네요.</p>
              <p>홈으로 돌아가서 다시 찾아 보세요.</p>
            </div>
            <div className="mb-20 md:mb-0">
              <Link to="/">
                <button className="text-lg font-light outline-none focus:outline-none transform transition-all hover:scale-110 text-blue-500 hover:text-blue-600">
                  홈으로 돌아가기
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-64 md:w-96 h-96 md:h-full bg-blue-200 bg-opacity-30 absolute -top-64 md:-top-96 right-20 md:right-32 rounded-full pointer-events-none -rotate-45 transform"></div>
        <div className="w-96 h-full bg-indigo-200 bg-opacity-20 absolute -bottom-96 right-64 rounded-full pointer-events-none -rotate-45 transform"></div>
      </div>
    </Grid>
  )
}

export default Empty
