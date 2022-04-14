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
import { AppBar, Avatar, Card, Modal, Skeleton } from '@mui/material';
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'
import { Box } from '@mui/system';
import UserMenu from '../admin/header/UserMenu';




function BoardCopy(props)
{
    const [boardData,setBoardData] = useState(null);
    const [infHandle,setInfHandle] = useState(true);
    const [currentPage,setCurrentPage] = useState(1);
    const [category,setCategory]= useState("전체");
    const [open,setOpen]=useState(false)
    const [categoryList,setCategoryList] = useState(["전체"]);
    const [selectedCategory,setSelectedCategory] = useState([]);
    const user = useSelector(state=>state.Reducers.user);

    const dispatch = useDispatch();
    let array = [];
    const test = ["장성규","박주형","한규민","누구임"];
    

    const ModalOpen = () =>{
        
        setSelectedCategory(categoryList)
        setOpen(true)
    }
    const ModalClose = () =>{
        setOpen(false)
    }
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
    useEffect(()=>{
        if(user){
            showCategory()        
        }
    },[user])

    const showCategory =()=>{
        setCategoryList(["전체"])
        axios.get('api/show/category/'+user.id)
        .then(res=>{
            res.data.forEach(data => {
                setCategoryList(categoryList=>[...categoryList,data.name])        
            });
        })
    }

    const selectedCategoryHandle = (data) => {
        if(selectedCategory.includes(data)){
            let num = selectedCategory.indexOf(data)
            setSelectedCategory(selectedCategory.filter((value,index)=>index != num))
            console.log("삭제")
        }
        else{
            setSelectedCategory(selectedCategory=>[...selectedCategory,data])
            console.log("추가")
        }
    }
    const categoryHandle = (name) =>{
        console.log(name)
        setCategory(name);
        setInfHandle(infHandle => true)
        setCurrentPage(currentPage => 1)
    }
    const SaveCategory = () =>{
        axios.post("api/post/boardcategory",{
            data:selectedCategory,
            user_id:user.id
        }).then(res=>{
            showCategory()  
            ModalClose()     
            setInfHandle(infHandle => true)
            setCurrentPage(currentPage => 1)
            setCategory("전체")   
        })
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

    useEffect(()=>{
        console.log("boards:",boards)
    },[boards])

    let art = ['영화','미술','공연','음악','드라마','연예인','만화','방송'];
    let life =['패션','일상','육아','동물','요리','인테리어','할인'];
    let hobby=['게임','스포츠','자동차','취미','해외여행','국내여행','맛집']
    let know =['IT','컴퓨터','정치','건강','일본','중국','미국','해외'];

        return(
            <div className="flex min-h-screen bg-byuncolor">
                {/* Sidebar */}  
                    <div className={'w-0'}>
                        <AppBar position="fixed" color="transparent" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 , boxShadow : 0 }}>
                            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>   
                        </AppBar>

                        <div className="w-full flex fixed bg-white mt-16 py-2 z-20 ">
                            <div className='flex w-fit mx-auto'>
                                {categoryList && categoryList.map((data)=>{
                                    return(
                                        <div >
                                            {category === data 
                                                ?<div className='bg-blue-400 text-white py-1 rounded-xl mx-2 px-3'>{data}</div>
                                                :<div onClick={()=>categoryHandle(data)} className='bg-gray-200 py-1 rounded-xl mx-2 px-3 hover:bg-gray-300'>{data}</div>
                                            }
                                        </div>
                                    )
                                })}
                            </div>
                            <button className='mr-10 bg-green-300 px-2 rounded-xl hover:bg-green-500' onClick={ModalOpen}> 카테고리 관리 </button>
                        </div>    
                    </div>
                    
                    {/* Content area */}
                    <div className='w-full flex mt-16 z-10' >
                        {/* main */}  
                        <div className={'w-full  '+(isOpen ? "pr-192":"")} >                            
                            <div className='w-full relative mt-16'>
                                <BoardWriteModal categories={categoryList}></BoardWriteModal>
                                <InfiniteScroll
                                    dataLength={boards.length} //This is important field to render the next data
                                    next={ShowBoard}
                                    hasMore={infHandle}
                                    loader={
                                        <div className='w-full'>
                                            <div className='mx-auto mt-36 w-fit '>
                                                <UseAnimations size={100} animation={loading} ></UseAnimations>
                                            </div>
                                    </div>

                                    }
                                    endMessage={
                                    <p style={{ textAlign: 'center' }}>
                                        <b className='my-10 '>더이상 글 없습니다.. 글을 써주세요</b>
                                    </p>
                                    }
                                >
                                    {boards.map((data,idx) =>{
                                        return(   
                                            <div key={idx}>
                                                <BoardCard board={data} ShowBoard={ShowBoard} idx={idx}/>
                                            </div>
                                        )
                                    })}
                                </InfiniteScroll>
                            </div>   
                        </div>
                        <div className='w-0 z-10'>
                            <BoardSide></BoardSide>
                        </div>
            <Modal 
                open={open}
                onClose={ModalClose}    
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="bg-white w-192 mx-auto mt-10 h-240 rounded-xl p-5 relative">
                    <div className='text-center text-xl'>카테고리 관리 하기</div>
                    <div className='mt-10 bg-yellow-100 rounded-t-xl py-1 font-bold border-t border-l border-r px-4'>엔터테이먼트,예술</div>    
                    <div className='flex bg-gray-100 flex-wrap rounded-b-xl pt-4 pb-4 justify-center border'>
                        {art.map((data)=>{
                            return(
                                <div className=''>
                                    {selectedCategory.includes(data)
                                        ? <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 py-1 text-white bg-blue-500 my-1 mx-2'>{data}</p>
                                        : <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 my-1 py-1 bg-gray-200 mx-2 hover:bg-gray-300'>{data}</p>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className='mt-10 bg-green-100 rounded-t-xl py-1 font-bold border-t border-l border-r px-4'>생활,노하우,쇼핑</div>    
                    <div className='flex bg-gray-100 flex-wrap rounded-b-xl pt-4 pb-4 justify-center border'>
                        {life.map((data)=>{
                            return(
                                <div className=''>
                                    {selectedCategory.includes(data)
                                        ? <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 py-1 text-white bg-blue-500 my-1 mx-2'>{data}</p>
                                        : <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 my-1 py-1 bg-gray-200 mx-2 hover:bg-gray-300'>{data}</p>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className='mt-10 bg-red-100 rounded-t-xl py-1 font-bold border-t border-l border-r px-4'>취미,여가,여행</div>    
                    <div className='flex bg-gray-100 flex-wrap rounded-b-xl pt-4 pb-4 justify-center border'>
                        {hobby.map((data)=>{
                            return(
                                <div className=''>
                                    {selectedCategory.includes(data)
                                        ? <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 py-1 text-white bg-blue-500 my-1 mx-2'>{data}</p>
                                        : <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 my-1 py-1 bg-gray-200 mx-2 hover:bg-gray-300'>{data}</p>
                                    }
                                </div>
                            )
                        })}
                    </div>
                    <div className='mt-10 bg-gray-300 rounded-t-xl py-1 font-bold border-t border-l border-r px-4'>지식,동향</div>    
                    <div className='flex bg-gray-100 flex-wrap rounded-b-xl pt-4 pb-4 justify-center border'>
                        {know.map((data)=>{
                            return(
                                <div className=''>
                                    {selectedCategory.includes(data)
                                        ? <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 py-1 text-white bg-blue-500 my-1 mx-2'>{data}</p>
                                        : <p onClick={()=>selectedCategoryHandle(data)} className='rounded-2xl px-3 my-1 py-1 bg-gray-200 mx-2 hover:bg-gray-300'>{data}</p>
                                    }
                                </div>
                            )
                        })}
                    </div>
                   <button onClick={SaveCategory} className='bg-green-200 p-3 rounded-xl hover:bg-green-400 font-bold border mt-10'>저장하기</button>
                </Box>
            </Modal>
            </div>
        </div>
            
        )
    
    
    
}
export default BoardCopy