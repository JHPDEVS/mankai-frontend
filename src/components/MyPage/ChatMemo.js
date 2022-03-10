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