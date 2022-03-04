import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function ImgMediaCard() {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="프로필 사진"
        height="140"
        image="https://w.namu.la/s/5172a67e3702bf33b32f512c1cdf0cd6308eaf75937ff6ff2ae4ed338c8ee2fdfe2fc8ac13127fc0a70de4aa3bc83660fc9368fdf89a7d84c66625f8f76ba45a32a2d2a360088f83fa5bdb882d884272"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          sosoeueun
        </Typography>
        <Typography variant="body2" color="text.secondary">
          김소은은 자기소개 따위 필요 없다. 말하는 감자이기 때문이다.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">
            Chatting
        </Button>
      </CardActions>
    </Card>
  );
}