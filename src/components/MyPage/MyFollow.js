import * as React from 'react';
import { useState } from 'react'; 
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import NewWindow from 'react-new-window'
export default function FollowList() {

  return (
    <List sx={{ width: '100%', maxWidth: 750, bgcolor: 'background.paper' }}>
      {followData.map((item)=>(
        <ListItem alignItems="flex-start"  sx={{ borderBottom: 1, borderColor: 'divider' }}  key={item.id}>
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src={`${item.img}?w=248&fit=crop&auto=format`} />
        </ListItemAvatar>
        <ListItemText
          onClick={youProfile}
          primary={item.name}
          secondary={
          
              <Typography
                sx={{ display: 'inline' }}
                component="span"
                variant="body2"
                color="text.primary"
              >
               {item.sogae}
              </Typography>
          
          }
        />
      </ListItem>
      ))}

      
    </List>
  );
}

const youProfile = () => (
  window.open("/youProfile", "", "")
)


const followData = [
    {
      id:1,
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      name: '이현호',
      sogae: '나는 돼지다'
    },
    {
        id:2,
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        name: '박주형',
        sogae: '나는 히틀러다'
      },
      {
        id:3,
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        name: '장성규',
        sogae: '나는 착하다'
      },
      {
        id:4,
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        name: '서재열',
        sogae: '나는 신중하다'
      },
      {
        id:5,
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        name: '최지성',
        sogae: '나는 운동한다'
      },
]