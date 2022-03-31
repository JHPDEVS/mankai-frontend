import { Modal } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import GroupEditor from "../components/GroupEditor"

function GroupNotice(props){
    const user = useSelector(state => state.Reducers.user)
    const [open,setOpen] = useState(false)
    const [postTitle,setPostTitle] = useState("")
    const [content,setContent] = useState("")

    const modalClose = () => {
        setOpen(false)
    }
    const modalOpen = () =>{
        setOpen(true)
    }
    const titleHandle = (e) =>{
        setPostTitle(e.target.value)
    }
    const getContent = (data)=>{
        console.log(postTitle)
        console.log(data)

        axios.post('api/post/groupnotice',{
            title:postTitle,
            content:data,
            group_id:props.group.id,
            category_id:props.category_id,
            user_id:user.id
        }).then(res=>{
            console.log(res)
        })
    }
    const BoardUpdate = () => {
        // axios.get('api/show/groupnotice',{

        // })   
    }

    useEffect(()=>{

    },[props.category_id])

    return(
        <div className="p-4">
            <div className="flex relative">
                <p className="w-fit mx-auto">공지사항</p>
                <button className="absolute right-0 top-0 bg-gray-200 p-2" onClick={modalOpen}>글 작성하기</button>
            </div>
            {props.category_id}

            <Modal 
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-5 relative">
                    <p className="mx-10"> 게시글 제목 </p>
                    <input type={"text"} className="bg-gray-200 w-full rounded-xl my-3" onChange={titleHandle}></input>
                    <GroupEditor content={content} getContent={getContent}></GroupEditor>
                 </Box>
            </Modal>
        </div>
    )
}export default GroupNotice