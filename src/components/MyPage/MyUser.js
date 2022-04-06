import * as React from 'react';
import Typography from '@mui/material/Typography';
import {Skeleton} from '@mui/material'
import { Link } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import '../../styles/MyPage.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TextField from '@mui/material/TextField'
import colors from 'vuetify/lib/util/colors';
import '../../App.css'
import axios from 'axios';

export default function MyUser() {
  const user = useSelector(state => state.Reducers.user);

  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setImageToServer(user.profile)
    setOpen(true);
  }
  const handleClose = () => setOpen(false);

  const [nameFieldValue,setNameFieldValue] = React.useState("");
  const [countryFieldValue,setCountryFieldValue] = React.useState("");
  const [descriptionFieldValue,setDescriptionFieldValue] = React.useState("");
  const [imageToServer,setImageToServer] = React.useState("");
  // 서버에 보낼 4개
  
  const [previewUrl,setPreviewUrl] = React.useState("");

  React.useEffect(()=>{
    if(user){
    setNameFieldValue(user.name)
    setCountryFieldValue(user.country)
    setDescriptionFieldValue(user.description)
    setPreviewUrl(user.profile)
  }
  },[user])

  const nameTextChange = (e) => {
    setNameFieldValue(e.target.value);
  }

  const countryTextChange = (e) => {
    setCountryFieldValue(e.target.value);
  }

  const descriptionTextChange = (e) => {
    setDescriptionFieldValue(e.target.value);
  }

  const imageHandleChange = (e) => {
    setImageToServer(e.target.files[0])
    setPreviewUrl(URL.createObjectURL(e.target.files[0]))
  }

  const profileToServer = () => {
    const formData = new FormData();
    formData.append('user_id', user.id);
    formData.append('name',nameFieldValue)
    formData.append('country',countryFieldValue)
    formData.append('description',descriptionFieldValue)
    formData.append('image',imageToServer)   
    
    axios.post('/api/profile',formData)
    .then((res)=>{
      console.log(res);
      dispatch({
        type : "UPDATE_USER",
        payload : {
          name:nameFieldValue,
          country:countryFieldValue,
          description:descriptionFieldValue,
          image:res.data
        }
      });
      handleClose();
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    borderRadius: 2,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 1,
  };

  return (
    <div id='user_page' className='bg-white border-solid rounded-lg p-3 drop-shadow-xl '>
    
    <img id='cardImg' className="profile_image1"  src={(user) ? (user.profile) : "https://www.taggers.io/common/img/default_profile.png"} alt="Avatar"/>

      {/* 이미지 창 줄여도 유지되게끔 */}
      {/* YouUser는 되는데 왜.. */}
        <div className="text-2xl mt-5 grid justify-items-center font-black">
          {(user) ? user.name : <Skeleton variant="rectangular" style={{ borderRadius: 4, }} width={150} height={50} />}
          
        <br/>
        <Typography variant="body2" color="text.secondary" sx={{ textOverflow: 'ellipsis', mt:3 }}>
          {(user) ?
          user.description
          :
          null
          }
        </Typography>
        </div>

        <br/>

          <div className = "grid justify-items-end">
          <button onClick={handleOpen} className='flex items-center bg-purple-600  hover:bg-purple-800 text-white py-2 px-4 rounded '>
              <EditIcon sx={{ mr:1 }}/>프로필 편집
          </button>
          </div>
        {/* /profile에 대한 컴포넌트 없애기 */}


        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className = "grid justify-items-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            프로필 변경
          </Typography>
          </div>
          <hr style={{
             width:'380px',
         }}/>
          <Box sx={{ p:2 }}>
          <div className = "grid justify-items-center" >
          <label htmlFor="file">
          <img  alt="" src={(previewUrl) ? previewUrl : "https://www.taggers.io/common/img/default_profile.png"} className="profile_image" />
          </label>
          <input onChange={imageHandleChange} type="file" id="file" style={{ display:"none" }}/>
          </div>
         {/* 사진 아무것도 설정 안하기도 있어야 됨 */}

           <TextField 
          fullWidth 
          value={nameFieldValue}
          onChange={nameTextChange}
          multiline 
          maxRows={2}
          id="standard-basic" 
          label="이름" 
          variant="standard"
          style={{ margin:3 }}
          />

<TextField 
          fullWidth 
          value={countryFieldValue}
          onChange={countryTextChange}
          multiline 
          maxRows={2}
          id="standard-basic" 
          label="국적" 
          variant="standard"
          style={{ margin:3 }}
          />

<TextField 
          fullWidth 
          value={descriptionFieldValue}
          onChange={descriptionTextChange}
          multiline 
          maxRows={2}
          id="standard-basic" 
          label="상태메시지" 
          variant="standard"
          style={{ margin:3 }}
          />
          <button onClick={profileToServer} className='flex items-center bg-purple-600 w-full hover:bg-purple-800 text-white py-2 px-4 mt-4 rounded grid justify-items-center'>
              프로필 수정
          </button>
          </Box> 
        </Box>
      </Modal>

      
    </div>
  );
}
