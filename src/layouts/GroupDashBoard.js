import { Button, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import Paper from '@mui/material/Paper';
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'


function GroupDashBoard(props){
    const [group_user,setGroup_user] = useState("");
    const [group_master,setGroup_master] = useState([]);
    const [group_data,setGroup_data] =useState([]);

    const DeleteGroupUser = (groupUserId) =>{
        axios.post('/api/delete/dashgroupuser/'+groupUserId)
        .then(res=>{
            setGroup_master(res.data.master)
            setGroup_user(res.data.user)
        })
    }
    
    const PositionSet = (data) =>{
            axios.post("/api/update/groupuser",{
                data:data.id
            }).then(res=>{
                setGroup_master(res.data.master)
                setGroup_user(res.data.user)
            })
    }
    // 최초 props 배치
    useEffect(()=>{
        let master =[]
        let user =[]
        if(props.group_id){
            axios.get('/api/show/groupuser/'+props.group_id)
            .then(res=>{
                res.data.forEach(data=>{
                if(data.position === "master")
                    master.push(data)
                else    
                    user.push(data)
            })
                setGroup_master(master)
                setGroup_user(user)     
            })
        }
    },[props.group_id])

    return(
        <div className="p-4">
            {/* 권한 Master */}
            <div className="mt-4 mb-4 text-center text-xl font-bold">
                <Divider>관리자</Divider>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID번호</TableCell>
                        <TableCell align="left">권한</TableCell>
                        <TableCell align="center">가입날짜</TableCell>
                        <TableCell align="center">기능</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {group_master.length 
                        ? group_master.map((group_user) => (
                        <TableRow
                            key={group_user.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {group_user.name}
                        </TableCell>
                        <TableCell align="left">  {group_user.user_id} </TableCell>
                        <TableCell align="left"> {group_user.position}   </TableCell>
                        <TableCell align="center">{group_user.created_at}</TableCell>
                        <TableCell align="right">
                            {group_master.length == 1 
                                ?<div>최소 1명의 관리자가 필요합니다</div>
                                :<div>
                                <button onClick={()=>PositionSet(group_user)}className="bg-green-500 p-1 font-bold text-white rounded-lg hover:bg-green-700 mr-2">유저로 강등</button>
                                 <button onClick={()=>DeleteGroupUser(group_user.id)} className="bg-red-500 p-1 font-bold text-white rounded-lg hover:bg-red-700">탈퇴</button>
                             </div> 
                            }
                        </TableCell>
                        </TableRow>
                    ))
                    :<div className="w-full">
                        <UseAnimations animation={loading} size={48}></UseAnimations>
                    </div>
                }
                    </TableBody>
                </Table>
            </TableContainer>
            <div className="mt-10 mb-4 text-center text-xl font-bold">
                <Divider>유저</Divider>
            </div>
            {/* 권한 user */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        <TableCell>이름</TableCell>
                        <TableCell align="left">ID번호</TableCell>
                        <TableCell align="left">권한</TableCell>
                        <TableCell align="center">가입날짜</TableCell>
                        <TableCell align="center">기능</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {group_user.length 
                        ?group_user.map((data) => (
                        <TableRow
                            key={data.user_id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell component="th" scope="row">
                            {data.name}
                        </TableCell>
                        <TableCell align="left">  {data.user_id} </TableCell>
                        <TableCell align="left"> {data.position}   </TableCell>
                        <TableCell align="center">{data.created_at}</TableCell>
                        <TableCell align="right">
                            <button onClick={()=>PositionSet(data)}className="bg-green-500 p-1 font-bold text-white rounded-lg hover:bg-green-700 mr-2">관리자 부여</button>
                            <button onClick={()=>DeleteGroupUser(data.id)} className="bg-red-500 p-1 font-bold text-white rounded-lg hover:bg-red-700">탈퇴</button>
                        </TableCell>
                        </TableRow>
                        ))     
                        :<div></div>
                    }
                    {group_master.length 
                        ?<div></div>
                        :<div className="w-full">
                            <UseAnimations animation={loading} size={48}></UseAnimations>
                         </div>
                    }
                    </TableBody>
                </Table>
            </TableContainer>

            
        </div>
    )
}export default GroupDashBoard