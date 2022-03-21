import React, { useState } from "react";
import Header from "../../admin/layout/Header";
import Sidebar from "../../admin/layout/Sidebar";
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link } from "@mui/material";
import {Button} from "@mui/material";
import GroupContents from './GroupContents';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


import GroupCommunity from './GroupCommunity';
import GroupIndex from './GroupIndex'
import GroupQnA from './GroupQnA'


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


function GroupPagein() {
    const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
          setValue(newValue);
        };

    return(
        <div>
            <div className="">
                <div class="h-full w-screen  dark:bg-gray-300   flex flex-wrap items-center  justify-center">
                    <div className="w-3/5 h-full m-auto bg-red-300 border-2 border-cyan-500">
                        <div class="w-full h-96  bg-white border-2 border-red-500 rounded-[20px] m-auto mt-2">
                            <div class="w-full h-96 flex flex-wrap justify-left">
                                <div class="w-full h-1/3 overflow-hidden border-2 border-lime-500 rounded-t-[20px]" >
                                    <img class="w-full" src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80" alt="" />
                                </div>

                                <div class="w-full h-2/3 border-2 border-yellow-500 flex justify-end">
                                    <div class="h-10 w-32 bg-gray-200 border-2 border-red-500 rounded-lg pl-3 mt-2 mr-2">
                                        <Button>
                                        <StarBorderIcon className="flex flex-wrap items-center justify-center"/>
                                        즐겨찾기
                                        </Button>
                                    </div>

                                    <div class="w-full h-14 border-2 border-red-500">
                                        <div className='w-full h-12 bg-white border-solid rounded-md items-center overflow-x-hidden'>
                                            <Tabs value={value} onChange={handleChange}>
                                            <Tab label="GroupIndex" {...a11yProps(0)} />
                                            <Tab label="GroupCommunity" {...a11yProps(1)} />
                                            <Tab label="GroupQnA" {...a11yProps(2)} />

                                            </Tabs>
                                        </div>        
                                    </div>
                                </div>
                            
                            </div>
                        </div>


                        <div class="w-full h- bg-white border-2 border-red-500 rounded-[20px] m-auto mt-3 mb-7">
                            <div className=' bg-white border-solid rounded-md ' id='scroll'>
                            <TabPanel value={value} index={0}>
                            <GroupIndex/>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                            <GroupCommunity/>
                            </TabPanel>
                            <TabPanel value={value} index={2}>
                            <GroupQnA/>
                            </TabPanel>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GroupPagein;