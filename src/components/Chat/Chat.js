import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Sidebar from '../../admin/layout/Sidebar'
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import ChatContainer from './ChatContainer';
import i18n from 'i18next'
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTranslation } from "react-i18next";
import * as React from 'react';
import ChatInviteModal from './ChatInviteModal';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton } from '@mui/material';
import Header from '../../admin/layout/Header';
import Echo from 'laravel-echo';
import {getRooms} from '../../store/modules/getRoom'
import { CircularProgress } from '@mui/material';
function Chat() {
    const [index, setIndex] = useState(0);
    const currentUser = useSelector(state => state.Reducers.user)
    const state = useSelector(state => state.Reducers.user)
    const rooms = useSelector(state => state.Reducers.rooms)
    const loading = useSelector(state => state.Reducers.room_pending)
    const [currentRoom, setCurrentRoom] = useState({});
    const [currentChatRoom, setCurrentChatRoom] = useState({});
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const { t }  = useTranslation(['lang']);
    const [following, setFollowing] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const open1 = Boolean(anchorEl);
    const dispatch = useDispatch();
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e) => {
        e.preventDefault();
        setAnchorEl(null);
        setOpen(false);
  };

    function newRoomList(newRoom) {
      //  setRooms([...rooms, newRoom]);
    }
    
   
    useEffect(()=> {
        console.log(currentUser);
        if(currentUser){
            // console.log(currentUser.Reducers.user.following);
            dispatch(getRooms(currentUser.id))
            setFollowing(currentUser.following)
            // console.log(following);
        }
    },[currentUser]);

    useEffect(() => {

     
        console.log(rooms);
    },[rooms, currentRoom]);

        

    const userName = (types,users) => {
        users = JSON.parse(users);
        // console.log((users));
        users = users.filter((user, index) => user.user_name !== currentUser.name);
        if(types === "dm"){
            return users[0].user_name;
        }else {
            var userNames = '';
            users = users.map((user, index) => ((index !== users.length-1) ? userNames += (user.user_name + ',') : userNames += user.user_name ));
            return userNames;
        }
        
    }   
    const deleteRoom = (e) => {
        e.preventDefault();
        // setRooms(rooms.filter(room => room.id !== currentRoom.id));
        // console.log(currentRoom);
        // console.log(currentUser.Reducers.user);
        handleClose(e);
        axios.post('http://localhost:8000/api/room/check', {"room" : currentRoom, "user_id" : currentUser.Reducers.user.id})
        .then(res => {
            console.log(res.data);
            
        })
    }
    const selectRoom = (e, room) => {  //room setting room
        e.preventDefault();
        console.log(room);
        setCurrentRoom(room);
    }
    const selectChatRoom = (e, room) => {  //chatting room choose
        e.preventDefault();
        console.log(room);
        setCurrentChatRoom(room);
    }
    const deleteChatRoom = (e) => {
        e.preventDefault();
        console.log(11);
        setCurrentChatRoom({});
    }
    const roomList  = (types) => <ul className='w-full h-full'>
                                    {rooms ? rooms.map((room, index) => (
                                        
                                        <li 
                                        className={room.type === types ?'room border-b flex w-full p-2 hover:bg-gray-100' : 'hidden'}
                                        id={'room'+index}
                                        onClick={(e) => {selectChatRoom(e, room)}}
                                        key={room.id}>
                                            <img src="#" className="room" />
                                            <div className="room flex w-full justify-between ml-2">
                                                <div className='room truncate flex flex-col text-left'>
                                                <div>{room.type ===types  ? (room.title ? room.title : userName(types, room.users)):''} <span className='font-medium'>{types==='group' ? JSON.parse(room.users).length : ''}</span></div>
                                                <span className="room text-xs ">안녕하세요 안녕하세요</span>
                                                </div>
                                                <IconButton aria-controls={open1 ? 'basic-menu' : undefined}
                                                            aria-haspopup="true"
                                                            aria-expanded={open1 ? 'true' : undefined}
                                                            onClick={(e) => {handleClick(e); selectRoom(e, room)}}  aria-label="more-vert" size="small" >
                                                    <MoreVertIcon /> 
                                                </IconButton>
                                                <Menu
                                                anchorOrigin={{
                                                    vertical: 'bottom',
                                                    horizontal: 'right',
                                                  }}
                                                  keepMounted
                                                  transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                  }}
                                                id="basic-menu"
                                                anchorEl={anchorEl}
                                                open={open1}
                                                onClose={handleClose}
                                                MenuListProps={{
                                                'aria-labelledby': 'basic-button',
                                                }}
                                            >
                                                {/* <MenuItem onClick={(e) => {handleClose(e); deleteRoom(room); }}>{t("lang:DELETE")}</MenuItem> */}
                                                <MenuItem onClick={deleteRoom} >{t("lang:DELETE")}</MenuItem>
                                                <MenuItem onClick={handleClose} >My account</MenuItem>
                                                <MenuItem onClick={handleClose}>Logout</MenuItem>
                                            </Menu>
                                            </div>
                                        </li>
                                    ))
                                    : null}
                                </ul>
    return (
        <>
        <div className="flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div className="w-full h-screen">
                <div className="h-[90vh] bg-blue-100 rounded-3xl flex relative">
                    <div className="sm:flex sm:flex-col w-full sm:w-1/4 md:w-1/4 min-h-full border rounded-3xl bg-white sm:mr-5 p-3 text-gray-800 relative items-center text-center">
                        <div className='w-full sm:flex sm:justify-between m-2'>
                            <span>{t("lang:MESSAGE")}</span>
                            <button onClick={handleOpen} className='border rounded-3xl p-2 hidden sm:block'>{t("lang:CREATE")}</button>
                        </div>
                        <div className='w-full h-full relative'>
                            <Tabs className="w-full" selectedIndex={index} onSelect={index => setIndex(index)}>
                                <TabList className="flex sm:flex bg-gray-100">
                                <Tab className={index === 0 ? 'w-1/2 p-2 border-b-4' : 'w-1/2 p-2'}>
                                    <span>{t("lang:DM")}</span>
                                </Tab>
                                <Tab className={index === 1 ? 'w-1/2 p-2 border-b-4' : 'w-1/2 p-2'}>
                                    <span>{t("lang:GROUP")}</span>
                                </Tab>
                                </TabList>
                                <TabPanel className="w-full">
                                {loading && (
               <CircularProgress
                 size={48}
                 sx={{
                   position: 'absolute',
                   top: '50%',
                   left: '50%',
                   marginTop: '-24px',
                   marginLeft: '-24px',
                 }}
               />
             )}
                                <div>{roomList('dm')}</div>
                                </TabPanel>
                                <TabPanel>
                                <div>{roomList('group')}</div>
                                </TabPanel>
                            </Tabs>
                            
                        </div>
                    </div>
                    <div className='flex w-3/4 min-h-full rounded-3xl sm:flex-col p-5 lg:p-10 hidden mx-5 my-2 text-gray-800 relative sm:flex items-center text-center bg-white sm:block'>
                        <ChatContainer room={currentChatRoom} user={currentUser} deleteChatRoom={deleteChatRoom} className="bg-blue-100 h-full" /> 
                        
                    </div>
                </div>
                
                </div>
                <ChatInviteModal following={following} open={open} user={currentUser} newRoomList={newRoomList} handleClose={handleClose} />
            </div>
        </div>
    </>
    );
}export default Chat;