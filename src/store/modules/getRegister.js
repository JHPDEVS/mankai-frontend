import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
const GET_REGISTER_PENDING = "GET_REGISTER_PENDING";
const GET_REGISTER_SUCCESS = "GET_REGISTER_SUCCESS";
const GET_REGISTER_FAILURE = "GET_REGISTER_FAILURE";

function getAPI(value) {
    return axios.post('/api/register',value);
}



export const Register = (props) => async (dispatch) => {
  //먼저 요청이 시작 됬다는것을 알려줌
  dispatch({ type: GET_REGISTER_PENDING });
    // 요청을 시작합니다
    // 여기서 만든 promise 를 return 해줘야, 나중에 컴포넌트에서 호출 할 때 getPost().then(...) 을 할 수 있습니다
    axios.get('/sanctum/csrf-cookie').then(response=> {
        return getAPI(props).then(
            (res)=> {
              if(res.data.status === 200) {
                localStorage.setItem('auth_token',res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                toast.success("회원가입 성공",{autoClose:2000,position: toast.POSITION.TOP_CENTER})
                dispatch({
                    type: GET_REGISTER_SUCCESS,
                    payload: res.data,
                  })
                window.location.href="/"
              //요청이 성공하면 서버 응답내용을 payload 로 설정하여 GET_LOGIN_SUCCESS 액션을 디스패치합니다.
              } else {
                dispatch({
                    type: GET_REGISTER_FAILURE,
                    payload: res.data,
                  });
              }
            }
          ).catch(err=> {
            // 에러가 발생할경우  GET_LOGIN_FAILURE
            dispatch({
              type: GET_REGISTER_FAILURE,
              payload: err,
            });
            toast.error("회원가입에 실패했습니다",{autoClose:2000,position: toast.POSITION.TOP_CENTER}) 
            throw(err)
          }) 
    });
};
