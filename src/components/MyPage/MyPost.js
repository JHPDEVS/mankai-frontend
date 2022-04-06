import React, { useEffect, useState } from "react";
import { Box,  Modal, Skeleton } from '@mui/material';
import PostModal from './PostModal';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { BoardUpdate } from '../../store/actions';
import axios from 'axios';
import MyPostBoardCard from '../../layouts/MyPostBoardCard'

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';


export default function MyPost(props) {

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

  const dispatch = useDispatch();
  const boards = useSelector((state)=>state.Reducers.boardData); 
  const user = useSelector((state)=>state.Reducers.user)
  const [myPostData, setMyPostData] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const likeData = useSelector((state)=>state.Reducers.likeData)

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  
  let array = [];
  const [infHandle, setInfHandle] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);


  const ShowBoard = () => {
    axios.get('/api/myposts/'+user.id+"?page="+currentPage)
    .then((res)=>{
        console.log("myPost:",res.data.data)
        //??? setCurrentPage(res.data.current_page+1);
        //??? 이건 플러스버튼을 눌렀을 때 일어나야 되고
        setLastPage(res.data.last_page);
        const fakeMyPostData = [];
        for(let i = 0; i<res.data.data.length; i++){
            fakeMyPostData.push(res.data.data[i])
            array.push(res.data.data[i].id)
        }
        setMyPostData(fakeMyPostData)

        for(let i = 0 ;i < res.data.data.length; i++){
        dispatch({
          type:"BOARD_UPDATE",
          payload:{boardData:res.data.data[i]}
        })
      }

        axios.post("api/show/like",{
            data:array
        })
        .then(res=>{
            res.data.forEach(element => {
                dispatch({
                    type:'LIKE_UPDATE',
                    payload:{
                        likeData:element
                    }
                })
            })
        })
        .catch((err)=>{
            console.log(err);
        })
        

    })
    .catch((err)=>{
        console.log(err);
    })

}

const paginateHandle = (event,value) =>{
  setCurrentPage(value);
}

useEffect(()=>{
  console.log("currentPage:",currentPage)
  ShowBoard()
},[currentPage])



  return (
    <>
      <Stack id="top"  spacing={2}>
      {/* ?! 다음페이지를 눌렀을 때 currentPage 업데이트가 안된다. */}
      {myPostData.map((myPost,idx) =>{
      return(   
          <div key={idx}>
              <MyPostBoardCard board={myPost} likeData={likeData} currentPage={currentPage} ShowBoard={ShowBoard} idx={idx}/>
           </div>
            )
           })}

           {/* 댓글 보내야된다. 좋아요하고 */}
      <Pagination
        count={lastPage}
        page={currentPage}
        className="flex justify-center"
        onChange={paginateHandle}
        
        renderItem={(item) => (
          <PaginationItem
            href="#top"
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
      </Stack>
    
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
    </>
  );
}
