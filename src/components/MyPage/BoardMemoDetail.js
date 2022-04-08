import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SunEditor from 'suneditor-react'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'

function BoardMemoDetail(props){
   
    const [memoContentText,setMemoContentText] = React.useState("")
    const [memoTitle, setMemoTitle] = React.useState("")
    const [detailOpen,setDetailOpen] = React.useState(false);

    React.useEffect(()=>{
        setMemoContentText(props.memoContentText)
    },[props.memoContentText])

    React.useEffect(()=>{
        setMemoTitle(props.memoTitle)
    },[props.memoTitle])

    React.useEffect(()=>{
        setDetailOpen(props.boardMemoDetailOpen)
    },[props.boardMemoDetailOpen])

    const detailModalClose = () => {
        props.openBoardMemoModal();
    }

    const memoDelete = () => {
        props.memoDelete(props.memo_id);
        detailModalClose();
      }

    const boardMemoEditModalOpen = () => {
        props.openBoardMemoEditModal()
    }

    return(
        <Modal 
                open={detailOpen}
                onClose={detailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-230 rounded-xl p-5 relative">
                        <div className="">
                            <p className="px-2 text-xl font-bold mb-2">메모제목</p>
                            <p className="w-full bg-gray-200 rounded-2xl px-4 py-1 mb-2">{memoTitle}</p>
                            <SunEditor 
                                readOnly
                                hideToolbar 
                                height="500" 
                                defaultValue={memoContentText}/>    
                       </div>

                       <div className='flex justify-center'>

<div class="py-2">
  <button onClick={boardMemoEditModalOpen} type="button" class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize rounded-md    focus:outline-none  transition duration-300 transform active:scale-95 ease-in-out">
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
            // ?! 모달이 정가운데 띄워지게 해보자.
    )
}export default BoardMemoDetail