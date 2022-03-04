import { Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Sidebar from '../layout/Sidebar'
import Header from '../layout/Header'
import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { Users } from '../../store/modules/getUsers'
import { Avatar, Skeleton } from '@mui/material'
import { indigo } from '@mui/material/colors'
import ReactLoading from 'react-loading'
function User() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const users = useSelector(state => state.Reducers.users)
  const loading = useSelector(state => state.Reducers.users_pending)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(Users())
  }, [])
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
            <div class="flex flex-col items-start justify-between pb-6 space-y-4 border-b lg:items-center lg:space-y-0 lg:flex-row">
              <h1 class="text-2xl font-semibold whitespace-nowrap">User</h1>
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
                            Status
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
                          users.map(user => (
                            <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
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
                                  {user.created_at}
                                </div>
                              </td>
                              <td class="px-6 py-4 whitespace-nowrap">
                                <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                  Active
                                </span>
                              </td>
                              <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                {user.position}
                              </td>
                              <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <a
                                  href="#"
                                  class="text-indigo-600 hover:text-indigo-900"
                                >
                                  Edit
                                </a>
                              </td>
                            </tr>
                          ))}

                        {loading ? (
                          <tr class="transition-all hover:bg-gray-100 hover:shadow-lg">
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 w-10 h-10">
                                  <Avatar
                                    style={{
                                      backgroundColor: indigo[300],
                                    }}
                                  >
                                    이름
                                  </Avatar>
                                </div>
                                <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">
                                    ㅇㅇ
                                  </div>
                                  <div class="text-sm text-gray-500">ㅇㅇ</div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">ㅇㅇ</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                                Active
                              </span>
                            </td>
                            <td class="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                              포지션
                            </td>
                            <td class="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                              <a
                                href="#"
                                class="text-indigo-600 hover:text-indigo-900"
                              >
                                Edit
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

export default User
