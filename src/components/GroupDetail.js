import { AppBar, Divider, Modal, Tab, Tabs } from '@mui/material';
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
import createTypography from '@mui/material/styles/createTypography';

// 그룹의 TAP 관리

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
    const [settingOption,setSettingOption] = useState("2")
    const [selectedUpdate,setSelectedUpdate] =useState("")
    const [updateText,setUpdateText] = useState({})

    const modalClose = () =>{
        setOpen(false)
    }
    const CategoryHandle = (e) =>{
        console.log(updateText)
        setUpdateText(e.target.value)
    }
    const modalOpen = () =>{
        setOpen(true)
    }

    // 수정버튼 누를시
    const UpdateCategory =(data) =>{
        setSelectedUpdate(data)
        setUpdateText(data.title)
        console.log(data)
    }
    const DeleteCategory = (category_id) =>{
        axios.post('api/delete/groupcategory',{
            category_id:category_id
        }).then(res=>{
            showGroupDetail()
            console.log(res.data)
        })
    }
    const SaveCategory =() =>{
        axios.post('api/update/category',{
            category_id : selectedUpdate.id,
            category_title : updateText
        }).then(res=>{
            setSelectedUpdate("")
            setUpdateText("")
            showGroupDetail()
            alert("수정완료")
        })
    }
    const postCategory = () => {
        axios.post('api/post/category',{
            group_id:group_id,
            title:postTitle,
            type:postType
        }).then(res=>{
            alert("생성 완료")
            showGroupDetail()
            modalClose()
        })
    }
    const settingClick = (num) =>{
        setSettingOption(num)
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
    const showGroupDetail = () =>{
        axios.get("/api/show/detail_group/"+group_id)
        .then(res=>{
            console.log(res.data)
            setGroup_data(res.data.group)
            setGroupCategory(res.data.category)
        })
        console.log(groupCategory)
    }

    useEffect(()=>{
        if(group_id){
            showGroupDetail()
        }
    },[group_id])

    useEffect(()=>{
        if(groupUsers){
            // 그룹 가입여부 체크
            setIsGroup(false)
            console.log("유저체크")
            groupUsers.forEach(groupUser=>{
                if(groupUser.user_id ==  user.id)
                    setIsGroup(true)

                // 관리자인지 체크
                if(groupUser.position == "master" && groupUser.user_id == user.id)    {
                        setIsMaster(true)
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
        if(newValue != "1"){
            setSelectedValue(groupCategory[newValue-2])
            console.log("기본값아님")
        }
        else   
            setSelectedValue("")

        if(newValue =="10")
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
                        {isGroup ?
                            <div className='overflow-hidden'>
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
                                        
                                        {isMaster &&
                                            <Tab value={"10"} label="맴버 관리"></Tab>
                                        }
                                </Tabs>
                            </div>
                            :<div className='pt-2 pb-2'>가입시 볼 수 있습니다.</div>
                        }
                        {isMaster &&
                            <button onClick={modalOpen} className='text-blue-500 w-16 ml-4 rounded-2xl px-2 h-8 my-auto bg-gray-200 hover:bg-gray-300 hover:text-blue-700'>관리</button>
                        }
                    </div>
            </AppBar>
            
            {/* 레이아웃 용 */}
            <div className='pt-32 bg-gray-200'/>
                    {/* side 그룹정보 */}
                <div className={'w-full  '+(isOpen ?"pr-192" : " ")}>
                    <div className={'max-w-3xl mx-auto min-h-screen rounded-xl bg-white'}>
                        {optionValue === "1"
                            && <GroupIntro  group={group_data} isMaster={isMaster} group_user={groupUsers} isGroup={isGroup}/>
                        }
                        {selectedValue.type === "SNS" 
                            && <GroupBoard category_id={selectedValue.id} group={group_data}/>
                        }
                        {selectedValue.type === "BOARD"
                            &&<GroupNotice  category_id={selectedValue.id} group={group_data}/>
                        }
                        {optionValue === "10" 
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
                    <div>
                            <button onClick={()=>settingClick(2)} className={'w-80 py-2 my-5 border-b-4 border-indigo-300 hover:border-indigo-600' +(settingOption == "2" ? 'border-b-4 border-indigo-600' : "")}>카테고리 관리</button>
                            <button onClick={()=>settingClick(1)} className={'w-80 py-2 my-5 ml-6 border-b-4 border-indigo-300 hover:border-indigo-600' +(settingOption == "1" ? 'border-b-4 border-indigo-600' : "")}>카테고리 생성</button>
                        {settingOption == 1 ?
                            <div>
                                <div className='text-2xl font-bold text-center mt-5 mb-5'>카테고리 제목</div>
                                    <input type={"text"} onChange={titleHandle} className='bg-gray-200 w-full border-2 border-sky-300 p-2 rounded-2xl'></input>
                                    <div className='text-center text-xl font-bold mt-10 mb-10'>어떤 형식의 게시판을 만들것인가요?</div>
                                    <div className='flex w-full'>                        
                                    {array.map((data)=>{
                                        return(
                                            <div className='w-full' onClick={()=>typeHandle(data)}>
                                                <div className='text-center text-xl font-bold '>{data}타입</div>
                                                <div className={'pt-4 '+(data == postType ? "brightness-75" : " hover:brightness-75")}>
                                                    {data == "SNS"
                                                        ?<div>
                                                            <img className='w-full border-2 border-black rounded-2xl' src={SNSImage}  alt="이미지없음"></img>
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
                                <button className='absolute bottom-5 left-8 bg-green-400 p-2 rounded-xl text-white font-bold w-180 hover:bg-green-500' onClick={postCategory}>만들기</button>
                            </div>
                            :<div className=''>
                                {groupCategory.map((category)=>{
                                    return(
                                        <div>
                                            <div className='flex my-2'>
                                                {/* 타입 */}
                                                <div className='w-1/12 pt-1 text-right'>{category.type}</div>  
                                                {/* 타이틀 */}
                                                <div className='w-5/12 ml-20'>
                                                    {selectedUpdate.id == category.id
                                                    ?   <div className=''>
                                                            <input onChange={CategoryHandle} defaultValue={updateText} className="bg-gray-200 py-1 px-2 rounded-lg"></input>
                                                        </div>
                                                        :<div className=''>{category.title}</div> 
                                                    }
                                                </div>
                                                {/* 버튼 */}
                                                <div className='w-6/12 text-right'>
                                                    {selectedUpdate.id == category.id
                                                        ?<button onClick={()=>SaveCategory(category)} className='bg-blue-500 text-white font-bold py-1 px-2 mr-1 rounded-xl hover:bg-blue-700'>확인</button>
                                                        :<button onClick={()=>UpdateCategory(category)} className='bg-green-500 text-white font-bold py-1 px-2 mr-1 rounded-xl hover:bg-green-700'>제목수정</button>
                                                    
                                                    }
                                                    <button onClick={()=>DeleteCategory(category.id)} className='bg-red-500 text-white font-bold py-1 px-2 rounded-xl hover:bg-red-700'>삭제</button>
                                                </div>
                                            </div>
                                            <Divider light/>
                                        </div>
                                )})}
                            </div>
                        }
                    </div>
                </Box>
            </Modal>
        </div>
    )
}export default GroupDetail