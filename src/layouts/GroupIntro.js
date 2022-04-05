import { Button, Modal, SvgIcon } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import GroupUpdateModal from "./GroupUpdateModal";
import GroupIcon from '@mui/icons-material/Group';
import SunEditor from 'suneditor-react';
import 'suneditor/dist/css/suneditor.min.css'; // Import Sun Editor's CSS File
import GroupEditor from "../components/GroupEditor";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'




function GroupIntro(props)
{
    
    const user = useSelector(state=>state.Reducers.user);
    const [open,setOpen] = useState(false)
    const [isGroup,setIsGroup] = useState(false)
    const [isMaster,setIsMaster] = useState(false)
    const [group_data,setGroup_data] = useState("");
    const [post_data,setPost_data] = useState("");
    const [editorState,setEditorState] =useState("");
    const [postPass,setPostPass] = useState("");
    const [content,setContent] = useState("");

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
    const getContent = (data) =>{
        axios.post('/api/post/intro',{
            group_id:props.group.id,
            text:data
        }).then(res=>{
            console.log(res.data)
        })
        
        // console.log("인트로",data)
        // setContent(data)
    }

    const modalOpen = () =>{
        setOpen(true)
    }
    const modalClose = () =>{
        setOpen(false)
    }
    const GroupIn = () =>{
        if(!props.group.password || props.group.password == postPass){  
            
            alert("가입 되었습니다")
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
        else{
            alert("비밀번호가 틀립니다")
        }
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
    const passHandle = (e) =>{
        setPostPass(e.target.value)
    }
    return(
        <div>
            <div className="relative w-full">
                {props.group.logoImage 
                    ?<img className="w-full h-96 brightness-50 rounded-t-xl" src={props.group.logoImage} alt="이미지 없음"/>
                
                    :<div className="w-full h-96  bg-gray-100 rounded-t-xl">
                        <div className="w-fit mx-auto pt-32">
                            <UseAnimations size={100} animation={loading}></UseAnimations>
                        </div>
                    </div>

                }
                <div className="absolute w-full bottom-48 right ">
                    <p className="text-6xl text-white text-center ">{props.group.name}</p>
                </div> 
                <div className="absolute bottom-4 left-6 text-white text-lg">
                    {isGroup
                        ?<div>
                            {isMaster
                            ? <div>관리자</div>
                            :<div>
                                <button className="px-4 py-2 rounded-xl border-2 hover:bg-red-600" onClick={GroupOut}>가입 해지</button>
                            </div>
                        }</div>
                        :<div>
                            {props.group.password 
                            ?<div>
                                <input type={"text"} onChange={passHandle} placeholder="비밀번호" className="bg-gray-100 text-black px-5 border text-sm border-gray-300 w-32 h-12 rounded-l-xl"/>
                                <button className="px-4 py-2 rounded-r-xl border-2 hover:bg-green-600" onClick={GroupIn}>그룹 가입</button>
                            </div> 
                        
                            :<div>
                                <button className="px-4 py-2 rounded-xl border-2 hover:bg-green-600" onClick={GroupIn}>그룹 가입</button>
                            </div>
                            }
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
                        ?<div>비공개 그룹</div>
                        :<div>공개 그룹</div>
                }
            </div>
            <div className="mx-4 my-2 border py-2 px-4 rounded-xl">
                <div className="text-3xl font-bold">그룹 정보</div>
                <div className="text-xl">{props.group.name}</div>
                <div className="text-md">
                    <SvgIcon><GroupIcon></GroupIcon></SvgIcon>{props.group_user.length} 
                     
                     - 관심사 : {props.group.category}
                </div>
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
                        :<div>
                            <SunEditor 
                                defaultValue={props.group.intro} 
                                readOnly
                                hideToolbar
                                height="100%"
                            ></SunEditor>
                        </div>
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
                    <GroupEditor content={content} group_intro={props.group.intro} getContent={getContent}></GroupEditor>
                 </Box>
            </Modal>

       </div>
    )
}export default GroupIntro;