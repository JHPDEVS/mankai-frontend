
import axios from "axios";

const GET_NOTI_PENDING = "GET_NOTI_PENDING";
const GET_NOTI_SUCCESS = "GET_NOTI_SUCCESS";
const GET_NOTI_FAILURE = "GET_NOTI_FAILURE";

function getAPI() {
  return axios.get(
    "/api/noti/get"
  );
}

export const Noti = () => async (dispatch) => {
  //먼저 요청이 시작 됬다는것을 알려줌

  dispatch({ type: GET_NOTI_PENDING });
    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    return getAPI().then(
      (res)=> {
        //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_USER_SUCCESS 액션을 디스패치합니다.
        dispatch({
          type: GET_NOTI_SUCCESS,
          payload: res.data,
        })
      }
    ).catch(err=> {
      // 에러가 발생할경우  GET_USER_FAILURE
      dispatch({
        type: GET_NOTI_FAILURE,
        payload: err,
      });
      throw(err)
    }) 
};

