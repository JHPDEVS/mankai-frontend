import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux"
import {Skeleton} from '@mui/material'
import axios from 'axios'
import Sidebar from "../../admin/layout/Sidebar"
import Header from "../../admin/layout/Header"
import { Redirect } from "react-router-dom"

import YouUser from './/YouUser';
import YouContents from './YouContents'

function YouPage({match}) {

    const dispatch = useDispatch();

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const user = useSelector(state => state.Reducers.user);
    const [followId,setFollowId] = useState("");

    // useEffect(() => {
        
    // },[match.params.follow_id])

    useEffect(()=>{
        setFollowId(match.params.follow_id)
        axios.get('/api/follow/'+match.params.follow_id)
        // match.params.follow_id의 user정보를 준다.
    .then((res)=>{
        dispatch({
            type:'SET_FOLLOWID',
            payload:{followId: res.data}
            // 해당 팔로워에 대한 전체정보를 followId에 넣는거임
        })
    })
    .catch((err)=>{
        console.log(err)
    })
    },[])
//  상대페이지를 클릭할 시에 상대의 user정보를 state에 넣는다.


    // match.params.follow_Id != users.id인경우에만 보여져야하는 페이지
    return (
        <>
       {
      (user !== null) ?
        (Number(followId) !== user.id) ?        
        <div>
            {console.log(Number("followId:",followId))}
            {console.log("user.id:",user.id)}
            <div className="flex h-screen">
                <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="relative  flex-col flex-1">
                    {/*  Site header */}
                    <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
                <div className="w-full">
                        <div className="bg-gray-200 flex relative ">

                            {/* 화면에서 왼쪽 : 내 정보 간략히 보여주는 컴포넌트 */}
                            <div className="w-1/3 p-3">
                                <YouUser/>
                            </div>

                            {/* 화면에서 오른쪽 : 즐겨찾기, 게시물, 그룹, 메모장 */}
                            <div className="w-2/3">
                                <YouContents/>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div> :
        <Redirect to = "/mypage"/>
        : 
        null
        }
        </>
        // youPage/1와 같이 잘못된 접근을 할경우 MyPage로 리다이렉트한다. 
        // *1 --> 내 user.id

        
        /* 그리고 You Component들에게 아이디를 주어서 해당 유저들의 포스트, 그룹, 팔로우들을 가져와야 한다. 그러기 위해선 각 계정들에 들어가 업로드하고 팔로우하고(이건 디비에서) 그룹들을 가입해 두어야 할 것이다 */
        /* 그리고 계획같은 거 캡스톤 단톡에 공유 */
    )
}

export default YouPage;
