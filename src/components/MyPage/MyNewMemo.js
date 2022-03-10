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
        <Grid item xs={12} md={6}>
              <List >
              {newMemoData.map((item)=>(
               
                <ListItem key={item.contents} 
                className="border-b-2 border-indigo-500"
                onClick={() => setShowEditor(true)}
                >
                    <ListItemText
                    
                      primary={item.title}
                    />
                  </ListItem>
                  
              ))}
                
              </List>
            
        </Grid>
        
         
        { showEditor ? 
        <div>
            <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
            <TextField id="standard-basic" label="글 제목" variant="standard" />
            <Editor/>
            </div>
            <Stack direction="row" spacing={2}>
              
              <Button type="submit"variant="contained" startIcon={<SendIcon />}>
                Send
              </Button>
              
              <Button variant="outlined" startIcon={<DeleteIcon />}>
                Delete
              </Button>

              <Button
                onClick={() => setShowEditor(false)}
              >
                 닫기
               </Button>
            </Stack>
        </div> 
        :
        <Button
          onClick={() => setShowEditor(true)}
        >
          새 메모 추가
        </Button> 
        }
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
const newMemoData = [
  {
      id:1,
      title: "testing",
      contents:"testing content ",
  },
  {
      id:2,
      title: "회의내용",
      contents:"사진 동호회",
  },
  {
      id:3,
      title: "노래 추천 해 줄 목록",
      contents:"12345"    
  },
]