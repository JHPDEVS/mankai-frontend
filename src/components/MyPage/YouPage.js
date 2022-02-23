import React from "react";

import YouUser from './YouUser';
import YouContents from './YouContents'

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Box } from "@mui/system";


function Youpage() {
    return (
        <>
            <Grid container component="main" sx={{ height: '100vh' }}>
            <div className=" w-full  relative flex flex-col justify-center items-center bg-red-100 overflow-hidden">

                <Container >
                        <Box className="flex ">
                            {/* 화면에서 왼쪽 : 내 정보 간략히 보여주는 컴포넌트 */}
                            <YouUser />
                            {/* 화면에서 오른쪽 : 즐겨찾기, 게시물, 그룹, 메모장 */}
                            <YouContents />
                        </Box>
                </Container>
            </div>

            </Grid>
        </>
           
    )
}

export default Youpage;