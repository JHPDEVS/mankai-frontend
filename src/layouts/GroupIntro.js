import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import {Editor, EditorState} from 'draft-js';
import MyEditor from "./PageContainer";
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
            
            <div className="m-4 border py-2 px-4 rounded-xl">
                <div className="flex justify-between mb-5">
                    <p className="text-3xl">소개글</p>
                    {isMaster 
                        ?<Button onClick={modalOpen} className="text-blue-500 hover:text-blue-700">수정하기</Button>
                        :<div></div>
                    }
                </div>
                인원수 : {props.group_user.length}
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
                <Box className="bg-white w-192 mx-auto mt-10  h-240 rounded-xl p-5 relative">
                    소개글 작성
                  
                </Box> 
            </Modal>

       </div>
    )
}export default GroupIntro;