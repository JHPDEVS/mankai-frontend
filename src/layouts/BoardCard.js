import React, { Component } from 'react';
import BoardModal from './BoardModal';
import { Avatar, Button, Card, IconButton } from '@mui/material';
import BoardSide from './BoardSide';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SvgIcon from '@mui/material/SvgIcon';
import ChatIcon from '@mui/icons-material/Chat';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { red } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

function BoardCard(props){
    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.Reducers.user)
    const BoardToSideData = (e) =>{
        dispatch({
            type:"BOARD_CLICK",
            payload:{
                sideData:props.board
            }
        })
        dispatch({type:"SIDE_OPEN"})
        // console.log(props);
    }
    const ClickLike =()=>{
        axios.post('/api/post/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            console.log(res)
        })
    }
    return (  
        <div className ="w-full mx-auto max-w-3xl px-3">
            <div>
                <div className="bg-white w-full rounded-md shadow-md mt-2">
                    <div className="w-full h-16 ml-2 flex items-center flex justify-between ">
                        <div className='w-full flex justify-between mt-10 py-1 px-4 mr-4 rounded-lg  border-2 border-gray-300'> 
                            <div className="flex">
                            {/* <img className=" rounded-full w-10 h-10 mr-3" src="https://scontent.fsub1-1.fna.fbcdn.net/v/t1.0-9/37921553_1447009505400641_8037753745087397888_n.jpg?_nc_cat=102&_nc_sid=09cbfe&_nc_oc=AQnDTnRBxV3QgnhKOtk9AiziIOXw0K68iIUQfdK_rlUSFgs8fkvnQ6FjP6UBEkA6Zd8&_nc_ht=scontent.fsub1-1.fna&oh=728962e2c233fec37154419ef79c3998&oe=5EFA545A" alt=""></img> */}
                                <Avatar className='mr-3 mt-1'>d</Avatar> 
                                <div>
                                    <h3 className="font-bold text-md">{props.board.name}</h3>
                                    <p className='text-sm text-gray-500'>3시간 전</p>
                                </div>
                            </div>
                            <p className='text-blue-500 text-md font-bold'>{props.board.category}</p>
                        </div>
                    </div>
                    <div className='w-full '>
                        <div className='mt-10 mb-5 mx-auto'>
                            {/* <img className="mx-auto" src="http://placehold.it/600x600" alt='nope' /> */}
                            <div className='border border-gray-300 px-4 pb-4'>
                                <div className='flex'>
                                    <div className='w-1/2 my-2 grid grid-cols-3'>     
                                        <Button color="error" onClick={ClickLike}><SvgIcon color='action' className='mx-auto' component={FavoriteBorderIcon} fontSize="large"></SvgIcon></Button>
                                        {/* <Button color="error"><SvgIcon color='error' className='mx-auto' component={FavoriteBorderIcon} fontSize="large"></SvgIcon></Button> */}
                                        <Button onClick={BoardToSideData} ><SvgIcon color='action' className='mx-auto' component={ChatIcon} fontSize="large"></SvgIcon></Button>
                                        <Button ><SvgIcon color='action' className='mx-auto' component={StarBorderIcon} fontSize="large"></SvgIcon></Button>
                                    </div>
                                    
                                </div>

                                <div className='flex'>
                                    <div className='w-1/2 p-3 font-bold'>
                                        117 View
                                    </div>
                                    <div className='w-1/2 p-3 font-bold text-right text-red-500'>
                                        19 Likes
                                    </div>
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