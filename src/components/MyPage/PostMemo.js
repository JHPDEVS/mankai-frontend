import React from "react";
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function App() {

  return (
    <div className="MemoBackground">
      <div >

        <Grid item xs={12} md={6}>
              <List >
              {newMemoData.map((item)=>(
               
                <ListItem key={item.id}>
                    <ListItemText
                      primary={item.title}
                    />
                  </ListItem>
              ))}
                
              </List>
            
        </Grid>

          <Paper>
          <div style={{ border: "1px solid black", padding: '2px', minHeight: '400px' }}>
          <Editor />
          </div>

          </Paper>

          <Stack direction="row" spacing={2}>
          
          <Button variant="contained" startIcon={<SendIcon />}>
            Send
          </Button>
          
          <Button variant="outlined" startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </Stack>
      </div>
    </div>
);
}


const newMemoData = [
  {
      id:1,
      title: "사진 동호회 회원 모집",
      contents:"美容院 : 비요우인 : 미용실 ",
  },
  {
      id:2,
      title: "직장인이 가장 좋아하는 요일은?",
      contents:"사진 동호회",
  },
  {
      id:3,
      title: "비오는날.. 이노래 들어보세요",
      contents:"아조 미레이-독트린"    
  },
]