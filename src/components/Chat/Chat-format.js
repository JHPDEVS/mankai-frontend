import axios from 'axios';
import { useEffect, useState } from 'react';
import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar'
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ServerStyleSheets } from '@mui/styles';
import { display } from '@mui/system';

function Chat() {
    const [rooms, setRooms] = useState([]);
    const currentUser = useSelector((state) => state);
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    const handleChangeIndex = (index) => {
      setValue(index);
    };
    function getRooms(id) {
        axios.get('http://localhost:8000/api/rooms/'+id)
        .then(res => {
            setRooms(res.data);
        });
    }
    useEffect(()=> {
        if(currentUser.Reducers.user){
            getRooms(currentUser.Reducers.user.id);
            // console.log(user);
        }
    },[currentUser]);

    useEffect(() => {
        console.log(rooms);
    },[rooms]);
    const userName = (types,users) => {
        users = JSON.parse(users);
        users = users.filter((user, index) => user.user_name !== currentUser.Reducers.user.name);
        console.log(users);
        if(types === "dm"){
            return users[0].user_name;
        }else {
            console.log(users.length);
            var userNames = '';
            users = users.map((user, index) => ((index !== users.length-1) ? userNames += (user.user_name + ',') : userNames += user.user_name ));
            console.log(userNames);
            return userNames;
        }
        
    }   
    const roomList  = (types) => <ul className='w-full h-full'>
                                {rooms.map((room, index) => (
                                <li onContextMenu={(e) => showContextMenu(e, room)} className={room.type === types ?'room border-b p-2 hover:bg-gray-100' : 'hidden'} key={index}>{room.type ===types ? (room.title ? room.title : userName(types, room.users)):''}</li>))}
                                </ul>
    
    const roomsSetMenu = <ul style={{ display : 'none' }} id="room-set-menu" className="absolute list-unstyle bg-white border">
                            <li className="border hover:bg-red-500">복사</li>
                            <li className="border hover:bg-red-500">update</li>
                            <li className="border hover:bg-red-500">삭제</li>
                        </ul>
    
    const showContextMenu = (e, room) => {
        // console.log(1);
        console.log(room);
        if (e.target.className.startsWith("room")) {
            e.preventDefault();
            var menu = document.getElementById("room-set-menu");
            menu.style.left = e.pageX + 'px'  //퍼센트로 가능한지 찾아봐야됨
            menu.style.top = e.pageY + 'px'
            menu.style.display = 'block'
        } else {
            this.hideContextMenu();
        }
    }
    const hideContextMenu = () => {
        document.getElementById("room-set-menu").style.display = "none"
    }
    return (
        <>
        <Navbar/>
        <Sidebar/>
        <div className="w-full h-screen">
        <div className="mt-16 min-h-full bg-blue-100 rounded-3xl flex  relative">
            <div className="sm:flex sm:flex-col w-full sm:w-1/4 md:w-1/4 min-h-full border rounded-3xl bg-white sm:mr-5 text-gray-800 relative items-center text-center">
                <div className='w-full sm:flex sm:justify-between p-3'>
                    <span>메세지</span>
                    <button className='border rounded-3xl p-2 hidden sm:block'>create</button>
                </div>
                <div className='w-full h-full' onContextMenu={hideContextMenu}>
                    <Box sx={{ bgcolor: 'background.paper', width: '100%', height: '100%' }}>
                        <AppBar position="static">
                            <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="secondary"
                            textColor="inherit"
                            variant="fullWidth"
                            aria-label="full width tabs example"
                            >
                            <Tab label="dm" {...a11yProps(0)} />
                            <Tab label="group" {...a11yProps(1)} />
                            </Tabs>
                        </AppBar>
                        <SwipeableViews
                            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                            index={value}
                            onChangeIndex={handleChangeIndex}
                        >   
                            <TabPanel value={value} index={0} dir={theme.direction}>
                                {roomList('dm')}
                            </TabPanel>
                            <TabPanel value={value} index={1} dir={theme.direction}>
                                {roomList('group')}
                            </TabPanel>
                            <ul style={{ display : 'none' }} id="room-set-menu" className="absolute list-unstyle bg-white border">
                                <li className="border hover:bg-red-500">복사</li>
                                <li className="border hover:bg-red-500">update</li>
                                <li className="border hover:bg-red-500">삭제</li>
                            </ul>
                        </SwipeableViews>
                    </Box>
                </div>
            </div>
            <div className='flex w-3/4 rounded-3xl p-5 lg:p-10 hidden mx-5 my-2 text-gray-800 relative sm:flex items-center text-center bg-white sm:block'>
                dasfasfsfsf
            </div>
        </div>
        
        </div>
      
    </>
    );
}export default Chat;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 0 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}