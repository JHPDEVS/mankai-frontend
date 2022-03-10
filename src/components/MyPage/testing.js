import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import { Delete } from "@mui/icons-material";
import axios from "axios";
import { Link } from 'react-router-dom'
import { Box, Button, Modal, Typography, Stack } from '@mui/material';

export default function MyPage(){
    const ChattingMemo = () => (
        window.open("/chatting_memo", "", "width=500,height=600"))
    const PostMemo = () => (
       window.open("/post_memo", "", "width=500,height=600"))
    const MyMemo = () => (
       window.open("/my_new_memo", "", "width=500,height=600"))



        const[mymemoData,setMymemoData] = useState([]);
       useEffect(()=> {
           console.log("test")
           ShowMymemo()
       },[])
   
       const ShowMymemo = () => {
           axios.post('/api/mymemoshow').then(res=>{
               console.log(res.data)
               setMymemoData(res.data)
           })
       }
   
       const deleteMymemo = (id) => {
           axios.post('/api/deletememo/'+id)
           .then(res=>{
               ShowMymemo()
           })
       }



    return( 
        <div className="container">
        <div className="row">
          <div className='col-12'>
             
          </div>
          <div className="col-12">
              <div className="card card-body">
                        <Stack direction="row" spacing={2}>
                        <Button variant="contained" onClick={ChattingMemo} >채팅 메모</Button>
                        <Button variant="contained" onClick={PostMemo}>게시글 메모</Button>
                        <Button variant="contained" onClick={MyMemo}> 내 메모 </Button>
                        <Link to="/MymemoCreate"><button>메모</button></Link>
                        </Stack>
                  <div className="table-responsive">
                      <table className="table table-bordered mb-0 text-center">
                          <thead>
                              <tr>
                                  <th>id</th>
                                  <th>mymemotitle</th>
                                  <th>mymemo</th>
                              </tr>
                          </thead>
                          <tbody>
                              {
                                
                                      mymemoData.map((row, key)=>{
                                        return(
                                            <tr key={key}>
                                                <td>{row.id}</td>
                                                <td>{row.mymemotitle}</td>
                                                <td>{row.mymemo}</td>
                                                <td>
                                                    test
                                                </td>
                                                <td>
                                                    <Link to={`/MyPage/MymemoUpdate/${row.id}`}  className='btn btn-success me-2'>Update</Link>
                                                </td>          
                                                <td>
                                                <Button variant="danger" onClick={()=>deleteMymemo(row.id)}>
                                                    Delete
                                                </Button>
                                                </td>
                                            </tr>
                                        )    
                                    

                                      })
                                      
                                  
                              }
                          </tbody>
                      </table>
                  </div>
              </div>
          </div>
        </div>
    </div>
    )
}

