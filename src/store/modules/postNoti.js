import axios from 'axios'

import { ToastContainer, toast } from 'react-toastify'
const POST_NOTI_PENDING = 'POST_NOTI_PENDING'
const POST_NOTI_SUCCESS = 'POST_NOTI_SUCCESS'
const POST_NOTI_FAILURE = 'POST_NOTI_FAILURE'

function getAPI(value) {
  return axios.post('/api/noti/add', value)
}

export const AdminNotiSend = props => async dispatch => {
  //먼저 요청이 시작 됬다는것을 알려줌
  dispatch({ type: POST_NOTI_PENDING })
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  axios.get('/sanctum/csrf-cookie').then(response => {
    return getAPI(props)
      .then(res => {
        if (res.data.status === 200) {
          toast.success('유저 알림 보내기 성공', {
            autoClose: 2000,
            position: toast.POSITION.TOP_CENTER,
          })
          dispatch({
            type: POST_NOTI_SUCCESS,
            payload: res.data,
          })
          //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_LOGIN_SUCCESS 액션을 디스패치합니다.
        } else {
          dispatch({
            type: POST_NOTI_FAILURE,
            payload: res.data,
          })
        }
      })
      .catch(err => {
        // 에러가 발생할경우  GET_LOGIN_FAILURE
        dispatch({
          type: POST_NOTI_FAILURE,
          payload: err,
        })
        toast.error('알림 보내기 실패', {
          autoClose: 2000,
          position: toast.POSITION.TOP_CENTER,
        })
        throw err
      })
  })
}
