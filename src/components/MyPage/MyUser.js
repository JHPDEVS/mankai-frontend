import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import avatar from '../../images/sosoeueunOctocat.png'
import '../../styles/MyPage.css'

export default function ImgMediaCard() {

  return (
    <div className='bg-white border-solid rounded-lg p-3 drop-shadow-xl '>
      <Link to="/profile">
        <SettingsIcon color="action" className='float-right'/>
      </Link>
      <img id='cardImg' src={avatar} alt="Avatar"/>
    
        <h1>sosoeueun</h1>
        <br/>
        <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis' }}>
          김소은은 자기소개 따위 필요 없다. 말하는 감자이기 때문이다.
        </Typography>

        <br/>

        <Link to="/profile">
          <button className='flex items-center bg-purple-600  hover:bg-purple-800 text-white py-2 px-4 rounded-full '>
              프로필 편집
          </button>
        </Link>
      
    </div>
  );
}
