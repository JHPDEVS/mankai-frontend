import React, { useState } from "react";
import axios from 'axios'
import { Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useSelector } from "react-redux";


export default function App() {

  const url = "/api/post/memo"
  const user = useSelector((state)=>state.Reducers.user)
  const[data, setData] = useState("")

  function handle(e){
    setData(e.target.value)
  }

  function submit(){
    axios.post(url, {
      content : data,
      writer : user.id
    })
  }

  return (
    <div className="MemoBackground">
      <div >         
        
        <h2 className="text-2xl block m-3">My Memo</h2>

        <form onSubmit={(e)=>submit(e)}>
            
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
              value={data.content}>

            </textarea>
            
            
              
            <div className="block m-3">
              <Button variant="contained" className="float-right" onClick={submit} startIcon={<SendIcon />}>
                Save
              </Button>
            </div>
            
        </form> 
        
        

      </div>
    </div>
);
}

