import { useRef, useEffect, useState } from "react";
import suneditor from "suneditor";
import SunEditor from 'suneditor-react';
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import {useDispatch} from 'react-redux'
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { getThemeProps } from "@mui/system";


function BoardMemoEditor ({content,memoId,memoTitle,modalClose}){
    let editor = useRef(null)
    let txtArea = useRef();

    const dispatch = useDispatch();

    const PostUpload = (e) =>{
        console.log("editor.current.getContents():",editor.current.getContents())
        axios.post('/api/updatememo',{
          content_text : editor.current.getContents(),
          memo_id : memoId,
          memo_title : memoTitle
        })
        .then((res)=>{
          modalClose();
          dispatch({
            type: 'UPDATE_MEMO',
              payload: { content_text:editor.current.getContents(), memo_title:memoTitle, memo_id:memoId },
            })
        })
        .catch((err)=>{
          console.log(err)
        })
    } 
    const imageHandle = (e) =>{
      console.log(e)
    }
    useEffect(() => {
        editor.current = suneditor.create(txtArea.current, {
          plugins: plugins, 
          width: "100%",
          height: "100%",
          minHeight: "550px",
          buttonList: [
          //   Default
            ["undo", "redo"],
            ["font", "fontSize", "formatBlock"],
            ["paragraphStyle", "blockquote"],
            ["bold", "underline", "italic", "strike", "subscript", "superscript"],
            ["fontColor", "hiliteColor", "textStyle"],
            ["removeFormat"],
            ["outdent", "indent"],
            ["align", "horizontalRule", "list", "lineHeight"],
            ["table", "link", "image", "video", "audio"],
            ["imageGallery"],
          ],
          historyStackDelayTime: 100,
          attributesWhitelist: {
            all: "style"
          },
          // imageUploadHeader:{
          //   "x-csrf-token":csrf_token
          // }
          // ,
          // imageUploadUrl:"http://localhost:8000/api/post/introimage"
        })
       
      }, [])

    return(
        <div>
            
            <textarea ref={txtArea} defaultValue={content}/>
            <div className="flex justify-center">
            <button className="mt-3" onClick={PostUpload}><EditTwoToneIcon sx={{ mb:0.8, width:50  }}/>수정하기</button>
            </div>
        </div>
    )
}export default BoardMemoEditor