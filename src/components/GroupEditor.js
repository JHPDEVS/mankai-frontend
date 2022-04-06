import { useRef, useEffect, useState } from "react";
import suneditor from "suneditor";
import SunEditor from 'suneditor-react';
import plugins from "suneditor/src/plugins";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";

function GroupEditor ({group_intro,content,getContent}){
    let editor = useRef(null)
    let txtArea = useRef();
   
    const PostUpload = (e) =>{
        console.log(editor.current.getContents())
        getContent(editor.current.getContents())
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
            <textarea ref={txtArea} defaultValue={group_intro}/>
            <button onClick={PostUpload}>확인</button>
        </div>
    )
}export default GroupEditor