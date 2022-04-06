import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import React from 'react'
import Typography from '@mui/material/Typography';
import axios from 'axios'
import {Skeleton} from '@mui/material'
import MemoDetailImages from './MemoDetailImages'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { IoIosCloseCircle } from "react-icons/io";






export default function MemoDetail(props){

const [open,setOpen] = React.useState(false)
const [memoTitle,setMemoTitle] = React.useState("")
const [memoContentText,setMemoContentText] = React.useState("");
const [memoId, setMemoId] = React.useState(props.memoId);
const [selectedImage,setSelectedImage] = React.useState([])


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
        pb: 1,
        pt: 1,
      };

      const handleClose = () => {
        props.openDetailModal();
      }

      React.useEffect(()=>{
          setOpen(props.memoDetailOpen)
      },[props.memoDetailOpen])

      React.useEffect(()=>{
        setMemoTitle(props.memoTitle)
      },[props.memoTitle])

      React.useEffect(()=>{
        setMemoId(props.memo_id)
      },[props.memo_id])

      React.useEffect(()=>{
        setMemoContentText(props.memoContentText)
      },[props.memoContentText])

      
      React.useEffect(()=>{
        if(open === true){
        axios.get('/api/getmemoimages/'+memoId)
          .then((res)=>{
            if(res.data.length == 0)
               setSelectedImage("No Data")
              if(res.data.length >= 1 ){
              for(let i = 0 ; i < res.data.length ; i++){
                setSelectedImage(images => [...images, res.data[i].url]);
              }            
              }
              console.log(res.data)
          })
          .catch((err)=>{
              console.log(err)
          })
        } 
        else{
          setSelectedImage([])
        }
      },[open])

      const allClose = () => {
        handleClose();
      }

      const reEditModalOpen = () => {
        handleClose();
        props.openEditModal(true);
      }

      const memoDelete = () => {
        props.memoDelete(memoId);
        handleClose();
      }
   


    return(
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <div className = "grid justify-items-center">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {memoTitle}
          </Typography>
          </div>
          <IoIosCloseCircle onClick={allClose} size={37} className='close_memodetail'></IoIosCloseCircle>

          
          <hr style={{
             width:'100%',
             marginTop:6
         }}/>
         <Box sx={{ p:3 }}>
         <h2 className='font-bold'>{memoContentText}</h2>
         </Box>
  
                              {selectedImage == ''
                                ?<div className='flex justify-center'><Skeleton variant="rectangular" width={595} height={400} /></div>
                                :selectedImage != 'No Data'
                                    ?<div className='flex justify-center'><MemoDetailImages imageList={selectedImage}/></div>   
                                    :<div></div>
                            }
<div className='flex justify-center'>

      <div class="py-2">
        <button onClick={reEditModalOpen} type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md    focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                     <span class="pl-2 mx-1"><EditTwoToneIcon sx={{ mb:0.8, width:50  }}/>수정하기</span>
                  </button>
        </div>

   
      <div class="py-2">
        <button onClick={memoDelete} type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md  hover:bg-red-200 hover:fill-current hover:text-red-600  focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
                     <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px">
                        <path d="M0 0h24v24H0V0z" fill="none"></path>
                        <path d="M8 9h8v10H8z" opacity=".3"></path>
                        <path d="M15.5 4l-1-1h-5l-1 1H5v2h14V4zM6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9z"></path>
                     </svg>
                     <span class="pl-2 mx-1">삭제하기</span>
        </button>
        </div> 
      </div>
        </Box>
      </Modal>
    )
}