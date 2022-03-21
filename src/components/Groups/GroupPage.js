import React, { useState } from "react";
import Header from "../../admin/layout/Header";
import Sidebar from "../../admin/layout/Sidebar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "@mui/material";
import GroupPagein from "./GroupPagein";
import GroupBar from "./GroupBar";


function GroupPage(){
    const [sidebarOpen, setSidebarOpen] = useState(false)
    return(
        <div>
        <div className="flex h-screen">
                <div className="relative  flex-col flex-1">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                    <div className="w-full">
                        <div className="flex relative ">
                            {/* 그룹메인페이지 : 그룹리스트 */}
                            <GroupBar/>
                            <GroupPagein/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default GroupPage;