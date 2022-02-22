import { useEffect, useState } from "react";
import axios from "axios";
import Message from "./Message";
import { IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
function ChatContainer(props) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState();

    // useEffect(() => {
    //     window.Echo = new Echo({
    //         broadcaster : 'pusher',
    //         key : 'da3bc2f433d9160a3164'
    //     });
    //     window.Echo.channel('chat').listen('MessageSent', (e) => {
    //         // setMessages([...messages, e]);
    //         console.log(e);
    //     })
    // });
    Pusher.logToConsole = true;
        var pusher = new Pusher('da3bc2f433d9160a3164', {
            cluster : 'ap3'
        });
    useEffect(() => {
        
        var channel = pusher.subscribe('chat');
        channel.bind('MessageSent', function(data) {
            console.log(data.data);
        })
    });


    const getMessages = (roomId) => {
                axios.get('http://localhost:8000/api/messages/'+roomId)
                .then(res => {
                    setMessages(res.data);
                    console.log(res.data);
                })
                .catch(err => {
                    console.log(err);
                })
    }

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
            
            setMessages([...messages, {"message": newMessage, "user" : props.user.Reducers.user}]);
            axios.post('http://localhost:8000/api/message/send', {'message' : newMessage, 'room_id' : props.room.id, 'user_id' :props.user.Reducers.user.id })
            .then(res => {
                console.log(res.data);
                // setMessages([...messages, res.data]);
            });
            setNewMessage('');
        }
        
    }
    useEffect(() => {
        console.log(props.room);
        if(props.room.id && props.user.Reducers.user.id) {
            getMessages(props.room.id);
        }
    }, [props.room, props.user]);

    useEffect(() => {
        console.log(messages);
        
    }, [messages]);
    
    return (
        <div className="w-full h-full">
            {props.room.id ? <div className="border w-full h-full">  
                <IconButton onClick={(e) => {props.deleteChatRoom(e); setMessages([]);}}><CloseIcon /></IconButton>
                <div className="w-full flex flex-col h-full">
                    <div className="chatBody flex flex-col w-full h-full overflow-y-auto">
                    {messages.map((message, index) => (
                        <Message message={message} user={props.user} key={index} />
                    ))}
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