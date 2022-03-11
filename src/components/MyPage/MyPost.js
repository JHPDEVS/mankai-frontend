import * as React from 'react';
import { Box,  Modal } from '@mui/material';
import PostModal from './PostModal';
import { BsThreeDots } from 'react-icons/bs';

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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  return (
   <div>
    <div className='border border-gray-300 rounded py-2 px-4 my-3'>
                <img className="rounded-full border border-gray-100 w-12 h-12 inline-block" src="" alt="img" />
                <span className='px-3' onClick={handleOpen} >유저이름</span>
                <BsThreeDots className='float-right my-4 mx-4'/>    
            </div>

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

const postData = [
    {
        id:1,
        title: "사진 동호회 회원 모집",
        group:"사진 동호회",
        image:""
    },
    {
        id:2,
        title: "직장인이 가장 좋아하는 요일은?",
        group:"직장인은 힘들어",
    },
    {
        id:3,
        title: "비오는날.. 이노래 들어보세요",
        group:"음악 추천",
    },
]