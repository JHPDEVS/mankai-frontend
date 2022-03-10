import * as React from 'react';
import { BsThreeDots } from "react-icons/bs";

export default function PostModal(){
      
    return(

        <div>
             <div className='border border-gray-300 rounded py-2 px-4 my-3'>
                <img className="rounded-full border border-gray-100 w-12 h-12 inline-block" src="" alt="img" />
                <span className='px-3' ></span>
                <BsThreeDots className='float-right my-4 mx-4'/>    
            </div>

            {/* 게시글 */}

            {/* 댓글 */}

        </div>
    )
}