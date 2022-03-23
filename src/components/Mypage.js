import React, {useState} from "react";
import Sidebar from "../admin/layout/Sidebar"
import Header from "../admin/layout/Header"

import MyUser from './MyPage/MyUser';
import MyContents from './MyPage/MyContents'

function Mypage() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return (

        <div>
            <div className="flex h-screen">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="relative  flex-col flex-1">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="w-full">
                        <div className="bg-gray-200 flex relative ">

                            {/* 화면에서 왼쪽 : 내 정보 간략히 보여주는 컴포넌트 */}
                            <div className="w-1/3 p-3">
                                <MyUser/>
                            </div>

                            {/* 화면에서 오른쪽 : 즐겨찾기, 게시물, 그룹, 메모장 */}
                            <div className="w-2/3">
                                <MyContents/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Mypage;