import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

import avatar from '../../images/sosoeueunOctocat.png'
import '../../styles/MyPage.css'

export default function ImgMediaCard() {

  return (
    <div className='w-1/3'>
      <Card className="card">

      <img id='cardImg' src={avatar} alt="Avatar"/>
    
      <CardContent>
        <Typography className='name' gutterBottom variant="h5" component="div">
          sosoeueun
        </Typography>
        
        <Link to="/profile">
          <Button size="small" className='ProfileEdit'>
              프로필 편집
          </Button>
        </Link>

        <Typography variant="body2" color="text.secondary">
          김소은은 자기소개 따위 필요 없다. 말하는 감자이기 때문이다.
        </Typography>

      </CardContent>

      <CardActions className='cardFooter'>
      
        <Link to={"#"}>
          <Button size="small">
                Chatting
            </Button>
        </Link>

      </CardActions>
      </Card>
    </div>
  );
}
