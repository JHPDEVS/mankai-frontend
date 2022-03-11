import { Button, Fab } from "@mui/material";
import React from "react";
import EditIcon from '@mui/icons-material/Edit';

export default function MyPage(){

    return( 
        <div>

<div class="flex items-center max-w-md mx-auto bg-gray-200 rounded-lg" >
        <div class="w-full">
            <input type="search" class="w-full px-4 py-1 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
                placeholder="search"/>
        </div>
        <div>
            <button type="submit" class="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
        
    </div>
    
    

    {/* 메모 종류에따라 조건 바꾸기 */}
    {
        1 == true && 
        <div className="balloon">
            sssss
            <br/>
            <span ><Button onClick={MyMemo}>수정</Button><Button>삭제</Button></span>
            
        </div>

    }

    <Fab color="" onClick={MyMemo}>
        <EditIcon />
    </Fab>

    </div>
    )
}

const ChattingMemo = () => (
     window.open("/chatting_memo", "", "width=500,height=600")
  )

  const PostMemo = () => (
    window.open("/post_memo", "", "width=500,height=600")
 )

 const MyMemo = () => (
    window.open("/my_new_memo", "", "width=500,height=600")
 )