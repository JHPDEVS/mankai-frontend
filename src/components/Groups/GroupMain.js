import React, {useState} from "react";
import Sidebar from "../../admin/layout/Sidebar"
import Header from "../../admin/layout/Header"
import GroupList from "./GruopList";

function Group() {
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
                            {/* 그룹메인페이지 : 그룹리스트 */}
                            <GroupList/>
                        </div>
                    </div>

                </div>
            </div>
        </div>

    )
}

export default Group;