import { useDispatch, useSelector } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import { useTranslation } from 'react-i18next'
import { useEffect, useState, Fragment } from 'react'
import { Users } from '../../store/modules/getUsers'
import {
  Autocomplete,
  Avatar,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material'
import { indigo } from '@mui/material/colors'
import ReactLoading from 'react-loading'
import Moment from 'react-moment'
import 'moment-timezone'
import { Dialog, Transition } from '@headlessui/react'
import { AdminNotiSend } from '../../store/modules/postNoti'
function NotiSend() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const users = useSelector(state => state.Reducers.users)
  const loading = useSelector(state => state.Reducers.users_pending)
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [selectedUser, setSelectUser] = useState(null)
  const [value, setValue] = useState(null)
  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.append('user_id', selectedUser.id)
    console.log(data)
    dispatch(AdminNotiSend(data))
  }

  function closeModal() {
    setIsOpen(false)
    setSelectUser(null)
  }

  function openModal(user) {
    setIsOpen(true)
    setSelectUser(user)
  }
  useEffect(() => {
    dispatch(Users())
  }, [])
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Dialog */}
      {selectedUser ? (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
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
                  <form component="form" onSubmit={handleSubmit}>
                    <div class="flex justify-end ">
                      <button
                        type="button"
                        onClick={closeModal}
                        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                        data-modal-toggle="authentication-modal"
                      >
                        <svg
                          class="w-5 h-5"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                    <div class="container mx-auto">
                      <div>
                        <div>
                          <div class="flex justify-center">
                            <Avatar
                              style={{
                                backgroundColor: indigo[300],
                              }}
                            >
                              {selectedUser.name.substring(0, 1)}
                            </Avatar>
                          </div>

                          <div>
                            <h1 class="font-bold text-center text-3xl text-gray-900">
                              {selectedUser.name}
                            </h1>
                            <div className="px-4">
                              <TextField
                                margin="normal"
                                fullWidth
                                id="noti_title"
                                label="noti_title"
                                name="noti_title"
                                autoComplete="noti_title"
                                autoFocus
                                style={{
                                  backgroundColor: '#f2f4f8',
                                }}
                              />
                            </div>
                            <div className="px-4">
                              <TextField
                                margin="normal"
                                fullWidth
                                id="noti_message"
                                label="noti_message"
                                name="noti_message"
                                autoComplete="noti_message"
                                multiline
                                rows={4}
                                autoFocus
                                style={{
                                  backgroundColor: '#f2f4f8',
                                }}
                              />
                            </div>
                            <div className="px-4">
                              <TextField
                                margin="normal"
                                fullWidth
                                id="noti_link"
                                label="noti_link"
                                name="noti_link"
                                autoComplete="noti_link"
                                multiline
                                rows={4}
                                autoFocus
                                style={{
                                  backgroundColor: '#f2f4f8',
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className=" px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                      >
                        보내기
                      </button>
                      <button
                        type="button"
                        className="ml-2 px-4 py-2 text-sm font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                        onClick={closeModal}
                      >
                        취소
                      </button>
                    </div>
                  </form>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      ) : null}
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div class="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
              <h1 class="text-2xl font-semibold whitespace-nowrap">
                notification send
              </h1>
              <div class="space-y-6 md:space-x-2 md:space-y-0">검색</div>
            </div>
            <div class="grid grid-cols-1 gap-5 mt-6 sm:grid-cols-2 lg:grid-cols-4">
              <template x-for="i in 4">
                <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                  <div class="flex items-start justify-between">
                    <div class="flex flex-col space-y-2">
                      <span class="text-gray-400">Total Users</span>
                      <span class="text-lg font-semibold">100,221</span>
                    </div>
                    <div class="p-10 bg-gray-200 rounded-md"></div>
                  </div>
                  <div>
                    <span class="inline-block px-2 text-sm text-white bg-green-300 rounded">
                      14%
                    </span>
                    <span>from 2019</span>
                  </div>
                </div>
              </template>
            </div>
            <div class="flex flex-col mt-6">
              <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                  <div class="overflow-hidden border-b border-gray-200 rounded-md shadow-md">
                    <table class="min-w-full overflow-x-scroll divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            회원가입일
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            마지막 로그인
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            로그인 IP
                          </th>
                          <th
                            scope="col"
                            class="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                          >
                            Role
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        {users &&
                          users.map((user, idx) => (
                            <tr
                              class="transition-all hover:bg-gray-100 hover:shadow-lg"
                              key={user.id}
                            >
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                  <div class="flex-shrink-0 w-10 h-10">
                                    {user.profile ? (
                                      <img
                                        class="w-10 h-10 rounded-full"
                                        src="https://avatars0.githubusercontent.com/u/57622665?s=460&u=8f581f4c4acd4c18c33a87b3e6476112325e8b38&v=4"
                                        alt=""
                                      />
                                    ) : (
                                      <Avatar
                                        style={{
                                          backgroundColor: indigo[300],
                                        }}
                                      >
                                        {user.name.substring(0, 1)}
                                      </Avatar>
                                    )}
                                  </div>
                                  <div class="ml-4">
                                    <div class="text-sm font-medium text-gray-900">
                                      {user.name}
                                    </div>
                                    <div class="text-sm text-gray-500">
                                      {user.email}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                  <Moment format="YYYY-MM-DD H:mm:ss" local>
                                    {user.created_at}
                                  </Moment>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">
                                  <Moment format="YYYY-MM-DD H:mm:ss" local>
                                    {user.last_login_at}
                                  </Moment>
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                  {user.last_login_ip}
                                </span>
                              </td>
                              <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {user.position}
                              </td>
                              <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <button
                                  onClick={() => openModal(user)}
                                  class="text-indigo-600 hover:text-indigo-900"
                                >
                                  알림보내기
                                </button>
                              </td>
                            </tr>
                          ))}

                        {loading ? (
                          <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                  <Skeleton
                                    animation="wave"
                                    variant="circular"
                                    width={40}
                                    height={40}
                                  />
                                </div>
                                <div class="ml-4">
                                  <Skeleton />
                                  <Skeleton />
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <Skeleton />
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <Skeleton />
                            </td>
                            <td>
                              <Skeleton />
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                href="#"
                                class="text-indigo-600 hover:text-indigo-900"
                              >
                                <Skeleton />
                              </a>
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default NotiSend
