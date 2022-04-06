import { Button } from '@mui/material';
import { useState,useEffect } from "react";
import axios from 'axios'
import { BiPaperPlane } from "react-icons/bi";
import { BsThreeDots } from "react-icons/bs";
import { useSelector,useDispatch } from 'react-redux';
import { Skeleton,Avatar,Typography,Box } from '@mui/material';


export default function YouFollowing() {

  const dispatch = useDispatch()

  const follow = useSelector(state=> state.Reducers.followId);

  const followerFollowing = useSelector(state=>state.Reducers.followerFollowing);
  
// follow.id를 getFollows라는 메소드에다가 요청하는 파라미터로 쓰고 가져온 데이터를 follows라는 state에 저장한다.

    useEffect(()=>{
        axios.get('/api/followings/'+follow.id)
        .then((res)=>{
            console.log("follower의 following:",res.data)
            dispatch({
              type:"SET_FOLLOWERFOLLOWING",
              payload:{followerFollowing:res.data}
            });
          })
        .catch((err)=>{
            console.log(err)
        })
    },[follow])

  return (
    
        
     <div>
        { (followerFollowing) ?
           followerFollowing.map((follow)=>(
          <div key={follow.id} className='border border-gray-300 rounded py-2 px-4 my-3'>
            <img  alt="" className="rounded-full border border-gray-100 w-12 h-12 inline-block" src={ 
              (follow.profile) ? (follow.profile)
              :"https://www.taggers.io/common/img/default_profile.png"} />
            
            <Button href={"/youpage/"+follow.id}>{follow.name}</Button>
            <BsThreeDots className='float-right my-4 mx-4'/>
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
        // 추가로 myFollow는 삭제버튼 만들어야 된다.

