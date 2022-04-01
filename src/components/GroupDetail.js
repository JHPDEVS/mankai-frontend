import { AppBar, Modal, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../admin/layout/Header";
import GroupBoard from '../layouts/GroupBoard';
import GroupDashBoard from '../layouts/GroupDashBoard';
import GroupIntro from '../layouts/GroupIntro';
import GroupNotice from '../layouts/GroupNotice';
import BoardImage from '../images/BOARD.png';
import SNSImage from '../images/SNS.png';



function GroupDetail({match}) {
    
    const user = useSelector(state=>state.Reducers.user)
    const isGroupChange = useSelector(state=>state.Reducers.isGroupChange)
    const dispatch = useDispatch();
    const [group_id,setGroup_id] = useState("")
    const [group_data,setGroup_data] = useState([])
    const [optionValue,setOptionValue] = useState("1")
    const [groupUsers,setGroupUsers]= useState([])
    const [isGroup,setIsGroup] = useState(false)
    const [isMaster,setIsMaster] = useState(false)
    const [groupCategory,setGroupCategory] = useState([])
    const [open,setOpen] = useState(false)
    const [postType,setPostType] = useState("SNS")
    const [postTitle,setPostTitle] = useState("")
    const [selectedValue,setSelectedValue] = useState("")

    const modalClose = () =>{
        setOpen(false)
    }

    const modalOpen = () =>{
        setOpen(true)
    }
     
    const postCategory = () => {
        axios.post('api/post/category',{
            group_id:group_id,
            title:postTitle,
            type:postType
        }).then(res=>{
            console.log(res.data)
        
        })
    }

    useEffect(()=>{
        setGroup_id(match.params.group_id)
         axios.get("/api/show/groupuser/"+match.params.group_id)
         .then(res=>{
             setGroupUsers(res.data)
             console.log("groupUser",res.data)
         })
    },[isGroupChange])
    
    const isOpen = useSelector(state=>state.Reducers.isOpen)

    useEffect(()=>{
        if(group_id){
            axios.get("/api/show/detail_group/"+group_id)
            .then(res=>{
                console.log(res.data)
                setGroup_data(res.data.group)
                setGroupCategory(res.data.category)
            })
            console.log(groupCategory)
        }
    },[group_id])

    useEffect(()=>{
        if(groupUsers){
            console.log("여부 체크")
            setIsGroup(false)
            groupUsers.forEach(groupUser=>{
                if(groupUser.user_id ==  user.id)
                    setIsGroup(true)

                if(groupUser.position == "master" && groupUser.user_id == user.id)    {
                        setIsMaster(true)
                    console.log("관리자임")
                }
            })
        }
    },[groupUsers])
    const typeHandle = (data) =>{
        console.log(data)
        setPostType(data)
    }

    const optionHandle = (e,newValue) =>{
        setOptionValue(newValue)

        if(newValue != "1")
            setSelectedValue(groupCategory[newValue-2])
        else
            setSelectedValue("")

        dispatch({type:"SIDE_CLOSE"})
    }
    const titleHandle = (e) =>{
        setPostTitle(e.target.value)
    } 

    const array = ["SNS","BOARD"]

    return(
        <div className='bg-gray-200'>
            <AppBar color="transparent" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , boxShadow : 0 }}>
                <Header/>
                    <div className={'fixed mt-16 w-full shadow justify-center bg-white z-10 flex '}> 
                        <div className=" font-bold h-fit my-auto px-2 py-1 mr-10 bg-gray-200 rounded-xl">{group_data.name}</div>
                        <Tabs
                            onChange={optionHandle} 
                            value={optionValue} 
                            aria-label="lab API tabs example"        
                        >
                            <Tab value={"1"} label="그룹 소개"/>
                            {groupCategory.length >0 && groupCategory.map((category,idx)=>{
                                return(
                                        <Tab value={(idx+2).toString()} label={category.title}></Tab>
                                )
                            })}
                        </Tabs>
                        {isMaster &&
                            <button onClick={modalOpen} className='text-blue-500 ml-4 rounded-2xl px-2 h-8 my-auto bg-gray-200 hover:bg-gray-300 hover:text-blue-700'>그룹추가</button>
                        }
                    </div>
            </AppBar>
            
            {/* 레이아웃 용 */}
            <div className='pt-32 bg-gray-200'/>
                    {/* side 그룹정보 */}
                <div className={'w-full  '+(isOpen ?"pr-192" : " ")}>
                    <div className={'max-w-3xl mx-auto min-h-screen rounded-xl bg-white'}>
                        {selectedValue === ""
                            && <GroupIntro  group={group_data} isMaster={isMaster} group_user={groupUsers} isGroup={isGroup}/>
                        }
                        {selectedValue.type === "SNS" 
                            && <GroupBoard category_id={selectedValue.id} group={group_data}/>
                        }
                        {selectedValue.type === "BOARD"
                            &&<GroupNotice  category_id={selectedValue.id} group={group_data}/>
                        }
                        {optionValue === "맴버관리"
                            &&<GroupDashBoard group_id={group_data.id}/>
                        }
                    </div>
                </div>    
            {/*레이아웃*/}
            <div className='pt-10 bg-gray-200'/>

            {/* 카테고리 추가 레이아웃 */}
            <Modal 
                open={open}
                onClose={modalClose}    
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-5 relative">
                        <div className='text-2xl font-bold text-center mt-5 mb-5'>카테고리 제목</div>
                        <input type={"text"} onChange={titleHandle} className='bg-gray-300 w-full p-2 rounded-2xl'></input>
                        <div className='text-center text-xl font-bold mt-10 mb-10'>어떤 형식의 게시판을 만들것인가요?</div>
                        <div className='flex w-full'>                        
                        {array.map((data)=>{
                            return(
                                <div className='w-full' onClick={()=>typeHandle(data)}>
                                    <div className='text-center text-xl font-bold '>{data}타입</div>
                                    <div className={'pt-4 '+(data == postType ? "brightness-75" : " hover:brightness-75")}>
                                        {data == "SNS"
                                            ?<div>
                                                <img  className='w-full border-2 border-black rounded-2xl' src={SNSImage}  alt="이미지없음"></img>
                                            </div>
                                            :<div className='px-5'>
                                                <img className='w-full border-2 border-black rounded-2xl' src={BoardImage} alt="이미지없음"></img>
                                            </div>
                                        
                                        }
                                    </div>
                                </div>
                            )
                        })}
                        </div>
                        <button className='absolute bottom-5 left-5 bg-green-400 p-4 rounded-xl text-white font-bold text-xl' onClick={postCategory}>만들기</button>
                </Box>
            </Modal>
        </div>
    )
}export default GroupDetail