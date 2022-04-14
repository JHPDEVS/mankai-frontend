import React, { useEffect} from "react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import axios from 'axios'


import MyFollow from './MyFollow';
import MyFollowing from './MyFollowing'
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  return (
    <div className='h-[calc(100vh-110px)] ' >
      <div className='bg-white border-solid rounded-md items-center my-10 overflow-x-hidden'>
        <Tabs value={value} onChange={handleChange}>

          <Tab label="Followers" {...a11yProps(0)} />
          <Tab label="Followings" {...a11yProps(1)} />
          <Tab label="MyPosts" {...a11yProps(2)} />
          <Tab label="MyGroups" {...a11yProps(3)} />
          <Tab label="MyMemos"  {...a11yProps(4)} />


        </Tabs>
      </div>        


      <div className=' bg-white border-solid rounded-md ' id='scroll'>
        <TabPanel value={value} index={0}>
          <MyFollow/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <MyFollowing/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <MyPost/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <MyGroups/>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <MyMemo/>
        </TabPanel>
      </div>
    </div>
  );
}