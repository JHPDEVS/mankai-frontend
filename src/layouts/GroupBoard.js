import axios from "axios"
import { useEffect, useState } from "react"
import GroupBoardSide from "./GroupBoardSide"
import GroupBoardCard from "./GroupBoardCard"
import GroupWriteModal from "./GroupWriteModal"
import InfiniteScroll from "react-infinite-scroll-component"
import { Skeleton } from "@mui/material"
import { useDispatch, useSelector } from "react-redux"
import { BoardUpdate } from "../store/actions"



function GroupBoard(props){
    const [groupBoard,setGroupBoard] = useState("")
    const dispatch = useDispatch();
    const boards = useSelector((state)=>state.Reducers.boardData); 
    

    const board_update = () => { 
        axios.get("/api/show/groupboard/"+props.group.id)
        .then(res=>{
            for(let i = 0 ; i<res.data.length;i++){
                console.log(res.data[i])
                setGroupBoard(groupBoard=>[...groupBoard,res.data[i]])    
                // array.push(res.data.data[i].id);
            }
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
                    hasMore={true}
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
                    {groupBoard.map(data=>{
                        return(
                            <GroupBoardCard board={data} key={data.id}></GroupBoardCard> 
                        )
                    })}
                </InfiniteScroll>
                :<div></div>
            }
            
            
            <GroupBoardSide></GroupBoardSide>
            <GroupWriteModal group_id={props.group.id}></GroupWriteModal>
        </div>
    )
}export default GroupBoard