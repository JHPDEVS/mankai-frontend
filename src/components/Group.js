import { Modal, SvgIcon, TextField, Typography } from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import Header from "../admin/layout/Header";
import GroupCreateModal from "../layouts/GroupCreateModal";
import GroupIcon from '@mui/icons-material/Group';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'


function Group(props) {

    const [groups,setGroups] = useState([]);
    const [search,setSearch] = useState("");
    const [textHandle,setTextHandle] = useState(true)
    const groupChange = useSelector(state=>state.Reducers.groupChange);
    const user = useSelector(state=>state.Reducers.user)

    const showGroup = (data) =>{
        setGroups([])
        axios.get('/api/show/group/'+data)
        .then(res=>{
            if(res.data.length<1)
                setGroups("NoData")
            else    
                setGroups(res.data)
        })
    }
    const searchBtn=()=>{
        if(search == "")
            showGroup("NULLDATA")
        else
            showGroup(search)
    }
    const onKeyPress=(e)=>{
        if(e.key=="Enter")
            if(search == "")
                showGroup("NULLDATA")
            else
                showGroup(search)
            
    }
    useEffect(()=>{
        showGroup("NULLDATA")
    },[groupChange])

    const searchHandle=(e)=>{
        setSearch(e.target.value)
    }
    const listClick=(id)=>{
        window.location.href = "group/"+id
    }
    
    return(
        <div>
            <Header/>  
            <GroupCreateModal></GroupCreateModal>
            <div className="w-full text-center">
                <p className="text-5xl mb-5 mt-5">
                   그룹 검색하기
                </p>
                <div className="mb-10 my-auto">
                    <input type={"text"} onKeyPress={onKeyPress} onChange={searchHandle} placeholder="어떤 그룹을 찾으시나요?" className="bg-gray-200 px-5 border border-gray-300 w-192 h-14 rounded-l-xl"/>
                    <button onClick={searchBtn} className="h-14 px-3 border rounded-r-xl">검색하기</button>
                </div>
            </div>        
            <div className="w-full">
            {groups.length == []  &&
                <div className="w-fit mx-auto mt-48">
                    <UseAnimations size={128} animation={loading}></UseAnimations>
                </div>
            }  
            {groups == "NoData" 
                ?<div className="w-full font-bold text-3xl mt-24 text-center mx-auto">검색결과가 없습니다</div>
                :<div className="w-full flex flex-wrap">
                    {groups.map((group)=>{
                    return(
                        <div className="w-80 shadow-lg mx-5 mt-8 rounded-xl border hover:brightness-50" onClick={()=>listClick(group.id)} key={group.id}>
                            <img className="h-60 rounded-t-xl w-full" src={group.logoImage} alt='null' />
                            <div className=" pt-6 w-fit mx-auto px-4 text-lg font-bold text-black">
                                {group.name}
                            </div>
                            <div className="w-fit mx-auto pb-4">
                                <p className="text-sm text-gray-400">
                                    {group.category} / <SvgIcon><GroupIcon></GroupIcon></SvgIcon>{group.length}
                                </p>
                            </div>
                        </div> 
                    )})}
                </div>
            }
            </div>
        </div>
    )


}export default Group
    
