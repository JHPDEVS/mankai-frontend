import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

export default function PostList() {
  return (
    <List sx={{ width: '100%', maxWidth: 750, bgcolor: 'background.paper' }}>
    {postData.map((item)=>(
        <ListItem  key={item.id} >
        <ListItemText primary={item.title} secondary={item.group} />
      </ListItem>

    ))}
    
    </List>
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
        id:1,
        title: "비오는날.. 이노래 들어보세요",
        group:"음악 추천",
    },
]