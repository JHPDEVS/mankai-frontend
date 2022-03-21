import React, { useState } from "react";
import Header from "../../admin/layout/Header";
import Sidebar from "../../admin/layout/Sidebar";


function GroupPage(){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return(
        <div>
        <div className="flex h-screen">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            <div className="relative  flex-col flex-1">
                {/*  Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="w-full">
                    <div className="bg-gray-200 flex relative ">
                        {/* 그룹페이지*/}
                        그룹페이지 입니다.
                    </div>
                </div>

            </div>
        </div>
    </div>
    )
}

export default GroupPage;