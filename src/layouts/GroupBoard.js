import axios from "axios"
import { useEffect, useState } from "react"
import GroupBoardSide from "./GroupBoardSide"
import GroupBoardCard from "./GroupBoardCard"
import GroupWriteModal from "./GroupWriteModal"
import InfiniteScroll from "react-infinite-scroll-component"
import { Skeleton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { BoardUpdate } from "../store/actions"
import UseAnimations from 'react-useanimations';
import loading from 'react-useanimations/lib/loading'

function GroupBoard(props){
    const [groupBoard,setGroupBoard] = useState([])
    const [infHandle,setInfHandle] = useState(false)
    const dispatch = useDispatch();
    const [currentPage,setCurrentPage] = useState(1)
    const [callUpdate,setcallUpdate] = useState(1)
    const board_update = () => { 
        axios.post("/api/show/groupboard/"+props.group.id+"?page="+currentPage,{
            category:props.category_id            
        })
        .then(res=>{
            if(infHandle === true){
                for(let i = 0 ; i<res.data.data.length;i++){
                    setGroupBoard(groupBoard=>[...groupBoard,res.data.data[i]])    
                }
                console.log(res.data)
                if(res.data.to === null){
                    setGroupBoard("No Data");
                    console.log("빈페이지")
                }
                    
                if(res.data.last_page == currentPage){
                    setInfHandle(false) 
                }
                else{
                    setCurrentPage(currentPage+1)
                }
            }
        })
    }
    const board_clean = () =>{
        setCurrentPage(1)
        if(infHandle == false)
        setInfHandle(true)
        setGroupBoard("")
    }
    const GetUpdate = ()=>{
        board_clean()
        setcallUpdate(callUpdate+1)
    }

    useEffect(()=>{
        console.log("clean")
        board_clean()
        setcallUpdate(callUpdate+1)
    },[props.category_id])

    useEffect(()=>{
        if(callUpdate!=1)
        board_update()
    },[callUpdate])

    return(
        <div className="bg-gray-200">
            {/* 보드 데이터 1개이상 */}
            {groupBoard.length > 0 
                ?<div>
                    {/* 빈값이면 출력 */}
                    {groupBoard == "No Data"
                    ?<div className="bg-white text-center font-bold text-xl pt-20 rounded-t-xl">작성된 글이 없습니다 작성해 주세요</div>
                    // 값있으면 표시
                    :<InfiniteScroll
                    dataLength={groupBoard.length} //This is important field to render the next data
                    next={board_update}
                    hasMore={infHandle}
                    scrollableTarget="scrollableDiv"
                    loader={
                        <div className='w-full flex justify-center'>
                            <UseAnimations 
                                size={48}
                                animation={loading} 
                            />
                        </div>
                    }
                        endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b className='my-10'>더이상 글이 없습니다.. 글을 써주세요</b>
                        </p>
                        }
                    >
                    {groupBoard.map(data=>{
                        return(
                            <GroupBoardCard board={data} key={data.id}></GroupBoardCard> 
                        )
                    })}
                </InfiniteScroll>
                }
                </div>
                // 로딩 애니메이션
                :<div className="bg-white rounded-t-xl text-center text-2xl pt-10">
                    <div className="w-fit mx-auto">
                        <UseAnimations animation={loading} size={100}></UseAnimations>
                    </div>
                </div>
            }
            <GroupBoardSide></GroupBoardSide>
            <GroupWriteModal GetUpdate={()=>GetUpdate()} category_id={props.category_id} group_id={props.group.id}></GroupWriteModal>
        </div>
    )
}export default GroupBoard