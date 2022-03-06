import React from "react";
import Navbar from "../layouts/Navbar"

import MyUser from './MyPage/MyUser';
import MyContents from './MyPage/MyContents'

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';



function Mypage() {
    return (
        <>
          <Navbar/>
            <Grid container component="main" sx={{ height: '100vh' }}>
            <div className=" w-full relative flex flex-col bg-blue-100 overflow-hidden py-6">

                <Container >
                        <div className="flex">
                            {/* 화면에서 왼쪽 : 내 정보 간략히 보여주는 컴포넌트 */}
                            <MyUser />
                            {/* 화면에서 오른쪽 : 즐겨찾기, 게시물, 그룹, 메모장 */}
                            <MyContents />
                        </div>
                </Container>
            </div>

            </Grid>
        </>
           
    )
}

export default Mypage;