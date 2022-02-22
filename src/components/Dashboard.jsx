import React, { useState } from 'react'

import Sidebar from '../admin/layout/Sidebar'
import Header from '../admin/layout/Header'
function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            메인화면 메인화면 메인화면 메인화면메인화면 메인화면 v 메인화면
            메인화면 메인화면 메인화면
            <div>메인</div>
            <div>메인</div>ㅍ<div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>ㅍ<div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div> <div>메인</div>
            <div>메인</div> <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div> <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div>
            <div>메인</div> <div>메인</div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
