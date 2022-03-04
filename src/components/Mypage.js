import React from 'react'
import MyUser from './MyUser'
import MyContents from './MyContents'
import Grid from '@mui/material/Grid'
import Container from '@mui/material/Container'
import { Box } from '@mui/system'

function Mypage() {
  return (
    <>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <div className=" w-full  relative flex flex-col justify-center items-center bg-blue-100 overflow-hidden">
          <Container>
            <div className="flex">
              <MyUser />
              <MyContents />
            </div>
          </Container>
        </div>
      </Grid>
    </>
  )
}

export default Mypage
