import React,{Component, useEffect, useRef, useState} from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import BoardCard from '../layouts/BoardCard';
import Button from '@mui/material/Button';
import BoardWriteModal from '../layouts/BoardWriteModal';
import BoardSide from '../layouts/BoardSide';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import { BoardUpdate } from '../store/actions';
import Sidebar from '../admin/layout/Sidebar';
import Header from '../admin/layout/Header';
import { AppBar, Avatar, Card, Skeleton } from '@mui/material';



function BoardCopy(props)
{
    const [boardData,setBoardData] = useState(null);
    const [infHandle,setInfHandle] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [category,setCategory]= useState("전체");

    const dispatch = useDispatch();
    let array = [];
    const test = ["장성규","박주형","한규민","누구임"];
    
     // 라라벨 에서 데이터 받아 state 저장
    const ShowBoard = () =>{
        // console.log("showboard")
        axios.post('/api/board/show/'+category+"?page="+currentPage)
        .then(res=>{
            console.log(res.data)
            // console.log(res.data.data)
            if(res.data.last_page === currentPage){
                setInfHandle(infHandle=>false)
            }
            for(let i = 0 ; i<res.data.data.length;i++){
                setBoardData(boardData=>res.data.data[i])    
                array.push(res.data.data[i].id);
            }
         })
        setCurrentPage(currentPage=>currentPage+1)
    }
    // 처음 랜더 될때 state 저장하기
    
    // state 갱신되면 redux로 올림
    
    useEffect(()=>{
        // console.log("useEffect 먼저")
        if(boardData!= null){
            dispatch(BoardUpdate({
                boardData
            }))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[boardData])

    const categoryHandle = (name) =>{
        setCategory(name);
        setInfHandle(infHandle => true)
        setCurrentPage(currentPage => 1)
    }
    useEffect(()=>{
            dispatch({type:"BOARD_CLEAR"})
            ShowBoard()
    },[category])

    // redux state 받아옴
    const boards = useSelector((state)=>state.Reducers.boardData); 
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isOpen = useSelector((state)=>state.Reducers.isOpen);
    const likeData = useSelector((state)=>state.Reducers.likeData)
    let categoryList = ['전체','영화','여행','모바일','주식','테스트'];

        return(
            <div className="flex bg-byuncolor">
                {/* Sidebar */}  
                    <div className={'w-0'}>
                        <AppBar position="fixed" color="transparent" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>   
                        </AppBar>
                        
                        <div className='z-0'>
                            <BoardSide></BoardSide>
                        </div>
                            
                    </div>
                        {/* Content area */}
                
                    <div className='w-full flex mt-16 z-10' >
                        {/* main */}  
                        <div className={'w-full  '+(isOpen ? "pr-192":"")} >
                            
                            <div className="w-full fixed flex bg-white p-2 z-20 border">
                                <div className={'flex '}>
                                    {categoryList.map((data)=>{
                                        return(
                                            <div>
                                                {category == data 
                                                    ? <p className='rounded-3xl px-4 py-1 text-white bg-blue-500 border-2 border-gray-100 mx-2'>{data}</p>
                                                    : <p onClick={()=>categoryHandle(data)} className='rounded-3xl px-4 py-1 bg-gray-100 border-2 border-gray-300 mx-2 hover:bg-gray-200'>{data}</p>
                                                }
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>

                            <div className='w-full relative mt-16' >
                                <BoardWriteModal></BoardWriteModal>
                                <InfiniteScroll
                                    dataLength={boards.length} //This is important field to render the next data
                                    next={ShowBoard}
                                    hasMore={infHandle}
                                    scrollableTarget="scrollableDiv"
                                    loader={
                                        <div className='w-full flex justify-center'>
                                            <div className='mb-10'>
                                                <Skeleton variant="text" width={600} height={100}/>
                                                <Skeleton variant="rectangular" width={600} height={300} />
                                                
                                                <Skeleton variant="text" width={600} height={100}/>
                                                <Skeleton variant="rectangular" width={600} height={300} />

                                                <Skeleton variant="text" width={600} height={100}/>
                                                <Skeleton variant="rectangular" width={600} height={300} />
                                            </div>
                                    </div>

                                    }
                                    endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b className='my-10'>더이상 글이 없습니다.. 글을 써주세요</b>
                                    </p>
                                    }
                                >
                                    {boards.map((data,idx) =>{
                                        return(   
                                            <div key={idx}>
                                                <BoardCard board={data} idx={idx}/>
                                            </div>
                                        )
                                    })}
                                </InfiniteScroll>
                            </div>   
                        </div>

                        {/* <div className={(isOpen ? "" : "lg:pl-96")}>
                        {!isOpen &&
                            <div className={'w-0 h-screen bg-byuncolor2 fixed top-24 mt-6 right-0 lg:w-96'}>
                                <p className='text-center font-bold text-lg bg-blue-500 text-white border rounded '>
                                    온라인 친구 상태 
                                </p>
                            {test.map((number)=>{
                                return(
                                    <Card className='m-1'>
                                        <div className='flex px-5 py-3 font-bold'>
                                            <Avatar>J</Avatar>
                                            <div className='flex ml-4 my-auto justify-between w-full'>
                                                <p className='text-lg text-gray-600'>{number}</p>
                                                <p className='text-sm w-20  text-green-500 text-right'>접속 중 </p>
                                            </div>
                                        </div>
                                    </Card>
                                )
                            })}
                            <p className='text-center font-bold text-lg bg-blue-500 text-white border rounded '>
                                    그룹 추천 
                                </p>

                                <Card className='m-1'>
                                        <div className='flex px-5 py-3 font-bold'>
                                            <Avatar>J</Avatar>
                                            <div className='flex ml-4 my-auto justify-between w-full'>
                                                <p className='text-lg text-gray-600'>가상화폐 그룹</p>
                                                <p className='text-sm w-20  text-green-500 text-right'>20명 </p>
                                            </div>
                                        </div>
                                    </Card>
                            </div>
                            
                        }
                        </div> */}
                    
                </div>
            </div>
            
        )
    
    
    
}
export default BoardCopy