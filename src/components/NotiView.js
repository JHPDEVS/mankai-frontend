import { useState } from 'react'
import { useSelector } from 'react-redux'
import Header from '../admin/layout/Header'
import Sidebar from '../admin/layout/Sidebar'

function NotiView() {
  const noti = useSelector(state => state.Reducers.noti)
  const noti_loading = useSelector(state => state.Reducers.noti_pending)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main>
            <div className=" px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
              <div class="bg-white md:px-8 xl:px-10">
                <div class=" border-b-2 sm:flex items-center justify-between bg-white z-50">
                  <div class="flex items-center">
                    <a
                      class="rounded-full focus:outline-none focus:ring-2  focus:bg-indigo-50 focus:ring-indigo-800"
                      href=" javascript:void(0)"
                    >
                      <div class="py-2 px-8 bg-indigo-100 text-indigo-700 rounded-full">
                        <p>모두</p>
                      </div>
                    </a>
                    <a
                      class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                      href="javascript:void(0)"
                    >
                      <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                        <p>안읽은 알림</p>
                      </div>
                    </a>
                    <a
                      class="rounded-full focus:outline-none focus:ring-2 focus:bg-indigo-50 focus:ring-indigo-800 ml-4 sm:ml-8"
                      href="javascript:void(0)"
                    >
                      <div class="py-2 px-8 text-gray-600 hover:text-indigo-700 hover:bg-indigo-100 rounded-full ">
                        <p>읽은 알림</p>
                      </div>
                    </a>
                  </div>
                  <button
                    onclick="popuphandler(true)"
                    class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 mt-4 sm:mt-0 inline-flex items-start justify-start px-6 py-3 bg-red-500 hover:bg-red-400 focus:outline-none rounded"
                  >
                    <p class="text-sm font-medium leading-none text-white">
                      삭제
                    </p>
                  </button>
                </div>
                <div class="mt-3 overflow-x-auto">
                  <table class="w-full whitespace-nowrap">
                    <tbody>
                      {noti.map(noti => (
                        <tr
                          tabindex="0"
                          class="focus:outline-none h-16 border border-gray-100 rounded"
                        >
                          <td>
                            <div class="ml-5">
                              <div class="bg-gray-200 rounded-sm w-5 h-5 flex flex-shrink-0 justify-center items-center relative">
                                <input
                                  placeholder="checkbox"
                                  type="checkbox"
                                  class="focus:opacity-100 checkbox opacity-0 absolute cursor-pointer w-full h-full"
                                />
                                <div class="check-icon hidden bg-indigo-700 text-white rounded-sm">
                                  <svg
                                    class="icon icon-tabler icon-tabler-check"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    fill="none"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  >
                                    <path
                                      stroke="none"
                                      d="M0 0h24v24H0z"
                                    ></path>
                                    <path d="M5 12l5 5l10 -10"></path>
                                  </svg>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td class="">
                            <div class="flex items-center pl-5">
                              <p class="text-base font-medium leading-none text-gray-700 mr-2">
                                {noti.noti_title}
                              </p>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <path
                                  d="M6.66669 9.33342C6.88394 9.55515 7.14325 9.73131 7.42944 9.85156C7.71562 9.97182 8.02293 10.0338 8.33335 10.0338C8.64378 10.0338 8.95108 9.97182 9.23727 9.85156C9.52345 9.73131 9.78277 9.55515 10 9.33342L12.6667 6.66676C13.1087 6.22473 13.357 5.62521 13.357 5.00009C13.357 4.37497 13.1087 3.77545 12.6667 3.33342C12.2247 2.89139 11.6251 2.64307 11 2.64307C10.3749 2.64307 9.77538 2.89139 9.33335 3.33342L9.00002 3.66676"
                                  stroke="#3B82F6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                                <path
                                  d="M9.33336 6.66665C9.11611 6.44492 8.8568 6.26876 8.57061 6.14851C8.28442 6.02825 7.97712 5.96631 7.66669 5.96631C7.35627 5.96631 7.04897 6.02825 6.76278 6.14851C6.47659 6.26876 6.21728 6.44492 6.00003 6.66665L3.33336 9.33332C2.89133 9.77534 2.64301 10.3749 2.64301 11C2.64301 11.6251 2.89133 12.2246 3.33336 12.6666C3.77539 13.1087 4.37491 13.357 5.00003 13.357C5.62515 13.357 6.22467 13.1087 6.66669 12.6666L7.00003 12.3333"
                                  stroke="#3B82F6"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                ></path>
                              </svg>
                            </div>
                          </td>

                          <td class="pl-5">
                            <div class="flex items-center">
                              <p class="text-sm leading-none text-gray-600 ml-2">
                                {noti.noti_message}
                              </p>
                            </div>
                          </td>
                          <td class="pl-4">
                            <button class="focus:ring-2 focus:ring-offset-2 focus:ring-red-300 text-sm leading-none text-gray-600 py-3 px-5 bg-gray-100 rounded hover:bg-gray-200 focus:outline-none">
                              이동
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}

export default NotiView
