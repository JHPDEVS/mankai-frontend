import {
  Badge,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
import { useTranslation } from 'react-i18next'
import { useState, Fragment, useEffect } from 'react'
import * as React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Dialog, Transition } from '@headlessui/react'
import { getFollows } from '../../store/modules/getFollows'
import { Users } from '../../store/modules/getUsers'
import { AccountCircle } from '@mui/icons-material'
import { getCurrentRoom } from '../../store/modules/getCurrentRoom'
function RoomInviteUserModal(props) {
  const { t } = useTranslation(['lang'])
  const [checkedInviteUsers, setCheckedInviteUsers] = useState([])
  const [complete, setComplete] = useState(false)
  const rooms = useSelector(state => state.Reducers.rooms)
  const currentUser = useSelector(state => state.Reducers.user)
  const currentRoom = useSelector(state => state.Reducers.currentRoom)
  const currentRoomUsers = useSelector(
    state => state.Reducers.current_room_users
  )
  const toUser = useSelector(state => state.Reducers.to_users)
  const loading = useSelector(state => state.Reducers.follows_pending)
  const follows = useSelector(state => state.Reducers.follows)
  const dispatch = useDispatch()
  const [search, setSearch] = useState('')
  const [close, setClose] = useState(false)
  const [inviteMessage, setInviteMessage] = useState(false)
  const changeHandler = (checked, user) => {
    if (checked) {
      setCheckedInviteUsers([...checkedInviteUsers, user])
      console.log('체크 ')
    } else {
      setCheckedInviteUsers(checkedInviteUsers.filter(el => el !== user))
      console.log('체크 해제')
    }
  }

  React.useEffect(() => {
    if (complete) {
      console.log(complete)
      axios
        .post('api/user/invite', {
          room: currentRoom,
          user: currentUser,
          inviteUsers: checkedInviteUsers,
        })
        .then(res => {
          // props.newRoomList(res.data);
          console.log(res.data)
          setComplete(false)
          if(currentRoom.id != res.data.id) {
              dispatch({ type: 'ADD_ROOM', payload: { room: res.data } })
              dispatch({type : 'SET_CHAT_LIST_INDEX', payload : {index : 1}})

          }
          // dispatch({ type: 'SET_CURRENT_CHATROOM', payload: { room: res.data } })
          // dispatch({ type: 'CHAT_PAGE_ONE' })
          dispatch(getCurrentRoom(res.data.id))
          setInviteMessage(true)
          setCheckedInviteUsers([])
          
        })
    }
  }, [checkedInviteUsers, complete])

  React.useEffect(() => {
    if(toUser && inviteMessage) {
      let toUsers = []
      for (let i = 0; i < toUser.length; i++) {
        toUsers.push(toUser[i]['user_id'])
      }
      axios
        .post('/api/message/send', {
          message: `${currentUser.name}님이 새로운 유저를 초대하였습니다`,
          room_id: currentRoom.id,
          to_users: toUsers,
          user_id: currentUser.id,
          type : 'message'
        })
        .then(res => {
          
        })
        setInviteMessage(false)
    }
  }, [inviteMessage])

  const roomInvite = e => {
    // setCheckedInviteUsers([...checkedInviteUsers]);
    setComplete(true)
    dispatch({ type: 'CHAT_INVITE_MODAL_CLOSE' })
  }

  useEffect(() => {
    if (currentUser) {
      // dispatch(getFollows(currentUser.id))

      setSearch('')
    }
  }, [props.open])
  const possibleChecked = checkedInviteUsers.length >= 1
  const disabled = !possibleChecked
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch({ type: 'CHAT_INVITE_MODAL_CLOSE' })}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-3 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl shadow border dark:bg-gray-900">
              <div className="flex justify-end ">
                <button
                  type="button"
                  onClick={() => dispatch({ type: 'CHAT_INVITE_MODAL_CLOSE' })}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div className="container mx-auto">
                <div className="font-bold text-xl p-2 oveflow-x-auto">
                  초대하기
                </div>
                <div className="flex overflow-x-auto py-3">
                  {checkedInviteUsers.map((user, index) => (
                    <div className="w-20 h-20" key={user + index}>
                      <div className=" justify-center text-center">
                        <IconButton
                          className="inline-flex justify-center items-center group"
                          aria-haspopup="true"
                          onClick={e =>
                            changeHandler(e.currentTarget.checked, user)
                          }
                        >
                          <Badge color="secondary" badgeContent="X">
                            <div className="flex flex-row items-center text-center">
                              <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                                <span>{user.name.substr(0, 1)}</span>
                              </div>
                            </div>
                          </Badge>
                        </IconButton>

                        <div className="block w-20 overflow-hidden text-ellipsis whitespace-nowrap font-bold">
                          {user.name}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <input
                  className="my-2 bg-gray-200 appearance-none border-2 border-gray-200 rounded-xl w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  placeholder="검색어를 입력해주세요"
                  onChange={e => {
                    setSearch(e.target.value)
                  }}
                />
                <div className="flex flex-col overflow-y-auto h-96 px-2">
                  {!loading && follows && currentRoom && currentRoomUsers ? (
                    follows
                      .filter(follow => {
                        if (search == '') {
                          return follow
                        } else if (
                          follow.name
                            .toLowerCase()
                            .includes(search.toLowerCase())
                        ) {
                          return follow
                        }
                      })
                      .map((follow, index) =>
                        JSON.parse(currentRoomUsers).findIndex(
                          user => user.user_id === follow.id
                        ) === -1 ? (
                          <div
                            key={index}
                            className="flex w-full  items-center"
                          >
                            <div className="flex-shrink-0">
                              <IconButton
                                className="inline-flex justify-center items-center group"
                                aria-haspopup="true"
                              >
                                <div className="flex flex-row items-center text-center">
                                  <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                                    <span>{follow.name.substr(0, 1)}</span>
                                  </div>
                                </div>
                              </IconButton>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                                {follow.name}
                              </p>
                            </div>

                            <input
                              type="checkbox"
                              id={'check' + index}
                              className="rounded-full w-6 h-6"
                              onChange={e => {
                                changeHandler(e.currentTarget.checked, follow)
                              }}
                              checked={
                                checkedInviteUsers.includes(follow)
                                  ? true
                                  : false
                              }
                            />
                          </div>
                        ) : (
                          <div
                            key={index}
                            className="flex w-full  items-center"
                          >
                            <div className="flex-shrink-0">
                              <IconButton
                                className="inline-flex justify-center items-center group"
                                aria-haspopup="true"
                              >
                                <div className="flex flex-row items-center text-center">
                                  <div className="flex items-center justify-center h-10 w-10 text-black rounded-2xl bg-primary300 font-bold uppercase text-xl">
                                    <span>{follow.name.substr(0, 1)}</span>
                                  </div>
                                </div>
                              </IconButton>
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xl font-medium text-gray-900 truncate dark:text-white">
                                {follow.name}
                              </p>
                            </div>

                            <input
                              type="checkbox"
                              id={'check' + index}
                              className="rounded-full w-6 h-6"
                              onChange={e => {
                                changeHandler(e.currentTarget.checked, follow)
                              }}
                              disabled
                              checked={true}
                            />
                          </div>
                        )
                      )
                  ) : (
                    <div className="">
                      <CircularProgress size={48} />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center py-2">
                <button
                  disabled={disabled}
                  onClick={roomInvite}
                  className=" px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  초대하기
                </button>
                <button
                  type="button"
                  className="ml-2 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={() => dispatch({ type: 'CHAT_INVITE_MODAL_CLOSE' })}
                >
                  취소
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}
export default RoomInviteUserModal