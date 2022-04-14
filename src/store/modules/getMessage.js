import axios from 'axios'
import { useSelector } from 'react-redux'

const GET_MESSAGE_PENDING = 'GET_MESSAGE_PENDING'
const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS'
const GET_MESSAGE_FAILURE = 'GET_MESSAGE_FAILURE'

function getAPI(roomId, page, userId) {
  return axios.get(`/api/messages/${roomId}/${userId}?page=${page}`)
}

export const getMessage = (roomId, page, userId) => async dispatch => {
  //먼저 요청이 시작 됬다는것을 알려줌

  dispatch({ type: GET_MESSAGE_PENDING })
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getAPI(roomId, page, userId)
    .then(res => {
      //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_USER_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_MESSAGE_SUCCESS,
        payload: res.data.data,
      })
      if (res.data.last_page == res.data.current_page) {
        dispatch({
          type: 'CHAT_PAGE_NOT',
        })
      }
      // dispatch({ type: 'ADD_CHAT_PAGE' })
    })
    .catch(err => {
      // 에러가 발생할경우  GET_USER_FAILURE
      dispatch({
        type: GET_MESSAGE_FAILURE,
        payload: err,
      })
      throw err
    })
}
