import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import avatar from '../../images/sosoeueunOctocat.png'
import '../../styles/MyPage.css'

export default function ImgMediaCard() {

  return (
    <div className='bg-white border-solid rounded-lg p-3 h-full'>
      <Link to="/profile">
        <SettingsIcon color="action" className='float-right'/>
      </Link>
      <img id='cardImg' src={avatar} alt="Avatar"/>
    
        <h1>sosoeueun</h1>
       
        <Typography variant="body2" color="text.secondary">
          김소은은 자기소개 따위 필요 없다. 말하는 감자이기 때문이다.
        </Typography>

        <Link to="/profile">
          <button className='bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-full items-center'>
              프로필 편집
          </button>
        </Link>
      
    </div>
  );
}
