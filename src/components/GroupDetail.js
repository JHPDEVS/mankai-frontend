import { Tab, Tabs } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Header from "../admin/layout/Header";
import GroupBoard from '../layouts/GroupBoard';
import GroupIntro from '../layouts/GroupIntro';


function GroupDetail({match}) {
    const [group_id,setGroup_id] = useState("")
    const [group_data,setGroup_data] = useState([])
    const [optionValue,setOptionValue] = useState("1")
    useEffect(()=>{
         setGroup_id(match.params.group_id)
    },[])

    useEffect(()=>{
        if(group_id){
            axios.get("/api/show/detail_group/"+group_id)
            .then(res=>{
                setGroup_data(res.data)
            })
        }
    },[group_id])

    const optionHandle = (e,newValue) =>{
        setOptionValue(newValue)
    }

    return(
        <div className='bg-gray-200'>
            <Header/>
            <div className='fixed w-full justify-center bg-white z-10 flex'>
                <Tabs 
                    onChange={optionHandle} 
                    value={optionValue} 
                    aria-label="lab API tabs example"
                >
                    <Tab value={"1"} label="그룹 소개"/>
                    <Tab value={"2"} label="그룹 게시판"/>
                    <Tab value={"3"} label="공지사항"/>
                    <Tab value={"4"} label="채팅"/>
                </Tabs>
            </div>

            <div className='max-w-3xl min-h-screen mx-auto rounded-xl mt-16 bg-white'>
                {optionValue == "1" 
                    && <GroupIntro group={group_data}/>
                } 
                {optionValue == "2" 
                    && <GroupBoard group={group_data}/>
                }    
                {optionValue == "3" 
                    // && <GroupIntro/>
                }    
                {optionValue == "4" 
                    // && <GroupIntro/>
                }       
                <div className='max-h-3xl'></div>
            </div>
            
           
        </div>
    )
}export default GroupDetail