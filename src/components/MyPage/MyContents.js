import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import axios from 'axios'


import MyFollow from './MyFollow';
import MyPost from './MyPost';
import MyGroups from './MyGroups';
import MyMemo from './MyMemo';


function TabPanel(props) {
  const { children, value, index, ...other } = props;


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
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
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [myPosts, setMyPosts] = React.useState("");
  const [postMemo, setPostMemo] = React.useState("");
  const [messageMemo, setMessageMemo] = React.useState("");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const user = useSelector((state=>state.Reducers.user))


  
  const showMyPosts = () =>{
    axios.get('/api/myposts/'+user.id)
    .then((res)=>{
        setMyPosts(res.data);
        console.log({myPosts});
    })
    .catch((err)=>{
        console.log(err);
    })
  }
// myPosts->Read


  const showPostMemos = () =>{
    axios.get('/api/showmypostmemos/'+user.id)
    .then((res)=>{
        setPostMemo(res.data)
        console.log(postMemo);
    })
    .catch((err)=>{
        console.log(err);
    })
  }
// PostMemo->Read

  const showChatMemos = () => {
    axios.get('/api/showmymessagememos/'+user.id)
    .then((res)=>{
        setMessageMemo(res.data)
        console.log(messageMemo);
    })
    .catch((err)=>{
      console.log(err);
    })
  }

  
  return (
    <div className='' >
      <div className='bg-white border-solid rounded-md items-center mt-10 overflow-x-hidden'>
        <Tabs value={value} onChange={handleChange}>

          <Tab label="MyFollows" {...a11yProps(0)} />
          <Tab label="MyPosts" onClick={showMyPosts} {...a11yProps(1)} />
          <Tab label="MyGroups" {...a11yProps(2)} />
          <Tab label="MyMemos" onClick={ () => {showPostMemos();showChatMemos();}} {...a11yProps(3)} />


        </Tabs>
      </div>        

      <br/>

      <div className='h-80 p-3 bg-white border-solid rounded-md overflow-auto'>
        <TabPanel value={value} index={0}>
          <MyFollow/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyPost myPosts={myPosts}/>
          {/* myPosts의 갯수만큼 반복시켜야 한다. 게시판 게시글 반복 참고*/}
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyGroups/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MyMemo postMemo={postMemo} messageMemo={messageMemo}/>
        </TabPanel>
      </div>
    </div>
  );
}
