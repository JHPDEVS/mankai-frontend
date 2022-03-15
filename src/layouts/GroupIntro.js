import { Button, Modal } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";

function GroupIntro(props)
{
    const [open,setOpen] = useState(false)

    const modalOpen = () =>{
        setOpen(true)
    }
    const modalClose = () =>{
        setOpen(false)
    }
    return(
        <div>
            <div className="relative w-full">
                <img className="w-full h-96 brightness-50 rounded-t-xl" src={props.group.logoImage} alt="이미지 없음"/>
                <div className="absolute w-full bottom-48 right ">
                    <p className="text-6xl text-white text-center ">{props.group.name}</p>
                </div> 
            </div>
            
            <div className="m-4 border py-2 px-4 rounded-xl">
                <div className="flex  justify-between mb-5">
                    <p className="text-3xl">소개글</p>
                    <Button onClick={modalOpen} className="text-blue-500 hover:text-blue-700">수정하기</Button>
                </div>
                <p>
                    {props.group.intro == null 
                        ?<div>그룹 설명이 없습니다. 설정해 주세요</div>
                        :<div>{props.group.intro}</div>
                    }                
                </p>
            </div>
            

            <Modal 
                open={open}
                onClose={modalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10  h-240 rounded-xl p-5 relative">
                    소개글 작성

                    
                
                </Box> 
            </Modal>

       </div>
    )
}export default GroupIntro;