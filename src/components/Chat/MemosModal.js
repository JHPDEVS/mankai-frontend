import {
  Badge,
  CircularProgress,
  IconButton,
  InputAdornment,
  TextField,
} from '@mui/material'
// import Box from '@mui/material/Box'
// import Button from '@mui/material/Button'
// import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useState, Fragment } from 'react'
import { FileIcon } from 'react-file-icon'
import * as React from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux'
function MemosModal(props) {
  const { t } = useTranslation(['lang'])
  const [checkedMemos, setCheckedMemos] = useState([])
  const [complete, setComplete] = useState(false)
  const [close, setClose] = useState(false)
  const dispatch = useDispatch()
  const currentChatRoom = useSelector(state => state.Reducers.currentRoom)
  const currentUser = useSelector(state => state.Reducers.user)
  const memos = useSelector(state => state.Reducers.memo)
  const toUser = useSelector(state => state.Reducers.to_users)
  const changeHandler = (checked, memo) => {
    if (checked) {
      setCheckedMemos([...checkedMemos, memo])
      console.log('체크 ')
    } else {
      setCheckedMemos(checkedMemos.filter(el => el !== memo))
      console.log('체크 해제')
    }
  }
  React.useEffect(() => {
    if (complete) {
      let toUsers = []
      for (let i = 0; i < toUser.length; i++) {
        toUsers.push(toUser[i]['user_id'])
      }
      axios
        .post('/api/message/send', {
          memos: checkedMemos,
          room_id: currentChatRoom.id,
          to_users: toUsers,
          user_id: currentUser.id,
          type: 'memo',
        })
        .then(res => {
          console.log(res.data)
          setComplete(false)
          setCheckedMemos([])
        })
    }
  }, [checkedMemos, complete])

  const sendMemo = e => {
    // setCheckedInviteUsers([...checkedInviteUsers]);

    setComplete(true)
    props.handleClose(e)
  }

  const possibleChecked = checkedMemos.length >= 1
  const disabled = !possibleChecked

  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={props.handleClose}
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
                  onClick={props.handleClose}
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
                  내 메모
                </div>
                <div className="flex flex-col overflow-y-auto h-96 px-2">
                  {memos ? (
                    memos.map((memo, index) => (
                      <div
                        key={index}
                        className="relative flex w-full my-2 items-center"
                      >
                        <div class="relative flex-shrink-0">
                          <div className="w-12 h-12 bg-primary300 flex rounded-2xl items-center ml-1 ">
                            <button className="p-3 w-12 h-12">
                              <FileIcon></FileIcon>
                            </button>
                          </div>
                        </div>
                        <div class="flex-1 relative min-w-0">
                          <p class="text-xl h-10 ml-2 font-medium text-gray-900 truncate dark:text-white">
                            {memo.memo_title}
                          </p>
                        </div>

                        <input
                          type="checkbox"
                          id={'check' + index}
                          className="rounded-full relative peer w-6 h-6"
                          onChange={e => {
                            changeHandler(e.currentTarget.checked, memo)
                          }}
                          checked={checkedMemos.includes(memo) ? true : false}
                        />
                        {/* <div class="absolute inset-0 bg-white peer-checked:bg-purple-50 peer-checked:border-purple-300 z-10 border rounded-2xl"></div> */}
                      </div>
                    ))
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
                  onClick={sendMemo}
                  className=" px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  보내기
                </button>
                <button
                  type="button"
                  className="ml-2 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={props.handleClose}
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
export default MemosModal
