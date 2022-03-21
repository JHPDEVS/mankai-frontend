import React from "react";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "@mui/material";


function GroupList (){

    const list = [
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
        {
            '그룹 명' : 'ㅇㅇㅇ',
            '멤버 수' : 123
        },
    ]

    return(
        <div>
            <div className="">
            
                <div class="h-screen bg-gray-200  dark:bg-gray-800   flex flex-wrap items-center  justify-center  ">
                    {/* 컴포넌트 */}
                        <div class="w-1/4 bg-white shadow rounded-[20px]">
                            {/* 배경화면 */}
                            <div class=" h-32 overflow-hidden rounded-t-[20px]" >
                                <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                            </div>
                            {/* 동그란 */}
                            <div class="flex justify-left px-5  -mt-6">
                                <div class="h-16 w-16 bg-white p-2 rounded-full justify-center drop-shadow-lg ">
                                    <StarBorderIcon className="flex flex-wrap items-center  justify-center"/>
                                </div>
                            </div>
                            <div class=" ">
                                <div class="text-center px-14">
                                <Link href="/grouppage" underline="none">
                                <h2 class="text-gray-800 text-xl font-bold">그룹명</h2> 
                                </Link>
                                    <h5 className="text-slate-500 text-sm">멤버 수 : </h5>                               
                                </div>
                                <hr class="mt-6" />
                            </div>
                        </div>
                        
                    {/* 컴포넌트 */}
                </div>
            </div>
        </div>
    )
}

export default GroupList;