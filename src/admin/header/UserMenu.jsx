import { Avatar, IconButton } from '@mui/material'
import React, { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Transition from '../utils/Transition'
import { indigo } from '@mui/material/colors'
import { Logout } from '../../store/actions'
import axios from 'axios'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
function UserMenu() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const user = useSelector(state => state.Reducers.user)
  const trigger = useRef(null)
  const dropdown = useRef(null)
  const dispatch = useDispatch()
  const history = useHistory()
  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!user) {
        return
      }
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
  const LogOutClicked = async () => {
    axios
      .post('/api/logout')
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          alert('로그인해제')
        }
      })
      .catch(err => {
        if (err.response.status === 401) {
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          alert('에러')
        }
      })
    await dispatch(Logout())
    history.push('/login')
  }
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
    <div className="relative inline-flex">
      <IconButton
        ref={trigger}
        className="inline-flex justify-center items-center group"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <Avatar
          style={{
            backgroundColor: indigo[300],
          }}
        >
          {user.name.substring(0, 1)}
        </Avatar>
      </IconButton>

      <Transition
        className="origin-top-right z-10 absolute top-full right-0 min-w-44 bg-white border border-slate-200 py-1.5 rounded shadow-lg overflow-hidden mt-1"
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
        >
          <div className="pt-0.5 pb-2 px-3 mb-1 border-b border-slate-200">
            <div className="font-medium text-slate-800">{user.name}</div>
            <div className="text-xs text-slate-500 italic">Administrator</div>
          </div>
          <ul>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                Settings
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-sm text-indigo-500 hover:text-indigo-600 flex items-center py-1 px-3"
                to="/"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onClick={() => LogOutClicked()}
              >
                Sign Out
              </Link>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  )
}

export default UserMenu
