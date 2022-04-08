import * as React from 'react'
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import TextField from '@mui/material/TextField'
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
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


export default function MyMemoEditModal(props) {
  const [textfieldvalue,setTextFieldValue] = useState("");
  const [selectedImages, setSelectedImage] = useState([])
  const [imageContainer, setImageContainer] = useState(false); 
  const [fileType, setFileType] = useState([]);
  const [imageToServer, setImageToServer] = useState([]);
  const [dragIn, setDragIn] = useState(false);
  const user = useSelector(state=> state.Reducers.user);
  const [modalOpen,setModalOpen] = useState(props.editModalOpen);
  const [memoId,setMemoId] = useState(props.memo_id)
  // 이 값에 따라서 1차 modal이 올라오거나 내려오거나

  // 그리고 reducers.js에서 함수 2개 지우고 isModalOpen이라는 변수도 지우기
  const dispatch = useDispatch()


  useEffect(()=>{
    setTextFieldValue(props.memoContentText);
  },[props.memoContentText])

  useEffect(()=>{
    if(modalOpen === false){
        setSelectedImage([])
        setImageToServer([])
      }
      if(modalOpen === true){
        axios.get('/api/getpostimages/'+props.postId)
          .then((res)=>{
              if(res.data.length >= 1 ){
              showImageContainer()
              for(let i = 0 ; i < res.data.length ; i++){
                if(res.data[i].url.includes('.jpg')){
                  setFileType(file => [...file,'image/jpeg'])
                }
                setSelectedImage(images => [...images, res.data[i].url]);
                setImageToServer(images => [...images, res.data[i].url])
              }            
              }
              console.log(res.data)
          })
          .catch((err)=>{
              console.log(err)
          })
        }
  },[modalOpen])

  useEffect(()=>{
    console.log("fileType:",fileType)
  },[fileType])


  
  
 

  useEffect(()=>{
    setModalOpen(props.editModalOpen);
    // 부모의 editModalOpen이 바뀜에 따라 창이 열리고 닫힌다.
  },[props.editModalOpen])


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

  useEffect(()=>{
    console.log("imageToServer:",imageToServer);
  },[imageToServer])
  


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

    // 아무것도 안보내면 ""인 요소를 갖고 있는 애 하나를 보낸다.
    var url_images = []
    var i  = 0;
    while(typeof imageToServer[i] == "string"){
      url_images.push(imageToServer[i])
      i++;
    }
    formData.append("url_images", url_images);
    // 이건 기존의 사진들을 저장하기 위함

    var z = i;
    var j = 0;
    while(j < imageToServer.length-i){
      formData.append(`file_images${j}`, imageToServer[z])
      z++;
      j++;
    // 이건 새로운 사진들을 저장하기 위함
  }

    formData.append('content_text',textfieldvalue);
    formData.append('user_id',user.id)
    formData.append('post_id',props.postId)

    if((textfieldvalue != null) || (imageToServer != null)){
      axios.post('/api/updatepost',formData)      
      .then((res)=>{
        console.log("update한 memo:",res.data);
        props.openEditModal(false);
        props.showBoardByEdit();
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
    
  }

  // memo_title입력을 위한 모달을 끔.



  const handleSubmit = (event) => {
    event.preventDefault();
  }

  // content_text와 images를 입력하기 위한 모달을 띄움

  const handleClose = () => {
    setModalOpen(false);
    props.openEditModal(false);
    setSelectedImage([])
    setFileType([])
    setImageToServer([])
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


          <TextField 
          fullWidth 
          value={textfieldvalue}
          onChange={textChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="글 수정"
          variant="standard"
          />
      <div>
          <IoMdPhotos  onClick={showImageContainer} className={(imageContainer) ? "added_photo_icon": "not_added_photo_icon" } size="48"></IoMdPhotos>
          { (selectedImages.length>=1 && imageContainer) ?
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
        { ((selectedImages.length>=1) && (fileType.length >=1)) ?
     <>
          {
              
        selectedImages.map((item, index) => (
        <ImageListItem key={index}>
        <IoIosCloseCircle className='Close-icon' onClick={()=>{ deleteImage(index)}}></IoIosCloseCircle>
          { fileType[0].startsWith("image/") ? (<img src={item} alt={item} loading="lazy"/>) : (
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
          }, backgroundColor:'#4D2BF4', }} onClick = {toServer} variant="contained" className="submit_button">글 수정</Button>
        </form>
        </Box>
      </Modal>
      {/* 만약에 https로 시작하는 파일이 있다면 기존에 있었던것. 아니라면 blob로 시작하는 건데 */}
      {/* 기존것을 삭제하고 추가하는 방향으로 한다. 그러면 memo_id를 이용해서 memo_image들을 삭제하고 반복문을 돌렸을 때 https로 시작하면 */}
      {/* 그냥 그대로 저장, 그리고 blob로시작하면 s3에 저장후에 DB에 저장 */}
    </div>
   
  )}

  