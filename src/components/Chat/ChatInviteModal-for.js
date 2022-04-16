import { Modal } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import * as React from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
function ChatInviteModal(props) {
  const { t } = useTranslation(['lang'])
  const [checkedInviteUsers, setCheckedInviteUsers] = useState([])
  const [complete, setComplete] = useState(false)
  const rooms = useSelector(state => state.Reducers.rooms)
  const currentUser = useSelector(state => state.Reducers.user)
  const following = useSelector(state => state.Reducers.follows)
  const dispatch = useDispatch()
  const [close, setClose] = useState(false)
  const changeHandler = (checked, user) => {
    if (checked) {
      setCheckedInviteUsers([...checkedInviteUsers, user])
      console.log('체크 ')
    } else {
      setCheckedInviteUsers(checkedInviteUsers.filter(el => el !== user))
      console.log('체크 해제')
    }
  }
  function newRoomList(newRoom) {
    if (rooms.find(room => room.id === newRoom.id)) {
      return
    } else {
      dispatch({ type: 'ADD_ROOM', payload: { room: newRoom } })
    }
  }

  React.useEffect(() => {
    // console.log(checkedInviteUsers);
    if (complete) {
      axios
        .post('http://localhost:8000/api/room/create', {
          users: checkedInviteUsers,
        })
        .then(res => {
          newRoomList(res.data)
          console.log(res.data)
          setComplete(false)
          setCheckedInviteUsers([])
        })
    }
  }, [checkedInviteUsers])

  const roomCreate = e => {
    setCheckedInviteUsers([...checkedInviteUsers, currentUser])
    setComplete(true)
    props.handleClose(e)
  }

  const possibleChecked = checkedInviteUsers.length >= 1
  const disabled = !possibleChecked
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  }
  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          대화상대선택
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <ul>
            {following
              ? following.map((follow, index) => (
                  <li key={index}>
                    {follow.name}
                    <input
                      type="checkbox"
                      id={'check' + index}
                      onChange={e => {
                        changeHandler(e.currentTarget.checked, follow)
                      }}
                      checked={
                        checkedInviteUsers.includes(follow) ? true : false
                      }
                    />
                  </li>
                ))
              : null}
          </ul>
        </Typography>
        <Typography id="modal-modal-footer" sx={{ mt: 2 }}>
          {/* <hr className="mb-2" /> */}
          <Button
            disabled={disabled}
            onClick={roomCreate}
            variant="contained"
            color="button"
            size="small"
          >
            {t('lang:COMPLETE')}
          </Button>
          <Button
            onClick={props.handleClose}
            variant="contained"
            color="button"
            size="small"
          >
            {t('lang:CANCEL')}
          </Button>
        </Typography>
      </Box>
    </Modal>
  )
}
export default ChatInviteModal
