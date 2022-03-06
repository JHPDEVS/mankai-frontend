import React from "react";
import Sidebar from "../admin/layout/Sidebar"
import Header from "../admin/layout/Header"

import MyUser from './MyPage/MyUser';
import MyContents from './MyPage/MyContents'



function Mypage() {
    return (
        <>
          <Header/>
          <Sidebar/>

            <div className="inline-flex bg-gray-200 p-3">

                {/* 화면에서 왼쪽 : 내 정보 간략히 보여주는 컴포넌트 */}
                <div className="w-1/3 p-3">
                    <MyUser/>
                </div>
                
                {/* 화면에서 오른쪽 : 즐겨찾기, 게시물, 그룹, 메모장 */}
                <div className="w-2/3 p-3">
                <MyContents/>
                </div>

            </div>

        </>
           
    )
}

export default Mypage;