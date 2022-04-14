import axios from 'axios'
import { useSelector } from 'react-redux'

const GET_FOLLOWS_PENDING = 'GET_FOLLOWS_PENDING'
const GET_FOLLOWS_SUCCESS = 'GET_FOLLOWS_SUCCESS'
const GET_FOLLOWS_FAILURE = 'GET_FOLLOWS_FAILURE'

function getAPI(userId) {
<<<<<<< HEAD
  return axios.get(`/api/follows/${userId}`)
}

export const getFollows = userId => async dispatch => {
=======
  console.log(userId);
  return axios.get(`/api/follows/${userId}`)
}

export const getFollows = (userId) => async dispatch => {
>>>>>>> 5ef6bef41135a0eb79b6624779cef12bb199a478
  //먼저 요청이 시작 됬다는것을 알려줌

  dispatch({ type: GET_FOLLOWS_PENDING })
  // 요청을 시작합니다
  // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
  return getAPI(userId)
    .then(res => {
      //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_USER_SUCCESS 액션을 디스패치합니다.
      dispatch({
        type: GET_FOLLOWS_SUCCESS,
        payload: res.data,
      })
    })
    .catch(err => {
      // 에러가 발생할경우  GET_USER_FAILURE
      dispatch({
        type: GET_FOLLOWS_FAILURE,
        payload: err,
      })
      throw err
    })
<<<<<<< HEAD
}
=======
}
>>>>>>> 5ef6bef41135a0eb79b6624779cef12bb199a478
