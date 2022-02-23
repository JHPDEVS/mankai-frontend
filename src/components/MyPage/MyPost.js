import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Box, Button, Modal, Typography } from '@mui/material';


export default function PostList() {

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
   <div>
      <List sx={{ width: '100%', maxWidth: 750, bgcolor: 'background.paper' }}>
    {postData.map((item)=>(
        <ListItem  key={item.id} >
        <ListItemText onClick={handleOpen} primary={item.title} secondary={item.group} />
      </ListItem>

    ))}
    </List>
  
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          사진 동호회 회원 모집
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        각 나라에서 가장 아름답다고 생각되는 사진을 찍어 올려주세요!
          퍼온 사진은 안됩니다!
        </Typography>
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