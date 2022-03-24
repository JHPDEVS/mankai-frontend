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
    const [groupBoard,setGroupBoard] = useState("")
    const [currentPage,setCurrentPage] = useState(1)
    const [lastPage,setLastPage] = useState(1)
    const [infHandle,setInfHandle] = useState(true)
    const dispatch = useDispatch();
    const boards = useSelector((state)=>state.Reducers.boardData); 

    const board_update = () => { 
        axios.get("/api/show/groupboard/"+props.group.id+"?page="+currentPage)
        .then(res=>{
            console.log(res.data)
            for(let i = 0 ; i<res.data.data.length;i++){
                setGroupBoard(groupBoard=>[...groupBoard,res.data.data[i]])    
            }
            if(res.data.last_page == currentPage)
                setInfHandle(false)
            else
            setCurrentPage(currentPage+1)
        })
    }
    useEffect(()=>{
        board_update()
    },[])

    return(
        <div className="bg-gray-200">
            {groupBoard.length > 0 
                ?<InfiniteScroll
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
                :<div className="bg-white rounded-t-xl text-center text-2xl pt-10">글이 없습니다. 글을 써주세요!</div>
            }
            <GroupBoardSide></GroupBoardSide>
            <GroupWriteModal group_id={props.group.id}></GroupWriteModal>
        </div>
    )
}export default GroupBoard