import React, { Component, useEffect, useState } from 'react';
import { Avatar, Button, Card, IconButton, CircularProgress, Skeleton,TextField } from '@mui/material';
import BoardSide from './BoardSide';
import Box from '@mui/material/Box';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Modal from '@mui/material/Modal'
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
import Dropdown from 'react-dropdown';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Moment from 'react-moment';
import 'react-dropdown/style.css';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import MyPostEditModal from './MyPostEditModal'
import { buttonUnstyledClasses } from '@mui/base';
import '../App.css'

function MyPostBoardCard(props){
    
    const dispatch = useDispatch();
    const user = useSelector(state=>state.Reducers.user)
    const sideBoard = useSelector(state=>state.Reducers.sideData)
    const isOpen = useSelector(state=>state.Reducers.isOpen)
    const likeUpdate = useSelector(state=>state.Reducers.likeUpdate)
    const likeId = useSelector(state=>state.Reducers.likeId)

    const [imageList, setImageList] = useState([]);
    const [showComment, setShowComment] = useState(false);
    const [isLike,setIsLike] = useState(false)
    const [likes,setLikes] = useState([])
    const [openModal,setOpenModal] = useState(false)
    const [likeCount,setLikeCount] = useState(0)
    const [sampleComment, setSampleComment] = useState([])
    const [titlefieldvalue,setTitleFieldValue] = useState("");
    const [commentLength, setCommentLength] = useState("")
    const option = ["번역하기","클립보드로 이동","수정하기","삭제하기"]
    const [translated,setTranslated] = useState("");
    const [more,setMore] = useState(false)
    const [editModalOpen,setEditModalOpen] = useState(false)
    // 메뉴바 조절
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
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

      const textChange = (e) => {
        setTitleFieldValue(e.target.value);
      };

    const handleClose = (e) => {
        let eText = e.target.outerText;
        if(eText === option[0])
        {
            axios.post('/api/show/papago',{
                text:props.board.content_text
            }).then(res=>{
               setTranslated(res.data.message.result.translatedText); 
            })
        }
        if(eText === "삭제하기"){
            
            axios.post('/api/mypost/delete',{
                boardId : Number(props.board.id)
            })
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err)
            })
            props.ShowBoard();
        }

        if(eText === "수정하기"){
            setEditModalOpen(true)
        }

        if(eText === "클립보드로 이동"){
            setOpenModal(true)
        }
        setAnchorEl(null);
    };

    const showBoardByEdit = () => {
        props.ShowBoard();
    }

    const BoardToSideData = (e) =>{
        console.log(likes)
        dispatch({
            type:"BOARD_CLICK",
            payload:{
                sideData:props.board,
                sideLikeData:likes,
                sideImageList:imageList
            }
        })
        dispatch({type:"SIDE_OPEN"})
    }
    const ClickLike = () => {
        dispatch({
            type:"LIKE_UPDATE",
            payload:{
                board_id:props.board.id
            }
        })
        setIsLike(true)
        axios.post('/api/post/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            setLikes(res.data)
        })
    }
    
    const ClickDisLike =() => {
        dispatch({
            type:"LIKE_UPDATE",
            payload:{
                board_id:props.board.id
            }
        })
        setIsLike(false)
        axios.post('/api/delete/like',{
            user_id:user.id,
            board_id:props.board.id
        }).then(res=>{
            setLikes(res.data)
        })
    }

    const handleModalClose = () => {
        setOpenModal(false)
    }

    const submitMemo = (titlefieldvalue) => {
        axios.post("/api/storememo",{
            content_text:props.board.content_text,
            memo_title : titlefieldvalue,
            user_id : user.id,
            post_memo_id : props.board.id,
            memo_type : 'SNS'
        })
        // post_memo_id를 보낸게 MemoController에서 게시글에 딸린 이미지를 저장할 수 있게 해준다. 
        .then((res)=>{
            console.log(res);
            dispatch({
                type: 'ADD_MEMO',
                payload: { memo: res.data },
              })
        })
        .catch((err)=>{
            console.log(err);
        })
        setTitleFieldValue("")
        handleModalClose();
    }

    useEffect(()=>{
        if(likeId == props.board.id){
            axios.get('/api/show/like/'+props.board.id)
            .then(res=>{
                console.log(res.data)
                setLikes(res.data)
            })
        }
    },[likeUpdate])

    useEffect(()=>{
        setIsLike(false)
        likes.forEach(like=>{
            if(user.id == like.user_id)
            {
                setIsLike(true)
            }
        })
    },[likes])

    useEffect(()=>{
        console.log("imageList:",imageList)
    },[imageList])
       

    useEffect(()=>{
        if(likeId == props.board.id){
            axios.get('/api/show/like/'+props.board.id)
            .then(res=>{
                console.log(res.data)
                setLikes(res.data)
            })
        }
    },[likeUpdate])

    useEffect(()=>{
        setIsLike(false)
        likes.forEach(like=>{
            if(user.id == like.user_id)
            {
                setIsLike(true)
            }
        })
    },[likes])

    // 통합 데이터 받기
    useEffect(() => {
        let check = 0 
        setImageList([])
        // setImageList가 먼저 되느냐 setImageList가 먼저되느냐 문제다.
        if(check == 0){
            axios.get('/api/upload_image/'+props.board.id)
            .then(function(res){
                console.log(res.data);
                // 이미지와 댓글을 모두 받는다
                check = 1
                if(res.data.images.length == 0)
                    setImageList("No Data")
                else{
                    for(let i = 0 ; i<res.data.images.length ; i++){
                        setImageList((imageList)=>[...imageList,res.data.images[i].url])
                    }
                }
                setSampleComment(res.data.comments)
                setCommentLength(res.data.comment_length)
                setLikes(res.data.likes)
            })
            .catch(function(error){
                console.log(error);
            })
        }
    },[props.board])

  

    const showComments = () => {
        setShowComment(!showComment);
    }
// 댓글도 가져오니까 렌더링 시켜줘야 된다.


    const moreComments = (boardId) => {
        axios.get('/api/all_comments/'+boardId)
        .then((res)=>{
            setSampleComment(res.data)
            setMore(true)
        })
        .catch((err)=>{
            console.log(err)
        })        
    }

    const commentsFold  = () => {
        setMore(false)
        console.log(sampleComment)
        sampleComment.splice(3,sampleComment.length)
    }

    const openEditModal = (open) => {
        setEditModalOpen(open)
    }




    return (  
        <div className ="w-full mx-auto max-w-3xl px-3 mb-5" >
            <div>
                <div className="bg-white w-full rounded-2xl shadow-md mt-2">
                    <div className="w-full h-16 ml-2 flex items-center flex justify-between ">
                        <div className='w-full flex justify-between mt-10 py-1 px-4 mr-4 rounded-lg  border-2 border-gray-300'> 
                            <div className="flex">
                                <Avatar className='mr-3 mt-1'><img src={(user.profile) ? (user.profile) : "https://www.taggers.io/common/img/default_profile.png"} alt=""/></Avatar> 
                                <div>       
                                <h3 className="font-bold text-md">{user.name}</h3>
                                    <p className='text-sm text-gray-500'><Moment format='YYYY/MM/DD'>{props.board.updated_at}</Moment> </p>
                                </div>
                            </div>
                            {/* 메뉴바 */}
                            <div>

        <Modal
        open={openModal}
        onClose={handleModalClose}
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

      <MyPostEditModal showBoardByEdit={showBoardByEdit} editModalOpen={editModalOpen} openEditModal={openEditModal} memoContentText={props.board.content_text}
        postId={props.board.id}       
        />

                                <Button
                                    id="basic-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    설정
                                </Button>
                                <Menu
                                    id="basic-menu"
                                    anchorEl={anchorEl}
                                    open={open}
                                    onClose={handleClose}
                                    MenuListProps={{
                                    'aria-labelledby': 'basic-button',
                                    }}
                                >
                                    {option.map((option)=>{
                                        return(
                                            <MenuItem onClick={handleClose}>{option}</MenuItem>
                                        )
                                    })}
                                    
                                </Menu>
                            </div>

                        </div>
                    </div>
                    <div className='w-full mt-10'>
                        <div className='w-full mx-auto xl:px-16 px-10'>
                            {/* 게시글 사진및 본문내용 */}
                            {
                            ((props.board.content_text !== '' && imageList ==='No Data') || (props.board.content_text === '' && imageList.length >= 1) || (props.board.content_text !== '' && imageList.length >=1))
                            ?
                            <>
                            <p className='font-bold'>{props.board.content_text}</p>
                            <p className="bg-gray-200">{translated}</p>
                            {imageList == ''
                                ?<Skeleton variant="rectangular" width={550} height={550} />
                                :imageList != 'No Data'
                                    ?<div className='mt-3'><BoardImages imageList={imageList}/></div>   
                                    :<div></div>
                            }
                            </>
                            :
                            <div className='flex justify-center m-10'>
                                <CircularProgress/>
                            </div>
                            }
                        </div>  
                        {/* Down */}
                        <div className='mx-auto px-10 mt-5' >    
                            <div className='pb-4'>
                                <div className='flex'>
                                    <div className='w-1/3 grid grid-cols-2'> 
                                        {isLike
                                            ?<Button color="error" onClick={ClickDisLike}>
                                                <SvgIcon color='error'  className='mx-auto' component={FavoriteIcon} fontSize="large"/> 
                                                <UseAnimations size={24} animation={heart}/> 
                                                <p>{likes ? likes.length+likeCount : 0 + likeCount }</p></Button>

                                            :<Button color='error' onClick={ClickLike}>
                                                <SvgIcon color='action' className='mx-auto' component={FavoriteBorderIcon} fontSize="large">
                                                    </SvgIcon><p>{likes ? likes.length+likeCount : 0 + likeCount }</p></Button>
                                        }    
                                        
                                            {(sideBoard.id === props.board.id && isOpen === true
                                                ?<Button variant='contained' disabled><SvgIcon color='action' className='mx-auto' component={ChatIcon} fontSize="large"></SvgIcon></Button>
                                                :<Button onClick={BoardToSideData} ><SvgIcon color='action' className='mx-auto' component={ChatBubbleOutlineOutlinedIcon} fontSize="large"></SvgIcon></Button>
                                            )}
                                       

                                    </div>
                                    <div className='w-2/3 text-right'>
                                        <button onClick={showComments} className='comment_effect inline-block text-md text-gray-500'>
                                        댓글{commentLength}개
                                        </button>
                                        <Button>
                                                <SvgIcon color='action' className='mx-auto' component={ShareIcon} fontSize="large"/>
                                        </Button>
                                    </div>
                                </div>
                              
                                <div className='px-12 mt-5  break-words'>
                                    {(sampleComment.length > 0) && (showComment) 
                                        ? <div>
                                            {sampleComment.map((sample)=>{
                                                return(
                                                   
                                                    <div className='text-md text-gray-500'>
                                                        {sample.user_name +" : "+sample.comment}
                                                    </div>
                                                )
                                             })}
                                             {(more) ?
                                             <div className='flex justify-center'>
                                            <button onClick={commentsFold} className='comment_effect inline-block text-md text-gray-500'>
                                                접기
                                            </button>
                                            </div>
                                             :
                                                   <div className='flex justify-center'>
                                                   <button 
                                                    onClick={() => {moreComments(sampleComment[0].freeboard_id)}}
                                                    className='comment_effect mt-5 text-md text-gray-500'>
                                                    댓글{commentLength-3}개 더보기
                                                    </button>
                                                   </div>
                                                   }
                                        </div>
                                        :null
                                    }
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

export default MyPostBoardCard;

