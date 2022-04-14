import React from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import SunEditor from 'suneditor-react'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone'
import BoardMemoEditor from './BoardMemoEditor'
import TextField from '@mui/material/TextField'

function BoardMemoEditModal(props){
   
    const [memoContentText,setMemoContentText] = React.useState("");
    const [memoId,setMemoId] = React.useState("");
    const [open,setOpen] = React.useState("")
    const [memoTitle,setMemoTitle] = React.useState("")

    React.useEffect(()=>{
        setOpen(props.boardMemoEditModalOpen)
    },[props.boardMemoEditModalOpen])

    React.useEffect(()=>{
        setMemoContentText(props.memoContentText)
    },[props.memoContentText])

    React.useEffect(()=>{
        setMemoTitle(props.memoTitle)
    },[props.memoTitle])

    React.useEffect(()=>{
        setMemoId(props.memo_id)
    },[props.memo_id])


    const modalClose = () => {
        props.exitBoardMemoEditModal();
    }

    const memoTitleChange = (e) => {
        setMemoTitle(e.target.value)
    }
    
    return(
        
        <Modal 
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-230 rounded-xl p-5 relative">
                <TextField 
          sx={{ mb:2 }}
          fullWidth 
          value={memoTitle}
          onChange={memoTitleChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="메모 제목을 적으세요"
          variant="standard"
          />
                    <BoardMemoEditor content={memoContentText} memoId={memoId} memoTitle={memoTitle} modalClose={modalClose}></BoardMemoEditor>
                    {/* getContent={getContent}일단 보류 */}
                 </Box>
            </Modal>
    )
}export default BoardMemoEditModal