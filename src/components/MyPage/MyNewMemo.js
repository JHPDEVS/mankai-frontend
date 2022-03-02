import React from "react";
import { useState } from "react";
import { Button, Grid, IconButton, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';



export default function App() {

  const [showEditor, setShowEditor] = useState(false)

  return (
    <div className="MemoBackground">
      <div >

        <Grid item xs={12} md={6}>
              <List >
              {newMemoData.map((item)=>(
               
                <ListItem key={item.id} 
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
              
              <Button variant="contained" startIcon={<SendIcon />}>
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

      </div>
    </div>
);
}


const newMemoData = [
  {
      id:1,
      title: "시즈쿠랑 데이트",
      contents:"美容院 : 비요우인 : 미용실 ",
  },
  {
      id:2,
      title: "회의내용",
      contents:"사진 동호회",
  },
  {
      id:3,
      title: "노래 추천 해 줄 목록",
      contents:"아조 미레이-독트린"    
  },
]