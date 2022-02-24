import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Message from "./Message";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import {getMessage} from '../../store/modules/getMessage'
import { useDispatch, useSelector } from "react-redux";
function ChatContainer(props) {
    const messages = useSelector(state=>state.Reducers.message);
    const [newMessage, setNewMessage] = useState();
    const chatBody = useRef(null);
    const dispatch = useDispatch();
    const scrollChatToBottom = (chatBody) => chatBody.current.scrollTop = chatBody.current.scrollHeight

 

    const sendMessage = (e) => {
        e.preventDefault();
        // console.log(newMessage);
        if (newMessage === '') {
            // console.log(this.$refs);
            // if(this.$refs.file){
            //     const formData = new FormData();
            //     formData.append('room_id', this.currentRoom);
            //     if(this.$refs.file.files.length > 1){
            //         for(let i = 0; i <this.$refs.file.files.length; i++ ){
            //             formData.append('file[]', this.$refs.file.files[i]);
            //         }
            //     }else{
            //         formData.append('file', this.$refs.file.files[0]);
            //     }

            //     axios.post('/chat/send', formData, {headers: {'Content-Type': 'multipart/from-data'}}).then(response => {
            //         console.log(1);
            //         this.fetchMessages(this.currentRoom, this.currentToUser);
            //     });
            //     this.newMessage = '',
            // }else {
            //     return;
            // }
            return ;

        } else {
            
            // setMessages([...messages, {"message": newMessage, "user" : props.user.Reducers.user}]);
            axios.post('/api/message/send', {'message' : newMessage, 'room_id' : props.room.id, 'user_id' :props.user.id })
            .then(res => {
            });
            setNewMessage('');
        }
        
    }
    useEffect(() => {
        console.log(props.room);
        console.log("chat 컨테이너");
        if(props.room.id && props.user.id) {
            dispatch(getMessage(props.room.id));
            console.log(props.room.id)
        }
    }, [props.room, props.user]);

    useEffect(() => {
        // console.log(messages);
        window.Echo.channel('chat').listen('.send-message', (e) => {
            dispatch({type: 'ADD_MESSAGE',payload:{message:e.message}});
            // setMessages(messages => ([...messages, e.message]));
            scrollChatToBottom(chatBody)
          }) 
   
    },[]);
    
    return (
        <div className="w-full h-full">
            {props.room.id ? <div className="border w-full h-full">  
                <IconButton onClick={(e) => {props.deleteChatRoom(e); }}><CloseIcon /></IconButton>
                <div className="w-full flex flex-col h-full">
                    <div ref={chatBody} className=" flex flex-col w-full h-full overflow-y-auto">
                    {messages ? messages.map((message, index) => (
                        <Message message={message} user={props.user} key={index} />
                    )) : null}
                    </div>
                    <div className='border p-2 w-full flex'>
                        <form className="flex w-full" onSubmit={sendMessage}>
                            <input className="w-full border" value={newMessage || ''} onChange={(e) => setNewMessage(e.target.value)} type="text" />
                            <button className="border p-3 ">전송</button>
                        </form>
                    </div>
                </div>
            </div> : <div className="bg-blue-100 h-full shadow-xl">메세지를 보내보세요</div>}
        </div>
    );
}export default ChatContainer;