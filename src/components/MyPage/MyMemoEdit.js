import React, { memo, useEffect, useState } from "react";
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

export default function App({match}) {
  
  const url = "/api/post/memo"

  // 메모 아이디 값에따라 받아 와야 함
  useEffect(() => {
    axios
        .get('/api/show/memos/' + match.params.id)
        .then(res => {
            console.log(res)
            setMemos(res.data)
        })
  }, [])
  
  const [memos, setMemos] = useState([]);

  const user = useSelector((state)=>state.Reducers.user)

  const[data, setData] = useState("")

  function handle(e){
    setMemos(e.target.value)
  }

  // 저장요청
  function submit(){
    axios.post(url, {
      content : data,
      writer : user.id
    })
  }

  // 삭제 요청

  return (
      
      <div className="MemoBackground">
      <div >         
        
        <h2 className="text-2xl block m-3">My Memo Edit</h2>
       
            <textarea className="form-control
              block
              w-full
              h-96
              px-3
              py-3
              text-base
              font-normal
              text-gray-700
              bg-white bg-clip-padding
              border border-solid border-gray-300
              rounded
              transition
              ease-in-out
              m-0
              focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              onChange={(e)=> handle(e)}
              value={memos.memo}>

            </textarea>
            
            
              
            <div className="block m-3">
              <Button variant="contained" className="float-right" onClick={submit} startIcon={<SendIcon />}>
                Save
              </Button>
            </div>
            
        
        

      </div>
    </div>
      
);
}
