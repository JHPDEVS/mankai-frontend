import * as React from 'react'
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import Icon from '@mui/material/Icon'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'
import { IoIosCloseCircle } from "react-icons/io";
import { MdAddPhotoAlternate } from "react-icons/md";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { IoMdPhotos } from "react-icons/io";
import axios from 'axios'
import { useSelector } from 'react-redux';
import '../App.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxHeight: 630,
  borderRadius:'10px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export default function GroupWriteModal({group_id,category_id,GetUpdate}) {
  const [muiSelectValue, setMuiSelectValue] = useState("전체");
  const [open, setOpen] = React.useState(false);
  const [textfieldvalue,setTextFieldValue] = useState("");
  const [selectedImages, setSelectedImage] = useState([])
  const [imageContainer, setImageContainer] = useState(false); 
  const [fileType, setFileType] = useState([]);
  const [imageToServer, setImageToServer] = useState([]);
  const [dragIn, setDragIn] = useState(false);
  const user = useSelector(state=> state.Reducers.user);
  const [username, setUsername] = useState('');
  const imageHandleChange = (e) => {
    // console.log(e.target.files)
  if(e.target.files){
    const targetImages = Array.from(e.target.files).map((file) => file);
    setImageToServer([...imageToServer, ...targetImages]);
 
    const fileTypeArray = Array.from(e.target.files).map((file) =>file.type)
    setFileType((prevFileType)=>prevFileType.concat(fileTypeArray));
    
    const fileArray = Array.from(e.target.files).map((file) => 
      URL.createObjectURL(file)
    )
    setSelectedImage((prevImages)=>prevImages.concat(fileArray))
  e.target.value="";
  }    
  }
  


  const dndHandleChange = (files) => {
    const dndFileTypes = []
    
  const targetImages = Array.from(files).map((file) => file);
  setImageToServer([...imageToServer, ...targetImages]);
    
    for(let i = 0 ; i<files.length ; i++){
      dndFileTypes.push(files[i].type);
    }
    setFileType((prevFileType)=>prevFileType.concat(dndFileTypes))
    const dndSelectedImage  = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
   

    setSelectedImage((prevImages)=>prevImages.concat(dndSelectedImage))
  }

  const showImageContainer = () => {
    setImageContainer(true);
  }

  const dontImageContainer = () => {
    const emptyArray = [];
    setSelectedImage(emptyArray)
    setFileType(emptyArray)
    setImageContainer(false);
    setImageToServer([]);
  }

  const textChange = (e) => {
    setTextFieldValue(e.target.value);
  };

 const dragOver = (e) => {
   e.preventDefault();
   setDragIn(true);
 }

 const dragEnter = (e) => {
  e.preventDefault();
}

const dragLeave = (e) => {
  e.preventDefault();
  setDragIn(false);
}

const fileDrop = (e) => {
  e.preventDefault();
  const dndFile = e.dataTransfer.files;
  dndHandleChange(dndFile);
  setDragIn(false);
}


  const handleOpen = () => {
    setUsername(user.name);
    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const isOpen = useSelector((state=>state.Reducers.isOpen))

  const deleteImage = (index) => {
    const copiedSelectedImage = [...selectedImages]
    copiedSelectedImage.splice(index,1);
    setSelectedImage(copiedSelectedImage);
    

    const copiedFileType = [...fileType]
    copiedFileType.splice(index,1);
    setFileType(copiedFileType);

    const copiedImageToServer2 = [...imageToServer]
    copiedImageToServer2.splice(index,1)
    setImageToServer(copiedImageToServer2);
    console.log(imageToServer);

  }

  const SelectChange = (event) => {
    setMuiSelectValue(event.target.value);
  };

  const data = {
    textfieldvalue : textfieldvalue,
    selectedImages : selectedImages,
    muiSelectValue : muiSelectValue,
    group_id:group_id, 
    category_id:category_id,
    user : user,
  }
  

  const toServer = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for(let i = 0 ; i < imageToServer.length ; i++){
      formData.append(`images${i}`, imageToServer[i])
    }
    axios.post('/api/post/groupboard', data)
    .then(function (response) {
      formData.append('post_id',response.data["id"]);
      console.log(response.data["id"]);
      axios.post('/api/post/groupboardimage', formData)
      .then(function(response) {
        console.log(response.data)
         handleClose();
        GetUpdate();
      }).catch(function(error){
        console.log(error);
      })

    })
    .catch(function (error) {
      console.log(error);
    });

    
  }


  return (
    <div>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>


<div className={'w-fit fixed bottom-12 mr-12 z-10 '+(isOpen ? "right-192" : "right-0")}>
            <Fab color="primary" onClick={handleOpen}> <AddIcon /></Fab>
        </div>


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        
       

        <Box sx={style}>
        <div className="flex justify-start pb-3">
            <img src="https://images.pexels.com/photos/3278968/pexels-photo-3278968.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                className="h-14 w-14 rounded-full object-cover"
                alt="username"/>
            <div className="ml-4 mt-2">
                <div className="flex items-center">
                    <h2 style={{ fontWeight:'bold' }}>{username}</h2>
                </div>

                <ul className="flex justify-content-around items-center">
                </ul>
                <br/>
            </div>
            <FormControl sx={{ ml:2, mt:0.7 }}>
      <InputLabel
      size="small"
      id="demo-simple-select-label">category</InputLabel>
      <Select 
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        sx={{ minWidth: 110, maxHeight:35 }}
        label="Age"
        value={muiSelectValue}
        onChange={SelectChange}
      >
    
    <MenuItem value={"전체"}>전체</MenuItem>
    <MenuItem value={"영화"}>영화</MenuItem>
    <MenuItem value={"음식"}>음식</MenuItem>
    <MenuItem value={"여행"}>여행</MenuItem>
    <MenuItem value={"자동차"}>자동차</MenuItem>
    <MenuItem value={"IT"}>IT</MenuItem>
    <MenuItem value={"패션"}>패션</MenuItem>
    <MenuItem value={"취업"}>취업</MenuItem>
    <MenuItem value={"가상화폐"}>가상화폐</MenuItem>
    <MenuItem value={"홍보"}>홍보</MenuItem>
  </Select>
</FormControl>
         </div>

          <TextField 
          fullWidth 
          value={textfieldvalue}
          onChange={textChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="무슨 생각을 하고 있나요?" 
          variant="standard"
          />
      <div>
          <IoMdPhotos className={(imageContainer) ? "added_photo_icon": "not_added_photo_icon" } onClick={showImageContainer} size="48"></IoMdPhotos>
          { (selectedImages.length>=1) ?
      <label htmlFor="file">
          <AddPhotoAlternateIcon sx={{ fontSize: 55 }} className="add_photo_alternateIcon"></AddPhotoAlternateIcon>
      </label>
        : 
        null
        }
          
          { (selectedImages.length>=1) ?
          <div className='close_all_container'>
          <Button sx={{ backgroundColor:'#4D2BF4', color:'white', ":hover":{
            backgroundColor:'#6f53f5'
          },}} onClick={dontImageContainer} variant="outlined">전체지우기</Button>
          </div>
            : null
          }

      </div>
      
      { (imageContainer) ?
      <ImageList 
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
      sx={{ width: 535, height: 235, border:6, borderRadius:5, borderColor:(dragIn) ? '#826cf5' : '#808080', backgroundColor: (dragIn) ? '#E2E2E2' : null }} cols={ (selectedImages.length>=1) ? 3 : 1  } rowHeight={164}>
        { (selectedImages.length>=1) ?
     <>
     
          {
        selectedImages.map((item, index) => (
        <ImageListItem key={index}>
        <IoIosCloseCircle className='Close-icon' onClick={()=>{ deleteImage(index)}}></IoIosCloseCircle>
          { fileType[index].startsWith("image/") ? (<img src={item} alt={item} loading="lazy"/>) : (
          <video controls alt={item} src={item} className='video-size' loading="lazy"/>
        )}
        </ImageListItem>))
      }
      </>
         : 
      <label className="label" htmlFor="file">
        <IoIosCloseCircle onClick={dontImageContainer} size={37} className='close_all_photo'></IoIosCloseCircle>
      <div className="not_photo">
        <MdAddPhotoAlternate className="add_photo" size="52"></MdAddPhotoAlternate>
      <h3 className="add_photo_text">사진/동영상 추가</h3>
      <h3 className="add_photo_subtext">또는 끌어서 놓습니다</h3>
    </div>
      </label>
    }
    {/* 그리고 사진지울 때 자꾸 사진 드래그 되는 거 없애야 된다. */}
    </ImageList>
    
     : null}
    

    <form
  name="images"
  encType="multipart/form-data"
  onSubmit={toServer}
    >
    <input 
      type="file" 
      style={{ display:"none" }}
      multiple 
      accept="image/*, video/*"
      id="file" 
      name="images"
      onChange={imageHandleChange}/>
    <Button type="submit" sx={{ ":hover":{
            backgroundColor:'#6f53f0'
          }, backgroundColor:'#4D2BF4', }} variant="contained" className="submit_button">제출</Button>
        </form>
        </Box>
      </Modal>
    </div>
  );
}