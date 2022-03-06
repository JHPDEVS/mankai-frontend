import React from "react";
import Moment from 'moment';
import { Avatar } from "@mui/material";
import { indigo } from "@mui/material/colors";

export default function ChatMemo(){

  return(
    <div className="border-b rounded-xl p-2 m-2 h-full">
         
         
         <div className="relative ">
            <span class="absolute bottom-0 right-2">
              {/* <Moment format="H:mm" local>
                
              </Moment> */}
            </span>
          </div>
         
         <div className="flex p-1 mr-2 justify-end">
         <div className="text-left mr-2 py-3 px-4 bg-indigo-100  border-b rounded-xl border max-w-[50%]">
            <span className="break-all break-word">내가적은 메세지 내용</span>
          </div>
         </div>
         


          

          <div className="flex max-w-[50%]">
            
          <Avatar
                style={{
                  backgroundColor: indigo[300],
                }}
            >
                {/* {message.user.name.substring(0, 1)} */}
            </Avatar>
            

            <div className="flex flex-col text-left ml-2">
            
              <div className="ml-2 ">
            
                <span> 
                    유저이름
                </span>
            
              </div>
            
              <div className=" py-3 px-4 bg-white  border-b rounded-xl border">
                <span className="break-all break-word">
                    메세지 내용
                </span>
              </div>
            </div>

            <span class="flex items-end ml-1">
              {/* <Moment format="H:mm" local>
                
              </Moment> */}
            </span>
          </div>


    </div>
  )
    
}

