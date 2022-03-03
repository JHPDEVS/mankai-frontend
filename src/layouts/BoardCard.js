import React, { Component, useEffect, useState } from 'react';
import BoardModal from './BoardModal';
import { Avatar, Button, Card, IconButton } from '@mui/material';
import BoardSide from './BoardSide';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import SvgIcon from '@mui/material/SvgIcon';
import ChatIcon from '@mui/icons-material/Chat';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import BoardImages from './BoardImages';

function BoardCard(props){
    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.Reducers.user)
    const sideBoard = useSelector(state=>state.Reducers.sideData)
    const likeData = useSelector(state=>state.Reducers.likeData)
    const isOpen = useSelector(state=>state.Reducers.isOpen)

    const [isLike,setIsLike] = useState(false)
    const [likes,setLikes] = useState([])
    const [likeCount,setLikeCount] = useState(0)

    useEffect(()=>{
        let array = likeData[props.idx]
        setLikes(likeData[props.idx]);
        if(array !=null){
            array.forEach(element => {
                if(user.id == element.user_id){
                    setIsLike(true)
                }
            });
        }
            // console.log(likeData[props.idx])     
    },[likeData,props])
    const BoardToSideData = (e) =>{
        dispatch({
            type:"BOARD_CLICK",
            payload:{
                sideData:props.board
            }
        })
        dispatch({type:"SIDE_OPEN"})
    }
    const ClickLike = () => {
        setIsLike(true)
        setLikeCount(likeCount+1)
        axios.post('/api/post/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            console.log(res)
        })
    }
    const ClickDisLike =() => {
        setIsLike(false)
        setLikeCount(likeCount-1)
        axios.post('/api/delete/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            console.log(res.data)
        })
    }

    return (  
        <div className ="w-full mx-auto max-w-3xl px-3">
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
                    <div className='w-full '>
                        <div className='mt-10 mb-5 mx-auto'>
                            <BoardImages/>
                            <div className=' pb-4'>
                                <div className='flex'>
                                    <div className='w-full grid grid-cols-3 border-2 mt-2 border-gray-300'> 
                                        {isLike
                                            ?<Button color="error" onClick={ClickDisLike}><SvgIcon color='error'  className='mx-auto' component={FavoriteIcon} fontSize="large"></SvgIcon></Button>
                                            :<Button color="error" onClick={ClickLike}><SvgIcon color='error' className='mx-auto' component={FavoriteBorderIcon} fontSize="large"></SvgIcon></Button>
                                        }    
                                        {/* <Button color="error"><SvgIcon color='error' className='mx-auto' component={FavoriteBorderIcon} fontSize="large"></SvgIcon></Button> */}
                                        
                                            {(sideBoard.id === props.board.id && isOpen === true
                                                ?<Button variant='contained' disabled onClick={BoardToSideData} ><SvgIcon color='action' className='mx-auto' component={ChatIcon} fontSize="large"></SvgIcon></Button>
                                                :<Button onClick={BoardToSideData} ><SvgIcon color='action' className='mx-auto' component={ChatBubbleOutlineOutlinedIcon} fontSize="large"></SvgIcon></Button>
                                            )}
            
                                        {/* <Button onClick={BoardToSideData} ><SvgIcon color='action' className='mx-auto' component={ChatIcon} fontSize="large"></SvgIcon></Button> */}
                                        <Button ><SvgIcon color='action' className='mx-auto' component={StarBorderIcon} fontSize="large"></SvgIcon></Button>
                                    </div>
                                    
                                </div>

                                <div className='w-full flex text-lg px-4 py-4 justify-end'>
                                        <SvgIcon color='action' className='my-auto' component={VisibilityIcon} fontSize="small"></SvgIcon>117 
                                        <p className='ml-5'>❤ {likes ? likes.length+likeCount : 0 + likeCount }</p>      
                                </div>
                              
                                <div className='px-4 py-2 break-words '>
                                    {props.board.content_text}
                                </div>
                                
                                
                            </div>
                            
                        </div>
                        
                    </div>
                    {/* <!-- 하트 이미지 및 댓글 갯수 --> */}
                    
                </div>
            </div>
        </div>
    );
    
}

export default BoardCard;