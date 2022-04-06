import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GroupUpdateModal from "./GroupUpdateModal";

function GroupIntro(props)
{   
    const user = useSelector(state=>state.Reducers.user);
    const [open,setOpen] = useState(false)
    const [isGroup,setIsGroup] = useState(false)
    const [isMaster,setIsMaster] = useState(false)
    const [group_data,setGroup_data] = useState("");
    const [post_data,setPost_data] = useState("");
    const [editorState,setEditorState] =useState("");

    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(props.isMaster){
            console.log("관리자임? ",props.isMaster)
            setIsMaster(props.isMaster)
        }
    },[props.isMaster])

    useEffect(()=>{
        setIsGroup(props.isGroup)
    },[props.isGroup])

    const onEditorStateChange = (e) =>{
        setEditorState(e)
    }

    const modalOpen = () =>{
        setOpen(true)
    }
    const modalClose = () =>{
        setOpen(false)
    }
    const GroupIn = () =>{
        setIsGroup(true)
        dispatch({type:"GROUP_IN"})
        axios.post('/api/post/groupuser/',{
            user_id:user.id,
            group_id:props.group.id
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    const GroupOut = () =>{
        dispatch({type:"GROUP_OUT"})
        setIsGroup(false)
        axios.post('/api/delete/groupuser/',{
            user_id:user.id,
            group_id:props.group.id
        })
        .then(res=>{
            console.log(res.data)
        })
    }
    const postIntro = () =>{
        axios.post('/api/post/intro',
        {
            text:post_data,
            group_id:props.group.id
        })
        .then(res=>{
            window.location.reload();
        })
    }
    return(
        <div>
            <div className="relative w-full">
                <img className="w-full h-96 brightness-50 rounded-t-xl" src={props.group.logoImage} alt="이미지 없음"/>
                <div className="absolute w-full bottom-48 right ">
                    <p className="text-6xl text-white text-center ">{props.group.name}</p>
                </div> 
                <div className="absolute bottom-4 left-6 text-white text-lg">
                    {isGroup
                        ?<div>
                            <button className="px-4 py-2 rounded-xl border-2 hover:bg-red-600" onClick={GroupOut}>가입 해지</button>
                        </div>
                        :<div>
                            <button className="px-4 py-2 rounded-xl border-2 hover:bg-green-600" onClick={GroupIn}>그룹 가입</button>
                        </div>
                    }
                </div>
                {isMaster
                    ?<div className="absolute top-3 right-3">
                        <GroupUpdateModal group={props.group} />
                    </div>
                    :<div></div>
                }
            </div>
            <div className="w-fit mx-auto text-gray-600 mt-2 bg-gray-200 border rounded-xl px-10">
                {props.group.password
                        ?<div>비밀번호를 알아야지 가입 가능합니다</div>
                        :<div>아무나 가입 가능합니다</div>
                }
            </div>
            <div className="mx-4 my-2 border py-2 px-4 rounded-xl">
                <div className="text-3xl font-bold">그룹 정보</div>
                <div className="text-xl">{props.group.name}</div>
                <div className="text-md">맴버수 : {props.group_user.length} / 관심사 : {props.group.category}</div>
                나중에 레이아웃 바꿀것

            </div>
            <div className="m-4 border py-2 px-4 rounded-xl">
                <div className="flex justify-between mb-5">
                    <p className="text-3xl font-bold">소개글</p>
                    {isMaster 
                        ?<Button onClick={modalOpen} className="text-blue-500 hover:text-blue-700">수정하기</Button>
                        :<div></div>
                    }
                </div>
                <p>
                    {props.group.intro == null 
                        ?<div>그룹 설명이 없습니다. 설정해 주세요</div>
                        :<div>{props.group.intro}</div>
                    }                
                </p>
            </div>


            <Modal 
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-5 relative">
                    소개글 작성 Editor 추가할것
                  
                    {/* <ReactQuill theme="snow" value={editorState} onChange={setEditorState}/> */}

                    {/* <textarea className="bg-gray-200 rounded-x w-full h-96 p-2" defaultValue={post_data}  onChange={EditorHandle}></textarea>
                    <Button onClick={postIntro}>보내기</Button> */}
            
                 </Box>
            </Modal>

       </div>
    )
}export default GroupIntro;