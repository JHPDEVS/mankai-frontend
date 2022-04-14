import React, {
  Component,
  Fragment,
  useCallback,
  useEffect,
  useState,
} from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'

import { Provider, useSelector, useDispatch, connect } from 'react-redux'
import { Button } from '@mui/material'

const drawerWidth = 400

function ChatSide(props) {
  const user = useSelector(state => state.Reducers.user)

  const anchorRef = React.useRef(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const isOpen = useSelector(state => state.Reducers.chat_side)
  const dispatch = useDispatch()

  const handleDrawerClose = () => {
    dispatch({ type: 'CHAT_SIDE_CLOSE' })
  }

  return (
    <Box className="justify-between flex" as={Fragment}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            overflowX: 'hidden',
            border: '0px',
          },
        }}
        variant="persistent"
        anchor="right"
        PaperProps={{ elevation: 4 }}
        open={isOpen}
        onClose={handleDrawerClose}
      >
        <div className="flex flex-col relative mb-20 mt-16">
          <Button onClick={handleDrawerClose}>
            <div className="h-8 text-lg">X</div>
          </Button>
          <div className="w-full p-5"></div>
        </div>
      </Drawer>
    </Box>
  )
}
export default ChatSide
