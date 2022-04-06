import { AppBar, Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from "../admin/layout/Header";
import GroupBoard from '../layouts/GroupBoard';
import GroupDashBoard from '../layouts/GroupDashBoard';
import GroupIntro from '../layouts/GroupIntro';


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


    useEffect(()=>{
         
    },[])

    useEffect(()=>{
        setGroup_id(match.params.group_id)
         axios.get("/api/show/groupuser/"+match.params.group_id)
         .then(res=>{
             setGroupUsers(res.data)
             console.log("groupUser",res.data)
         })

         //console.log(groupUsers) == null
    },[isGroupChange])
    
    const isOpen = useSelector(state=>state.Reducers.isOpen)

    useEffect(()=>{
        if(group_id){
            axios.get("/api/show/detail_group/"+group_id)
            .then(res=>{
                setGroup_data(res.data)
            })
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

    const optionHandle = (e,newValue) =>{
        setOptionValue(newValue)
        dispatch({type:"SIDE_CLOSE"})
    }

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
                            {isGroup  
                                ?<Tab value={"2"} label="그룹 게시판"/>      
                                :<Tab disabled value={"2"} label="가입해야 볼수 있습니다"/>
                            }
                            {isGroup  
                                ?<Tab value={"3"} label="공지사항"/>
                                :<Tab disabled value={"3"} label="가입해야 볼수 있습니다"/>
                            }
                            {isGroup  
                                ?<Tab value={"4"} label="채팅"/>    
                                :<Tab disabled value={"4"} label="가입해야 볼수 있습니다"/>
                            }
                            {isMaster  
                                ?<Tab value={"5"} label="맴버 관리"/>    
                                :<div></div>
                            }

                        </Tabs>
                        </div>
            </AppBar>
            
            {/* 레이아웃 용 */}
            <div className='pt-32 bg-gray-200'/>
                    {/* side 그룹정보 */}

                <div>
                    {/* <div className='w-full sticky h-screen right-0 rounded-xl bg-white '>
                        <div className='relative'>
                            <img className="w-full w-48 h-32 brightness-50 rounded-t-xl" src={group_data.logoImage} alt="이미지 없음"/>
                            <div className="absolute w-full bottom-10 right ">
                                <p className="text-2xl text-white text-center ">{group_data.name}</p>
                            </div> 
                           
                        </div>
                        <div className='pl-2'>
                            맴버수 : 30
                        </div>
                    </div> */}
                    <div className={'max-w-3xl mx-auto min-h-screen  rounded-xl bg-white '+(isOpen ? "mr-240" : "")}>
                        {optionValue == "1" 
                            && <GroupIntro group={group_data} isMaster={isMaster} group_user={groupUsers} isGroup={isGroup}/>
                        }
                        {optionValue == "2" 
                            && <div className=''><GroupBoard group={group_data}/></div>
                        }    
                        {optionValue == "3" 
                            // && <GroupIntro/>
                        }    
                        {optionValue == "4" 
                            // && <GroupIntro/>
                        }       
                        {optionValue == "5"
                            &&<GroupDashBoard group_id={group_data.id}/>
                        }
                    </div>
                </div>
                    
            <div className='pt-10 bg-gray-200'/>
        
           
        </div>
    )
}export default GroupDetail