<<<<<<< HEAD
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from "axios";
import React, { useEffect, useState } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Modal, Typography } from '@mui/material';

=======
import * as React from 'react';
import { Box,  Modal } from '@mui/material';
import PostModal from './PostModal';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector } from 'react-redux';
import axios from 'axios';
>>>>>>> dfadfd8944e50021b31ea10489e14738cafd89af

export default function PostList() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  
  const user = useSelector((state)=>state.Reducers.user)
  const [myPostData, setMyPostData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

<<<<<<< HEAD
  
=======
  React.useEffect(()=>{
    axios.get("/api/get/board/"+user.id)
    .then(res=>{
      setMyPostData(res.data)
    })
  },[])
>>>>>>> dfadfd8944e50021b31ea10489e14738cafd89af

  return (
   <div>
    {myPostData.map((postData)=>{
      return(
        <div>
            <div className='border border-gray-300 rounded py-2 px-4 my-3'>
                <img className="rounded-full border border-gray-100 w-12 h-12 inline-block" src="" alt="img" />
                <span className='px-3' onClick={handleOpen} >{postData.name}</span>
                <BsThreeDots className='float-right my-4 mx-4'/>    
            </div>
            <p>{postData.content_text}</p>
                  
          </div>
      )})}
    
            {/* 게시글 */}
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className='rounded-lg'>
        <PostModal/>
      </Box>
    </Modal>

   </div>
  );
}

