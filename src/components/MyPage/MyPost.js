import React, { useEffect, useState } from "react";
import { Box,  Modal, Skeleton } from '@mui/material';
import PostModal from './PostModal';
import { BsThreeDots } from 'react-icons/bs';
import { useSelector,useDispatch } from 'react-redux';
import { BoardUpdate } from '../../store/actions';
import axios from 'axios';
import BoardCard from '../../layouts/BoardCard'

import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default function PostList(props) {

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
        console.log("myPost:",res.data)
        //??? setCurrentPage(res.data.current_page+1);
        //??? 이건 플러스버튼을 눌렀을 때 일어나야 되고
        setLastPage(res.data.last_page);
        const fakeMyPostData = [];
        for(let i = 0; i<res.data.data.length; i++){
            fakeMyPostData.push(res.data.data[i])
            array.push(res.data.data[i].id)
        }
        setMyPostData(fakeMyPostData)

        // axios.post("api/show/like",{
        //     data:array
        // })
        // .then(res=>{
        //     res.data.forEach(element => {
        //         dispatch({
        //             type:'LIKE_UPDATE',
        //             payload:{
        //                 likeData:element
        //             }
        //         })
        //     })
        // })
        // .catch((err)=>{
        //     console.log(err);
        // })
        

    })
    .catch((err)=>{
        console.log(err);
    })

}

const paginateHandle = (e) =>{
  setCurrentPage(e.target.outerText);
  console.log(e.target.outerText);
}

useEffect(()=>{
  ShowBoard()
},[currentPage])

useEffect(()=>{
  ShowBoard()
},[])



  return (
  
      <>
      <Stack spacing={2}>

      {myPostData.map((myPost,idx) =>{
      return(   
          <div key={idx}>
              <BoardCard board={myPost} likeData={likeData} idx={idx}/>
           </div>
            )
           })}

      <Pagination
        count={lastPage}
        onChange={paginateHandle}
        // ???previous, next할 때 다음페이지, 이전페이지로 이동해야한다.
        // 그리고 페이지 이동할 때 가장 위에가 보이게 해야된다.
        renderItem={(item) => (
          <PaginationItem
            components={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
          //??? 얘 가운데에 놔야된다.
          //??? 고정시키는게 좋을 것 같다.
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

