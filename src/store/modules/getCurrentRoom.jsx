import axios from 'axios'
import { useSelector } from 'react-redux'

const GET_CURRENT_ROOM_PENDING = 'GET_CURRENT_ROOM_PENDING'
const GET_CURRENT_ROOM_SUCCESS = 'GET_CURRENT_ROOM_SUCCESS'
const GET_CURRENT_ROOM_FAILURE = 'GET_CURRENT_ROOM_FAILURE'

function getAPI(id) {
  return axios.get(`/api/room/find/${id}`)
}

export const getCurrentRoom = id => async dispatch => {
  //먼저 요청이 시작 됬다는것을 알려줌

  dispatch({ type: GET_CURRENT_ROOM_PENDING })
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getAPI(id)
    .then(res => {
      //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_USER_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_CURRENT_ROOM_SUCCESS,
        payload: res.data.users,
      })
    })
    .catch(err => {
      // 에러가 발생할경우  GET_USER_FAILURE
      dispatch({
        type: GET_CURRENT_ROOM_FAILURE,
        payload: err,
      })
      throw err
    })
}
