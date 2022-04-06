import * as React from 'react'
import {useState, useEffect, forwardRef, useImperativeHandle} from 'react'
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
import { useSelector, useDispatch } from 'react-redux';
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


export default function MyMemoWriteModal(props) {
  const [textfieldvalue,setTextFieldValue] = useState("");
  const [selectedImages, setSelectedImage] = useState([])
  const [imageContainer, setImageContainer] = useState(false); 
  const [fileType, setFileType] = useState([]);
  const [imageToServer, setImageToServer] = useState([]);
  const [dragIn, setDragIn] = useState(false);
  const [openMemoTitle, setOpenMemoTitle] = useState(false);
  // 이 값에 따라서 메모제목을 정하는 창이 올라오거나 내려오거나
  const [memoTitleValue, setMemoTitleValue] = useState("");
  const user = useSelector(state=> state.Reducers.user);
  const [modalOpen,setModalOpen] = useState(false);
  // 이 값에 따라서 1차 modal이 올라오거나 내려오거나

  // 그리고 reducers.js에서 함수 2개 지우고 isModalOpen이라는 변수도 지우기
  const dispatch = useDispatch()

  const imageHandleChange = (e) => {
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


  

  const isOpen = useSelector((state=>state.Reducers.isOpen))
  // BoardSide가 열렸을 경우를 생각해서 있는 건가?

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

  const data = {
    textfieldvalue : textfieldvalue,
    selectedImages : selectedImages,
    user : user,
    
  }
  

  const toServer = (e) => {
    const formData = new FormData();
    for(let i = 0 ; i < imageToServer.length ; i++){
      formData.append(`images${i}`, imageToServer[i])
    }
    formData.append('user_id',user.id);
    formData.append('content_text',textfieldvalue);
    formData.append('memo_title',memoTitleValue);
    formData.append('memo_type','SNS');
      axios.post('/api/storememo',formData)      
      .then((res)=>{
        dispatch({
          type: 'ADD_MEMO',
          payload: { memo: res.data },
        })
        handleClose2();
        setTextFieldValue("");
        setMemoTitleValue("");
        setSelectedImage([]);
        setImageToServer([]);
      })
      .catch((err)=>{
        console.log(err);
      })
    // 제목은 필수, 사진/글 둘중에 하나는 필수로 조건을 정해야 한다. 그리고 조건 위배시 else로 alert띄우게
    
  }

  const setMemoTitleOpen = () => {
    console.log("제목을 띄우는 모달을 띄우기")
    setOpenMemoTitle(true)
  }
  // memo_title을 입력하기 위한 모달을 띄움

  const handleClose2 = () => {
    setOpenMemoTitle(false);
    setModalOpen(false);
  }
  // memo_title입력을 위한 모달을 끔.

  const memoTitleChange = (e) => {
    setMemoTitleValue(e.target.value);
  };
  // memo_title입력할 때 바인딩하기 위한 함수

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  const modalOpenFunc = () => {
    setModalOpen(true);
  }
  // content_text와 images를 입력하기 위한 모달을 띄움

  const handleClose = () => {
    setModalOpen(false);
  };
  // content_text와 images를 입력하기 위한 모달을 닫음


  return (
    <div>

<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>




      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
        <div className="flex justify-start pb-3">
        <TextField 
          fullWidth 
          value={memoTitleValue}
          onChange={memoTitleChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="메모제목을 적어주세요" 
          variant="standard"
          />
            <div className="ml-4 mt-2">
                <div className="flex items-center">
                </div>

                <ul className="flex justify-content-around items-center">
                </ul>
                <br/>
            </div>
            
         </div>

          <TextField 
          fullWidth 
          value={textfieldvalue}
          onChange={textChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="메모를 적으세요"
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
  onSubmit={handleSubmit}
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
          }, backgroundColor:'#4D2BF4', }} onClick = {toServer} variant="contained" className="submit_button">메모저장</Button>
        </form>
        </Box>
      </Modal>
       <Fab color="primary" > <AddIcon onClick={modalOpenFunc}/></Fab>
    </div>
   
  )}

  