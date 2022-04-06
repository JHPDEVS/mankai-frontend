import { Divider, Modal } from "@mui/material"
import { Box } from "@mui/system"
import axios from "axios"
import { useEffect, useReducer, useState } from "react"
import { useSelector } from "react-redux"
import SunEditor from "suneditor-react"
import GroupEditor from "../components/GroupEditor"

function GroupNotice(props){
    const user = useSelector(state => state.Reducers.user)
    const [open,setOpen] = useState(false)
    const [postTitle,setPostTitle] = useState("")
    const [content,setContent] = useState("")
    const [notice,setNotice] = useState([])
    const [detailOpen,setDetailOpen] = useState(false)
    const [selectedValue,setSelectedValue] = useState([])

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
        axios.post('api/post/groupnotice',{
            title:postTitle,
            content:data,
            group_id:props.group.id,
            category_id:props.category_id,
            user_id:user.id
        }).then(res=>{
            BoardUpdate()
            modalClose()
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
    const detailModalClose = () =>{
        setDetailOpen(false)
    }

    useEffect(()=>{
        BoardUpdate()
    },[props.category_id])

    const ClickBoard = (data) =>{
        setSelectedValue(data)
        setDetailOpen(true)    
    }
    return(
        <div className="p-4">
            <div className="flex relative mb-14">
                <button className="absolute right-0 top-0 bg-gray-200 p-2 rounded-xl" onClick={modalOpen}>글 작성하기</button>
            </div>
            <div>
                <div className="bg-gray-200 py-2 flex rounded-t-xl text-gray-600">
                    <div className="w-1/12 text-center">
                        ID
                    </div>
                    <div className="w-6/12">
                        제목
                    </div>
                    <div className="w-5/12 text-right pr-14">
                        작성일자
                    </div>
                </div>
            </div>
            {notice && notice.map((data) => {
                return(
                    <div>
                        <div onClick={()=>ClickBoard(data)} className="w-full py-3 flex hover:bg-gray-100" key={data.id}>
                            <div className="w-1/12 text-center">{data.id}</div>
                            <div className="w-6/12">{data.title}</div>
                            <div className="w-5/12 text-right pr-4">{data.updated_at}</div>    
                        </div>
                        <Divider light/>
                    </div>
                )
            })}

            {/* Show Modal */}
            <Modal 
                open={detailOpen}
                onClose={detailModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-5 relative">
                        <div className="">
                            <p className="px-2 text-xl font-bold mb-2">제목</p>
                            <p className="w-full bg-gray-200 rounded-2xl px-4 py-1 mb-2">{selectedValue.title}</p> 
                            <SunEditor 
                                readOnly
                                hideToolbar 
                                height="500" 
                                defaultValue={selectedValue.content}/>    
                       </div>
                 </Box>
            </Modal>


            {/* Write Modal */}
            <Modal 
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-3 relative">
                    <p className="ml-4">제목 </p>
                    <input type={"text"} className="bg-gray-200 w-full rounded-xl my-3 px-4 py-2" onChange={titleHandle}></input>
                    <GroupEditor content={content} getContent={getContent}></GroupEditor>
                 </Box>
            </Modal>
        </div>
    )
}export default GroupNotice