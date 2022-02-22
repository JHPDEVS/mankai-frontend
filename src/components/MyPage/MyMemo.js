import { Button, Stack } from "@mui/material";
import React from "react";

export default function MyPage(){
    return( 
        <Stack direction="row" spacing={2}>
        <Button variant="contained" onClick={ChattingMemo} >채팅 메모</Button>
        <Button variant="contained" onClick={PostMemo}>게시글 메모</Button>
        <Button variant="contained" onClick={MyMemo}> 내 메모 </Button>

    </Stack>
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