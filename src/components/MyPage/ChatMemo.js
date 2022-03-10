<<<<<<< HEAD
import axios from "axios";
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2'
import Button from 'react-bootstrap/Button'
import { Delete } from "@mui/icons-material";
import { Link } from 'react-router-dom'


export default function ChatMemo(props){

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

    return (
        <div className="container">
            <div className="row">
              <div className='col-12'>
                 
              </div>
              <div className="col-12">
                  <div className="card card-body">
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
                                                        <Button>
                                                            Update
                                                        </Button>
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
import React from "react";
import Moment from 'moment';
import { Avatar } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default function ChatMemo(){

  return(
    <div className="border-b rounded-xl p-2 m-2 h-full">
         
         
         <div className="relative ">
            <span class="absolute bottom-0 right-2">
              {/* <Moment format="H:mm" local>
                
              </Moment> */}
            </span>
          </div>
         
         <div className="flex p-1 mr-2 justify-end">
         <div className="text-left mr-2 py-3 px-4 bg-indigo-100  border-b rounded-xl border max-w-[50%]">
            <span className="break-all break-word">내가적은 메세지 내용</span>
          </div>
         </div>
         


          

          <div className="flex max-w-[50%]">
            
          <Avatar
                style={{
                  backgroundColor: indigo[300],
                }}
            >
                {/* {message.user.name.substring(0, 1)} */}
            </Avatar>
            

            <div className="flex flex-col text-left ml-2">
            
              <div className="ml-2 ">
            
                <span> 
                    유저이름
                </span>
            
              </div>
            
              <div className=" py-3 px-4 bg-white  border-b rounded-xl border">
                <span className="break-all break-word">
                    메세지 내용
                </span>
              </div>
            </div>

            <span class="flex items-end ml-1">
              {/* <Moment format="H:mm" local>
                
              </Moment> */}
            </span>
          </div>


    </div>
  )
    
}

>>>>>>> dfadfd8944e50021b31ea10489e14738cafd89af
