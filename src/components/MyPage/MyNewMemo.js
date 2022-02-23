import React, { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Grid, IconButton, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';

import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
export default function App() {

  return (
    <div className="MemoBackground">
      <Box >

      <Grid item xs={12} md={6}>
            <List >
                <ListItem>
                  <ListItemText
                    primary="Single-line item"
                   />
                     <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  
                </ListItem>
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
    </Box>


    </div>



);
}


