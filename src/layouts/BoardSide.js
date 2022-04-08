import React, { Component , useCallback, useEffect, useState}from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Modal from '@mui/material/Modal'
import BoardSideCard from './BoardSideCard';
import { AppBar, Avatar, Button, ClickAwayListener, Divider, Fab, Grow, IconButton, MenuItem, MenuList, Pagination, Paper, Popper, Skeleton, Slider, Stack, TextField } from '@mui/material';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import {Provider, useSelector, useDispatch, connect} from 'react-redux';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SvgIcon from '@mui/material/SvgIcon';
import CreateIcon from '@mui/icons-material/Create';
import TranslateIcon from '@mui/icons-material/Translate';
import CloseIcon from '@mui/icons-material/Close';


const drawerWidth = 700;

function BoardSide(props){
    
    const sideData = useSelector((state=>state.Reducers.sideData));
    const postMemo = useSelector((state=>state.Reducers.postMemo));
    const user = useSelector((state=>state.Reducers.user))
    const [translatedText,setTranslatedText] = useState("");
    const [post_comment,setPostComment] = useState("");
    const [current_page,setCurrent_page] = useState(1);
    const [last_page,setLast_page] = useState(1);
    const [comments,setComments] = useState([]);
    const [paginatePage,setPaginatePage]= useState(1);
    const [updateComment,setUpdateComment] = useState("");
    const [isUpdate,setIsUpdate] =useState(0);
    const [checkComment,setCheckComment] = useState("");
    const [isMenuOpen,setIsMenuOpen] = useState(false);
    const [transComment,setTransComment] = useState([]);
    const anchorRef = React.useRef(null);
    const [open,setOpen] = useState(false);
    const [titlefieldvalue,setTitleFieldValue] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false)
    
        

    const isOpen = useSelector((state=>state.Reducers.isOpen))
    const dispatch = useDispatch()

    const handleDrawerClose = () => {
        dispatch({type:"SIDE_CLOSE"})
    };
 
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600,
        maxHeight: 630,
        borderRadius:'10px',
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    // 클릭한 board_id 값바뀌면 새로운 댓글 출력
    useEffect(()=>{
        if(sideData != null){
            setCurrent_page(current_page => 1);
            ShowComment(current_page);
            dataclean();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[sideData])
    
    // current_Page값 바뀌면 댓글 불러오기
    useEffect(()=>{
        dataclean();
        ShowComment(current_page);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[current_page])
    
    //데이터 초기화
    const dataclean = () =>{
        setTranslatedText(translatedText =>"")
        setComments(comments => [])
    }
    // 댓글 작성하기
    const PostComment = () =>{
        axios.post('/api/post/comment',{
            content:post_comment,
            board_id:sideData.id,
            user_id:user.id
            
        }).then(res=>{
            ShowComment(1);
            setPostComment("");
            console.log("댓글 등록완료");
        })
    }
    const updateCommentHandle =(e) =>{
        setUpdateComment(updateComment => e.target.value);
    }
    //댓글 작성 핸들
    const commentHandle=(e)=>{
        setPostComment(post_comment => e.target.value);
    }
    // 페이지 네이션 핸들
    const paginateHandle = (e) =>{
        setCurrent_page(current_page => e.target.outerText);
    }

    // 게시글 누르면 코멘트 불러오기 & 페이지네이션 버튼누르면 반응
    const ShowComment = useCallback(async (page) =>{
        if(sideData){
            axios.post("/api/show/comment/"+sideData.id+"?page=" + page)
            .then(res=>{ 
                setPaginatePage(paginatePage=>res.data.current_page)
                if(res.data.data.length === 0){
                    setComments(comments => ["No Data"])
                }
                else{
                    setLast_page(last_page => res.data.last_page)
                    setComments(comments => res.data.data);
                }
            })
        }
        
    })
    // 댓글 수정버튼 클릭
    const clickUpdate = (comment) =>{
        console.log("업데이트 작동")
        setIsUpdate(isUpdate=>comment.id);
        setCheckComment(checkComment=>comment.comment)
    }
    // 수정 취소
    const updateCancle =()=>{
        setIsUpdate(isUpdate=>0)
    }
    // 수정 확인
    const CommentUpdate = (comment) =>{
        console.log(comment.id)
        setTransComment(transComment=>[{
            id:0,
            text:""
        }]);
        axios.post("/api/update/comment",{
            comment_id:comment.id,
            updateText:updateComment
        }).then(res=>{
            setIsUpdate(isUpdate=>0);
            ShowComment(current_page);
        })
    }
    // 번역 api 부르기
    const callPapago = (data) =>{
        handleToggle()
        axios.post("/api/show/papago",{
            text:data
        }).then(res=>{
            if(res == "Error!!"){
                setTranslatedText(translatedText=>"언어를 찾을 수 없습니다");
            }
            else{
                setTranslatedText(translatedText=>res.data.message.result.translatedText);
            }
        })
    }
    // 댓글 번역 api 
    const callCommentPapago =(comment)=>{
        axios.post("/api/show/papago",{
            text:comment.comment
        }).then(res=>{
            setTransComment(transComment =>
                [{
                    id:comment.id,
                    text:res.data.message.result.translatedText,
            }])
        
        })
        console.log(transComment)
    }
    // 댓글 삭제
    const clickDelete = (comment)=>{
        axios.post("/api/delete/comment/"+comment.id).
        then(res=>{
            ShowComment(current_page)
            console.log("삭제 완료")
        })
    }
    // 설정 오픈여부 확인

    const textChange = (e) => {
        setTitleFieldValue(e.target.value);
      };

    const submitMemo = (titlefieldvalue) => {
        axios.post("/api/storememo",{
            content_text:{sideData}.sideData.content_text,
            memo_title : titlefieldvalue,
            user_id : user.id,
            post_memo_id : {sideData}.sideData.id
        })
        // post_memo_id를 보낸게 MemoController에서 게시글에 딸린 이미지를 저장할 수 있게 해준다. 
        .then((res)=>{
            console.log(res);
            handleClose();
            dispatch({
                type: 'ADD_MEMO',
                payload: { memo: res.data },
              })
        })
        .catch((err)=>{
            console.log(err);
        })
        setTitleFieldValue("")
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleToggle = (clickCategory) =>{
        setIsMenuOpen(isMenuOpen => !isMenuOpen)
        if(clickCategory === 'memo'){
            setOpen(true);
        }
    }
    return (
       <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
          <Box sx={style}>
           <TextField 
          fullWidth 
          value={titlefieldvalue}
          onChange={textChange}
          multiline 
          maxRows={5}
          id="standard-basic" 
          label="메모 제목을 적어주세요" 
          variant="standard"
          />

          <Button onClick={() => {submitMemo(titlefieldvalue)}} sx={{ ":hover":{
            backgroundColor:'#6f53f0'
          }, backgroundColor:'#4D2BF4', }} variant="contained" className="submit_button">메모저장</Button>
          </Box>
      </Modal>


        <Box className="justify-between flex">
            <Drawer
                sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width:drawerWidth,
                    overflowX:'hidden',
                    border: "0px"
                },
                }}
                variant="persistent"
                anchor="right"
                PaperProps={{ elevation: 4 }}
                open={isOpen}
            >
                
                
                {/* 사이드바 데이터 있을경우*/}
                {sideData != null &&
                <div className='flex flex-col relative mb-20 mt-16'>
                    <Button onClick={handleDrawerClose}>
                        <div className='h-8 text-lg'>X</div>
                    </Button>
                    <div className='w-full p-5'>
                    {/* 프사 & 이름 */}
                    <div className='flex justify-between'>
                        <div className="flex">
                          
                            <Avatar className='mr-3'>d</Avatar> 
                            <div>
                                <h3 className="text-md font-semibold">{sideData.name}</h3>
                                <p className="text-xs text-gray-500">시간표시할것</p>
                            </div>
                        </div>
                            {/* 메뉴바 */}
                            <Stack direction="row" className='z-10' spacing={2}>
                                <div>
                                    <Button className=''
                                        ref={anchorRef}
                                        id="composition-button"
                                        aria-controls={isMenuOpen ? 'composition-menu' : undefined}
                                        aria-expanded={isMenuOpen ? 'true' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >
                                    설정
                                    </Button>
                                    <Popper
                                        open={isMenuOpen}
                                        anchorEl={anchorRef.current}
                                        role={undefined}
                                        placement="bottom"
                                        transition
                                        disablePortal
                                    >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                placement === 'bottom-start' ? 'left top' : 'left bottom',
                                            }}
                                            >
                                            <Paper>
                                                <ClickAwayListener onClickAway={() => handleToggle("")}>
                                                <MenuList
                                                    autoFocusItem={isMenuOpen}
                                                    id="composition-menu"
                                                    aria-labelledby="composition-button"
                                                >
                                                    <MenuItem onClick={()=>callPapago(sideData.content_text)}>번역하기</MenuItem>
                                                    <MenuItem onClick={() => handleToggle("memo")}>메모 보내기</MenuItem>
                                                    <MenuItem onClick={() => handleToggle("")}>신고하기</MenuItem>
                                                </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                    </Popper>
                                </div>
                            </Stack>  
                    </div>
                        
                        {/* 게시글 구간 */}
                        <BoardSideCard board={sideData}></BoardSideCard>
                        
                       
                       {/* 페이지 네이션 */}
                        <div className='w-full flex justify-center my-4 bg-gray-200'>
                            <Pagination name="paginate" count={last_page} color="primary" onChange={paginateHandle} page={paginatePage} hidePrevButton hideNextButton />
                        </div>
                        {/* 댓글 구간 */}   
                        <Divider light>Comment</Divider>
                       
                        {/* 댓글 데이터 로딩중 */}
                        {comments.length === 0 &&
                            <div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                                <div className='w-full p-3'>
                                     <div className='flex mb-2'>
                                         <Skeleton variant="circular" width={48} height={48} />
                                         <Skeleton className='w-24 ml-2' variant="text"/>
                                     </div>
                                     <Skeleton variant="rectangular" width={270} height={58} />
                                </div>
                            </div>
                        }
                        {/* axios 값없으면 보여줌 */}

                        {comments[0] == "No Data" &&  
                            <div className='w-full text-center mt-10 text-sm text-gray-500'>
                                <p>댓글이 없습니다.</p>
                            </div>
                        }
                        {/* 댓글 보여주기 */}
                        {comments[0] != "No Data" &&   
                            <div className='mb-24 '>
                                {comments.map((comment,idx)=>{
                                    return(
                                        <div className='mt-4 mb-4' key={idx}>

                                            {/* 상단 내용 */}
                                            <div className="flex">
                                                <Avatar className='mr-3'>d</Avatar> 
                                                <div className='flex w-full justify-between'>
                                                    <div>
                                                        <h3 className="text-md font-semibold ">{comment.name}</h3>
                                                        <div className='flex text-xs text-gray-500'>
                                                            {comment.updated_at != comment.created_at &&
                                                                <p>(수정됨)</p>
                                                            }
                                                            <p>{comment.updated_at}</p>
                                                        </div>
                                                    </div>
                                                    
                                                        <div className='mr-3 flex' >
                                                            <SvgIcon onClick={()=>callCommentPapago(comment)} className='mt-1 ' color="primary" component={TranslateIcon} fontSize="small"></SvgIcon>
                                                            {comment.user_id == user.id &&
                                                                <div>
                                                                    <SvgIcon onClick={()=>clickUpdate(comment)} color="warning" component={CreateIcon} fontSize="small"></SvgIcon>
                                                                    <SvgIcon onClick={()=>clickDelete(comment)} color="error" component={DeleteForeverIcon} fontSize="small"></SvgIcon>
                                                                </div>
                                                            }
                                                        </div>
                                                    
                                                </div>
                                            </div>
                                            {/* 하단 댓글 내용 */}
                                            <div className='break-words mt-3 mb-10'>
                                                    {/* 수정중 이면 */}
                                                    {isUpdate == comment.id&&
                                                        <div>
                                                            <textarea name='updateComment' className='w-full m-2 bg-gray-200' rows={4} onChange={updateCommentHandle}
                                                            defaultValue={checkComment}></textarea>
                                                            <Button onClick={()=>CommentUpdate(comment)}>수정하기</Button>
                                                            <Button onClick={updateCancle}>취소</Button>
                                                        </div>
                                                    }
                                                    {/* 수정중 아니면 */}
                                                    {isUpdate != comment.id && 
                                                        <div className='mx-8 '>
                                                            {comment.comment}
                                                        </div>
                                                    }
                                                    <div>
                                                    {/* 번역 메시지 보여주기 */}
                                                    {transComment[0] &&
                                                            transComment[0].id === comment.id &&
                                                            <div className='bg-gray-200 mx-8'>
                                                                {transComment[0].text}
                                                            </div>
                                                    }
                                                    </div>
                                                   
                                                    
                                            </div>
                                            <Divider light></Divider>
                                        </div>
                                    )
                                })}
                            </div>    
                        }
                    </div>
                    {/* 댓글 달기 */}
                    {/* 댓글 달기 */}
                    <div className='flex fixed w-186 mr-2 bottom-0 right-0 bg-gray-200 rounded-xl'>
                        <div className='w-full flex'>
                            <textarea name='post_comment' className='w-4/5 m-3 rounded-xl p-1 bg-gray-300' rows={3} onChange={commentHandle}
                                value={post_comment}></textarea>

                            <div className='w-1/5'>
                                <button className='bg-white px-5 mt-3 mr-3 h-20  rounded-2xl' onClick={PostComment}>댓글 달기</button>
                            </div>
                        </div>
                    </div>
                    <div className='fixed top-32 right-10 w-186'>
                        <Fab color="primary" aria-label="add" onClick={handleDrawerClose}>
                            <CloseIcon/>
                        </Fab>
                    </div>  
                </div>
            }
            </Drawer>
        </Box>
        </>
        ); 
}
export default BoardSide;
