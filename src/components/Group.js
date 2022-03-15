import { Modal, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Header from "../admin/layout/Header";
import imgA from '../images/sky.jpg';
import GroupCreateModal from "../layouts/GroupCreateModal";


function Group(props) {

    const [groups,setGroups] = useState([]); 
    const groupChange = useSelector(state=>state.Reducers.groupChange);

    useEffect(()=>{
        axios.get('/api/show/group')
        .then(res=>{
            setGroups(res.data)
        })
    },[groupChange])
    
    const listClick=(id)=>{
        window.location.href = 'group/'+id
    }
    const user = useSelector(state=>state.Reducers.user)
    
    return(
        <div>
          
            <Header/>  

            <GroupCreateModal></GroupCreateModal>

            <div className="w-full text-center">
                <p className="text-5xl mb-5">
                   그룹 검색하기
                </p>
                <div className=" mb-10">
                    <input type={"text"} placeholder="어떤 그룹을 찾으시나요?" className="bg-gray-200 px-5 border border-gray-300 w-192 h-14 rounded-xl"></input>
                </div>
            </div>        
            
            <div className="w-full flex flex-wrap">

            {groups.map((group)=>{
                return(
                    <div className="w-96 shadow mx-5 mt-5 rounded-xl border hover:brightness-50" onClick={()=>listClick(group.id)} key={group.id}>
                        <img className="h-60 rounded-t-xl w-full" src={group.logoImage} alt='null' />
                        <div className="flex py-4  px-4 text-lg font-bold text-black">
                            {group.name}
                            <div className="">
                                {group.category}
                            </div>
                        </div>
                    </div> 
            )})}
            </div>
            
        </div>
    )


}export default Group
    
