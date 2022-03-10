import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios'
import Swal from 'sweetalert2';

export default function MyememoCreate() {

  const [mymemotitle, setmymemoTitle] = useState("")
  const [mymemo, setmymemo] = useState("")
  const [validationError,setValidationError] = useState({})

  

  const createMymemo = async (e) => {
    e.preventDefault();

    const formData = new FormData()

    formData.append('mymemotitle', mymemotitle)
    formData.append('mymemo', mymemo)

    await axios.post('/api/postmymemo', formData).then(({data})=>{
      Swal.fire({
        icon:"success",
        text:data.message
      })
    }).catch(({response})=>{
      if(response.status===422){
        setValidationError(response.data.errors)
        console.log("testing")
      }else{
        Swal.fire({
          text:response.data.message,
          icon:"error"
        })
      }
    })
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Create category</h4>
              <hr />
              <div className="form-wrapper">
                {
                  Object.keys(validationError).length > 0 && (
                    <div className="row">
                      <div className="col-12">
                        <div className="alert alert-danger">
                          <ul className="mb-0">
                            {
                              Object.entries(validationError).map(([key, value])=>(
                                <li key={key}>{value}</li>   
                              ))
                            }
                          </ul>
                        </div>
                      </div>
                    </div>
                  )
                }
                <Form onSubmit={createMymemo}>
                  <Row> 
                      <Col>
                        <Form.Group controlId="Name">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" value={mymemotitle} onChange={(event)=>{
                              setmymemoTitle(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>  
                  </Row>
                  <Row className="my-3">
                      <Col>
                        <Form.Group controlId="Description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={mymemo} onChange={(event)=>{
                              setmymemo(event.target.value)
                            }}/>
                        </Form.Group>
                      </Col>
                  </Row>
                 
                  <Button variant="primary" className="mt-2" size="lg" block="block" type="submit">
                    Save
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}