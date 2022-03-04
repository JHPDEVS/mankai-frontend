import { Badge, IconButton } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Transition from '../utils/Transition'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { useSelector } from 'react-redux'
import Typography from '@mui/material/Typography'
import { CircularProgress, Skeleton } from '@mui/material'
import { indigo } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close'
function Notifications() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const noti_count = useSelector(state => state.Reducers.noti_count)
  const trigger = useRef(null)
  const dropdown = useRef(null)
  const noti = useSelector(state => state.Reducers.navNoti)
  const noti_loading = useSelector(state => state.Reducers.noti_pending)
  const user = useSelector(state => state.Reducers.user)
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return
      setDropdownOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })
  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return
      setDropdownOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  return (
    <div className="relative inline-flex ml-3">
      <IconButton
        ref={trigger}
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
        style={{
          backgroundColor: indigo[50],
        }}
      >
        <span className="sr-only">Notifications</span>
        <Badge
          badgeContent={noti_count}
          color="error"
          invisible={noti_count != 0 ? false : true}
        >
          <NotificationsNoneOutlinedIcon />
        </Badge>
      </IconButton>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 -mr-48 sm:mr-0 min-w-80 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
        show={dropdownOpen}
        enter="transition ease-out duration-200 transform"
        enterStart="opacity-0 -translate-y-2"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-out duration-200"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
      >
        <div
          ref={dropdown}
          onFocus={() => setDropdownOpen(true)}
          onBlur={() => setDropdownOpen(false)}
          className="overflow-auto"
        >
          <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase pt-1.5 pb-2 px-4 border-b border-slate-200 overflow-auto last:border-0">
            <div className="flex items-center">
              <span className="text-sm font-bold text-indigo-500">알림</span>
            </div>
            <div className="flex items-center">
              <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-400 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">
                모두 읽기
              </button>
            </div>
          </div>
          <ul>
            {noti_loading ? (
              <li>
                <Typography>로딩중</Typography>
                <CircularProgress
                  size={48}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    marginTop: '-24px',
                    marginLeft: '-24px',
                  }}
                />
              </li>
            ) : (
              user &&
              noti.map(noti => (
                <li
                  key={noti.id}
                  className="border-b border-slate-200 overflow-auto last:border-0"
                >
                  <Link
                    className="block py-2 px-4 hover:bg-slate-50"
                    to="#0"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    <span className="block text-sm mb-2">
                      📣{' '}
                      <span className="font-medium text-slate-800">
                        {noti.noti_title}
                      </span>{' '}
                      {noti.noti_message}
                    </span>
                    <div className="flex justify-between">
                      <div className="flex items-center">
                        <span className="text-xs font-bold text-indigo-500">
                          {noti.updated_at}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <button className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 focus:bg-indigo-400 focus:outline-none bg-indigo-700 transition duration-150 ease-in-out hover:bg-indigo-600 rounded text-white px-5 py-1 text-xs">
                          읽기
                        </button>
                      </div>
                    </div>
                  </Link>
                </li>
              ))
            )}
            <li>
              <Link
                className="block py-2 px-4 hover:bg-slate-50"
                to="/noti"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <span className="block text-sm mb-2 text-center">
                  📣알림은 5개까지 표시됩니다.
                </span>
                <span className="block text-xs text-center font-medium text-slate-400">
                  여기를 눌러 알림을 더 확인하세요
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default Notifications
