import axios from 'axios'
import { useSelector } from 'react-redux'

const GET_FOLLOWINGS_PENDING = 'GET_FOLLOWINGS_PENDING'
const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS'
const GET_FOLLOWINGS_FAILURE = 'GET_FOLLOWINGS_FAILURE'

function getAPI(userId) {
  console.log(userId);
  return axios.get(`/api/followings/${userId}`)
}

export const getFollowings = (userId) => async dispatch => {
  //먼저 요청이 시작 됬다는것을 알려줌

  dispatch({ type: GET_FOLLOWINGS_PENDING })
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getAPI(userId)
    .then(res => {
      //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_USER_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_FOLLOWINGS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(err => {
      // 에러가 발생할경우  GET_USER_FAILURE
      dispatch({
        type: GET_FOLLOWINGS_FAILURE,
        payload: err,
      })
      throw err
    })
}