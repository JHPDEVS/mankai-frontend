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
import { Avatar, Card, Skeleton } from '@mui/material';



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
            // console.log(res.data.data)
            if(res.data.last_page === currentPage){
                setInfHandle(infHandle=>false)
            }
            for(let i = 0 ; i<res.data.data.length;i++){
                setBoardData(boardData=>res.data.data[i])    
                array.push(res.data.data[i].id);
            }
            axios.post("/api/show/like",{
                data:array
            })
            .then(res=>{
                res.data.forEach(element => {
                    dispatch({
                        type:'LIKE_UPDATE',
                        payload:{
                            likeData:element
                        }
                    })
                });
                
            })
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

    const categoryHandle = (e) =>{
        setCategory(e.target.value);
        setInfHandle(infHandle => true)
        setCurrentPage(currentPage => 1)
    }
    useEffect(()=>{
            // console.log("category")
            dispatch({type:"BOARD_CLEAR"})
            // console.log("현재페이지" + currentPage)
            ShowBoard()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[category])

    // redux state 받아옴
    const boards = useSelector((state)=>state.Reducers.boardData); 
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const isOpen = useSelector((state)=>state.Reducers.isOpen);
    const likeData = useSelector((state)=>state.Reducers.likeData)
        return(
            <div className="flex bg-byuncolor2">
                {/* Sidebar */}  
                    <div className={'w-0  lg:mr-20 xl:mr-64'}>
                        <div className='fixed z-40 top-0 left-0'>
                            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                        </div>
                        <div className="fixed z-20 flex flex-col flex-1 w-full"  >
                        {/*  Site header */}
                            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                        </div>
                        <BoardSide></BoardSide>
                            
                    </div>
                        {/* Content area */}
                
                    <div className='w-full flex mt-16 z-10' >
                        {/* main */}  
                        <div className={'w-full '+(isOpen ? " pr-96":"")} >
                            <div className="inline-flex fixed m-3 z-20 lg:mr-64"  >
                                <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero"/></svg>
                                <select onChange={categoryHandle} className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                    <option>전체</option>
                                    <option>영화</option>
                                    <option>음식</option>
                                    <option>여행</option>
                                    <option>자동차</option>
                                    <option>IT</option>
                                    <option>패션</option>
                                    <option>취업</option>
                                    <option>가상화폐</option>
                                    <option>홍보</option>
                                </select>
                            </div>
                            <div className='w-full relative' >
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
                                          {sidebarOpen ? "O" : "X"}
                      
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

                        <div className={(isOpen ? "" : "lg:pl-96")}>
                        {!isOpen &&
                            <div className={'w-0 h-screen bg-byuncolor fixed top-16 right-0   lg:w-96'}>
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
                        </div>
                    
                </div>
            </div>
            
        )
    
    
    
}
export default BoardCopy