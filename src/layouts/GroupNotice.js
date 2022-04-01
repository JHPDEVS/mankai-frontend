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
    const [notice,setNotice] = useState([])

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
            console.log(res.data)
        })
    }
    const BoardUpdate = () => {
        axios.post('api/show/groupnotice',{
            category_id:props.category_id,
            group_id:props.group.id
        }).then(res=>{
            setNotice(res.data)
        })
    }

    useEffect(()=>{
        BoardUpdate()

    },[props.category_id])

    const ClickBoard = () =>{

    }
    return(
        <div className="p-4">
            <div className="flex relative mb-10">
                <p className="w-fit mx-auto">공지사항</p>
                <button className="absolute right-0 top-0 bg-gray-200 p-2 rounded-xl" onClick={modalOpen}>글 작성하기</button>
            </div>
            {notice && notice.map((data) => {
                return(
                    <div onClick={ClickBoard} className="w-full border-2 bg-gray-100 rounded-xl justify-between p-4 mt-2 flex hover:bg-gray-200" key={data.id}>
                        <div className="font-bold ml-4">{data.title}</div>
                        <div>{data.updated_at}</div>
                    </div>
                )
            })}

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