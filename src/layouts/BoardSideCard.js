import React, { Component, useEffect, useState } from 'react';
import BoardModal from './BoardModal';
import { Avatar, Button, Card, IconButton } from '@mui/material';
import BoardSide from './BoardSide';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ShareIcon from '@mui/icons-material/Share';
import SvgIcon from '@mui/material/SvgIcon';
import ChatIcon from '@mui/icons-material/Chat';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import BoardImages from './BoardImages';

function BoardSideCard(props){
    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.Reducers.user)
    const imageList = useSelector(state=>state.Reducers.sideImageList)
    const likeUpdate = useSelector(state=>state.Reducers.likeUpdate)
    const likeId = useSelector(state=>state.Reducers.likeId)
    const isOpen = useSelector(state=>state.Reducers.isOpen)

    const sideData = useSelector(state=>state.Reducers.sideData)

    const [isLike,setIsLike] = useState(false)
    const [likes,setLikes] = useState([])
    
    const ClickLike = () => {
        setIsLike(true)
        axios.post('/api/post/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            setLikes(res.data)
        })
        
        dispatch({
            type:"LIKE_UPDATE",
            payload:{
                board_id:props.board.id
            }
        })
    }
    const ClickDisLike =() => {
        setIsLike(false)
        axios.post('/api/delete/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            setLikes(res.data)
        })
        
        dispatch({
            type:"LIKE_UPDATE",
            payload:{
                board_id:props.board.id
            }
        })
    }

    useEffect(()=>{
        if(isOpen && likeId == props.board.id){
            axios.get('/api/show/like/'+props.board.id)
            .then(res=>{
                console.log(res.data)
                setLikes(res.data)
            })
        }
    },[likeUpdate])

    useEffect(()=>{
        axios.get('/api/show/like/'+props.board.id)
            .then(res=>{
                
                setLikes(res.data)
            })
    },[sideData])

    useEffect(()=>{
        setIsLike(false)
        likes.forEach(like=>{
            if(user.id == like.user_id)
            {
                setIsLike(true)
            }
        })
    },[likes])

    return (  
        <div className ="w-full mx-auto max-w-3xl px-3 mb-5">
            <div>
                <div className="bg-white w-full rounded-md shadow-md mt-2">
                    <div className="w-full h-16 ml-2 flex items-center flex justify-between ">
                        <div className='w-full flex justify-between mt-10 py-1 px-4 mr-4 rounded-lg  border-2 border-gray-300'> 
                            <div className="flex">
                                <Avatar className='mr-3 mt-1'>d</Avatar> 
                                <div>        
                                    <h3 className="font-bold text-md">{props.board.name}</h3>
                                    <p className='text-sm text-gray-500'>3시간 전</p>
                                </div>
                            </div>
                            <p className='text-md font-bold'>{props.board.category}</p>
                        </div>
                    </div>
                    <div className='w-full mt-10 '>
                        <div className='w-full mx-auto px-5'>
                            {/* 게시글 사진및 본문내용 */}
                            <p className='mb-3'>{props.board.content_text}</p>
                            {imageList != "No Data"
                                ?<div className=''><BoardImages imageList={imageList}/></div>
                                :<p></p>
                            }
                        </div>  
                        <div className='mx-auto px-10 mt-10' >    
                            <div className='pb-4'>
                                <div className='flex'>
                                    <div className='w-1/3 grid grid-cols-2'> 
                                        {isLike
                                            ?<Button color="error" onClick={ClickDisLike}>
                                                <SvgIcon color='error' disabled className='mx-auto' component={FavoriteIcon} fontSize="large"/> 
                                                <p>{likes ? likes.length : 0}</p></Button>

                                            :<Button color='error' onClick={ClickLike}>
                                                <SvgIcon color='action' className='mx-auto' component={FavoriteBorderIcon} fontSize="large">
                                                    </SvgIcon><p>{likes ? likes.length : 0}</p></Button>
                                        }       
                                    </div>
                                    <div className='w-2/3 text-right'>
                                        <Button  onClick={ClickLike}>
                                                <SvgIcon color='action' className='mx-auto' component={ShareIcon} fontSize="large"/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );   
}
export default BoardSideCard;