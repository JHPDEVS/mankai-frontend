<<<<<<< HEAD
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

=======
import {Button, Fab, Link} from "@mui/material";
import React, {memo, useEffect, useState} from "react";
import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import {useSelector} from "react-redux";

export default function MyPage() {

    const user = useSelector((state) => state.Reducers.user)
    const [memos, setMemos] = useState([]);

    const MyMemo = () => (window.open("/my_new_memo", "", "width=500,height=600"))

    useEffect(() => {
        axios
            .get('/api/show/memo/' + user.id)
            .then(res => {
                setMemos(res.data)
            })
    }, [])

    function editPage(memo){
        window.open("/my_memo_edit/"+memo.id, "bnhgn", "width=500,height=600")
    }

    return (
        <div>
            {/* 검색 창 */}
            <div className="flex items-center max-w-md mx-auto bg-gray-200 rounded-lg">
                <div className="w-full">
                    <input
                        type="search"
                        className="w-full px-4 py-1 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
                        placeholder="search"/>
                </div>
                <div>
                    <button
                        type="submit"
                        className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg">
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </button>
                </div>

            </div>

            {
                memos.map((memo) => {

                    return (

                        <div className="balloon" key={memo.id}>
                            {memo.memo}
                            <br/>
                            <span >
                            
                                <Button onClick={() => {editPage(memo)}}>수정</Button>
                            
                                
                                <Button>삭제</Button>
                            </span>
                        </div>
                    )
                })
            }
            

            <Fab color="" onClick={MyMemo}>
                <EditIcon/>
            </Fab>

        </div>
    )
}
>>>>>>> dfadfd8944e50021b31ea10489e14738cafd89af
