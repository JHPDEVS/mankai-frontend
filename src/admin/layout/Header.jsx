import React, { useState } from 'react'
import SearchModal from '../header/SearchModal'
import Notifications from '../header/Notifications'
import UserMenu from '../header/UserMenu'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { IconButton, Skeleton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { indigo } from '@mui/material/colors'
function Header({ sidebarOpen, setSidebarOpen }) {
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const user = useSelector(state => state.Reducers.user)
  const loading = useSelector(state => state.Reducers.user_pending)
  const noti_count = useSelector(state => state.Reducers.noti_count)
  const noti = useSelector(state => state.Reducers.noti)
  const noti_loading = useSelector(state => state.Reducers.noti_pending)
  const isOpen = useSelector(state=>state.Reducers.isOpen)


  return (
    <header className={"sticky top-0 bg-white border-b rounded-b-xl border-slate-200 z-30"}>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 -mb-px">
          {/* Header: Left side */}
          <div className="flex">
            {/* Hamburger button */}
            <button
              className="text-slate-500 hover:text-slate-600 lg:hidden"
              aria-controls="sidebar"
              aria-expanded={sidebarOpen}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="4" y="5" width="16" height="2" />
                <rect x="4" y="11" width="16" height="2" />
                <rect x="4" y="17" width="16" height="2" />
              </svg>
            </button>
          </div>

          <div className="flex items-center">
            {/* Header: Right side */}
            {user && !loading ? (
              <IconButton
                onClick={e => {
                  e.stopPropagation()
                  setSearchModalOpen(true)
                }}
                aria-controls="search-modal"
                style={{
                  backgroundColor: indigo[50],
                }}
              >
                <SearchIcon />
              </IconButton>
            ) : loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : null}
            <SearchModal
              id="search-modal"
              searchId="search"
              modalOpen={searchModalOpen}
              setModalOpen={setSearchModalOpen}
            />
            {/*  notification */}
            {user && !loading ? (
              <Notifications />
            ) : loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
                className="ml-3"
              />
            ) : null}

            {/*  Divider */}
            <hr className="w-px h-6 bg-slate-200 mx-3" />
            {user && !loading ? (
              <UserMenu />
            ) : loading ? (
              <Skeleton
                animation="wave"
                variant="circular"
                width={40}
                height={40}
              />
            ) : null}
            {!user && !loading ? (
              <Link to="/login" className="button">
                <span className="p-1 px-10 font-bold transition-colors duration-700 transform bg-black hover:bg-indigo-400 text-gray-100 text-lg rounded-xl focus:border-4 border-indigo-300">
                  로그인
                </span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header