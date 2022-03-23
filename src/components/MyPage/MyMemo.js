import { Button, Fab, getImageListItemBarUtilityClass, Link } from "@mui/material";
import axios from "axios";
import MyMemoWriteModal from '../../layouts/MyMemoWriteModal'
import MyMemoEditModal from '../../layouts/MyMemoEditModal'
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState, useRef} from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function MyMemo(props){

    const dispatch = useDispatch()
    
    const [memoContentText,setMemoContentText] = useState();
    const [editModalOpen,setEditModalOpen] = useState(false)
    const [memo_id,setMemoId] = useState("");
    const [memoTitle,setMemoTitle] = useState("");
    const memos = useSelector(state=> state.Reducers.memo);
    // 추가를 했을 때 reducers.js의 memo에 추가가 되지만 useSelector를 이용해 memo를 가져왔을 때 값이 바로 바뀌지 않는다.
    // 삭제도 마찬가지로 없어지지만 바로 렌더링이 되지 않는다.

    // 일단은 새로운 메모 저장으로 저장하고서 DB에 저장하고 dispatch에도 저장해야 한다. 





function editPage(memo){
    window.open("/my_memo_edit/"+memo.id, "bnhgn", "width=500,height=600")
}



const memoDelete = (memo_id,idx) => {
    dispatch({
        type: "DELETE_MEMO",
        payload: {memo_id},
      })
    axios.post('/api/deletememos/'+memo_id)
    .then((res)=>{
        console.log("삭제성공")
    })
    .catch((err)=>{
        console.log(err);
    })
}


const editMemo = (memo_id, memo_content_text,memo_title) => {
    setMemoContentText(memo_content_text);
    setMemoId(memo_id)
    setMemoTitle(memo_title);
}



const openEditModal = (opened) => {
    setEditModalOpen(opened);
}




    return( 
        <div>
<div class="flex items-center max-w-md mx-auto bg-gray-200 rounded-lg" >
        <div class="w-full">
        
            <input type="search" class=" w-full px-4 py-1 bg-gray-200 text-gray-800 rounded-full focus:outline-none"
                placeholder="search"/>
        </div>
        <div>
            <button type="submit" class="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
            </button>
        </div>
        
    </div>
        
    
    {
        memos.map((memo,idx)=>{
            return(
            <>
            {
                    // <div key={memo.id} className="postballoon">
                    // <div className="oneline">{memo.memo_title}</div>
                    // <br/>
                    // <span>
                    //     <Button onClick={() => {editMemo(memo.id,memo.content_text, memo.memo_title); openEditModal(true);}}>수정</Button>
                    //     <Button onClick={()=>{memoDelete(memo.id,idx)}}>삭제</Button></span>
                    // </div>

<div key={memo.id} className="relative inline-block py-3 ml-10 mt-7 w-1/5">
<div
   className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
</div>
<div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl">
   <div className="max-w-md mx-auto">
      <div>
         <h1 className="text-1xl font-semibold oneline">{memo.memo_title}</h1>
      </div>
      <div className="divide-y divide-gray-200">
         <div className=" text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
            
            <div className="relative">
               <button onClick={() => {editMemo(memo.id,memo.content_text, memo.memo_title); openEditModal(true);}} className=" rounded-md py-1"><EditIcon/></button>
        <button onClick={()=>{memoDelete(memo.id,idx)}} className=" rounded-md mx-3 py-1"><DeleteIcon/></button>
            </div>
         </div>
      </div>
   </div>
</div>
</div>

            }
            </>
            )
        })
    }
                    <MyMemoWriteModal/>

                    
                    <MyMemoEditModal editModalOpen={editModalOpen} memoTitle = {memoTitle} memoContentText={memoContentText} memo_id={memo_id} openEditModal={openEditModal}/>
                    {/* editMemoInit은 모달 닫을 때 모달에 있던 정보 초기화하는 useState */}
                    {/* editModalOpen이 true냐 아니냐에 따라 모달이 열리고 닫힌다 */}
                    {/* oepnEditModal은 자식에서 editModalOpen을 조정하기 위해서 부모에서 자식으로 메소드를 준 것이다. */}
                    {/* ??? 위치옮기기 */}
    </div>
    )
}

