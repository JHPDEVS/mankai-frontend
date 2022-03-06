import axios from "axios";
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2'


export default function ChatMemo(){

    const[mymemoData,setMymemoData] = useState(null);

    useEffect(()=> {
        console.log("test")
        ShowMymemo()
    })

    const ShowMymemo = () => {
        axios.get('/api/mymemoshow').then(res=>{
            console.log(res.data.data)
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
                                      <th>user_id</th>
                                      <th>mymemotitle</th>
                                      <th>mymemo</th>
                                  </tr>
                              </thead>
                              <tbody>
                                  {
                                      ShowMymemo.length > 0 && (
                                          ShowMymemo.map((row, key)=>(
                                              <tr key={key}>
                                                  <td>{row.user_id}</td>
                                                  <td>{row.mymemotitle}</td>
                                                  <td>{row.mymemo}</td>
                                              </tr>
                                          ))
                                      )
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