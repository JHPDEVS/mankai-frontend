import { Button } from '@mui/material';
import { useState } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { Skeleton,Avatar,Typography,Box } from '@mui/material';
import * as React from 'react'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import axios from 'axios';


export default function MyFollowing() {

  const followings = useSelector(state=> state.Reducers.followings);

  const user = useSelector(state=> state.Reducers.user);

  const [followId,setFollowId] = useState("");



  const dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const handleClick = (followId,event) => {
    setAnchorEl(event.currentTarget);
    setFollowId(followId);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const noFollow = () => {
    axios.post('/api/user/follow',{
      user_id : followId,
      to_user_id : user.id,
    })
    .then((res)=>{
      console.log(res)
      dispatch({
        type:"DELETE_FOLLOWINGS",
        payload: followId
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  return (
    
        
     <div>
        { (followings) ?
           followings.map((follow)=>(
          <div key={follow.id} className='border border-gray-300 rounded py-2 px-4 my-3'>
            <img  alt="" className="rounded-full border border-gray-100 w-12 h-12 inline-block" src={ 
              (follow.profile) ? (follow.profile)
              :"https://www.taggers.io/common/img/default_profile.png"} />
            
            <Button href={"/youpage/"+follow.id}>{follow.name}
            </Button>

            <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=>{handleClose(); noFollow(follow.id); }}>팔로우취소</MenuItem>
      </Menu>
      {/* menuItem은 반복되는 애가 아니라서 follow.id는 항상 마지막 follow의 id이다. 어떻게 할 것인가.. */}

            
            <BsThreeDots
            id="demo-positioned-button"
            aria-controls={open ? 'demo-positioned-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={(e) => {handleClick(follow.id,e)}}
            className='float-right my-4 mx-4'/>

            
            <BiPaperPlane className='float-right my-4'/>
          </div>
        )) 
            : 
            <div>
              {/* 나중에 반복문으로 처리 */}
              <> 
<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:1}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.7%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>

<Box width="100%" sx={{ display: 'flex', alignItems: 'center', mt:2}}>
<Skeleton variant="rectangular" style={{ borderRadius: 4, }} width="100%">
          <div style={{ paddingTop: '5.5%'}} />
        </Skeleton>
</Box>


            </>
            </div>
        }
      </div>
       
        
  )
        };

