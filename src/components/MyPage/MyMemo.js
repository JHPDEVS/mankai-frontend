import { Button, Fab } from "@mui/material";
import React from "react";
import { useState, useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";

export default function MyMemo(props){
    const [postMemo, setPostMemo] = useState(props.postMemo);
    const [messageMemo, setMessageMemo] = useState(props.messageMemo);


    const [allMemo, setAllMemo] = useState([]);
    const [allMemoExist, setAllMemoExist] = useState([]);

    useEffect(()=>{
       setAllMemo([...postMemo,...messageMemo])
       console.log("allMemo:",allMemo);
    },[])

    useEffect(()=>{
        var intoAllMemoExist = new Array(allMemo.length).fill(true)
        setAllMemoExist(intoAllMemoExist);
    },[allMemo])
    
const ChattingMemo = () => (
    window.open("/chatting_memo", "", "width=500,height=600")
 )

 const PostMemo = () => (
   window.open("/post_memo", "", "width=500,height=600")
)

const MyMemo = () => {
    console.log({postMemo})
    console.log({messageMemo})
    console.log({allMemo})
   
   window.open("/my_new_memo", "", "width=500,height=600")
}

const postMemoDelete = (memo_id,idx) => {
    const copiedAllMemoExist = [...allMemoExist]
    copiedAllMemoExist[idx] = false;
    setAllMemoExist(copiedAllMemoExist)
    axios.post('/api/deletemypostmemos/'+memo_id)
    .then((res)=>{
        console.log("삭제성공")
    })
    .catch((err)=>{
        console.log(err);
    })
}

const messageMemoDelete = (memo_id,idx) => {
    const copiedAllMemoExist = [...allMemoExist]
    copiedAllMemoExist[idx] = false;
    setAllMemoExist(copiedAllMemoExist)
    axios.post('/api/deletemymessagememos/'+memo_id)
    .then((res)=>{
        console.log("삭제성공")
    })
    .catch((err)=>{
        console.log(err);
    })
}
    return( 
        <div>



<div class="flex items-center max-w-md mx-auto bg-gray-200 rounded-lg" >
        <div class="w-full">
        
            <input type="search" class=" w-full px-4 py-1 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
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
    
    

    
    
    {
        allMemo.map((memo,idx)=>{
            return(
            <>
            {
             (memo.category) ?
                    (allMemoExist[idx]) ?
                    <div className="postballoon">
                    <div>{memo.name}</div>
                    {memo.content_text}
                    <br/>
                    <span>
                        <Button onClick={MyMemo}>수정</Button>
                        <Button onClick={() => {postMemoDelete(memo.id,idx)}}>삭제</Button></span>
                    </div>
                    :null
                      : 
             (memo.message) ?
             (allMemoExist[idx]) ?
             <div className="chatballoon">
                    <div>{memo.name}</div>
                    {memo.message}
                    <br/>
                    <Button onClick={MyMemo}>수정</Button><Button onClick={() => {messageMemoDelete(memo.id,idx)}}>삭제</Button>
             </div>
             :null
                     :
                     null
            }
            </>
            )
        })
    }
    
    
    <Fab onClick={MyMemo} color="">
        <EditIcon />
        </Fab>
   

    </div>
    )
}
