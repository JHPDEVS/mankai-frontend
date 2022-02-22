import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


import ReactRoundedImage from "react-rounded-image";
import { IconButton } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


export default function ImgMediaCard() {
 
  return (
    <Card sx={{ maxWidth: 300 }} className="card">

       <div className='cardImg'>
        <ReactRoundedImage className='imgFile' roundedSize="0" imageWidth="110" imageHeight="110" />
      </div>
      
      <CardContent>
        <Typography className='name' gutterBottom variant="h5" component="div">
          나는 누구인가
        </Typography>
        <Typography variant="body2" color="text.secondary">
          타인의 프로필 입니다.
        </Typography>

      </CardContent>
      <CardActions className='cardFooter'>
        <Button size="small">
            Chatting
        </Button>

        <IconButton aria-label="setting">
        <SettingsIcon className='settingIcon'/>
      </IconButton>

      </CardActions>
    </Card>
  );
}
