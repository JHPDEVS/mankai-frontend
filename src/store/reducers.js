import { handleActions } from 'redux-actions'
import * as actions from './actions.js'

const LOGIN = 'LOGIN'
const USER = 'USER'
const LOGOUT = 'LOGOUT'
const GET_USER_FAILURE = 'GET_USER_FAILURE'
const GET_USER_PENDING = 'GET_USER_PENDING'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const GET_LOGIN_PENDING = 'GET_LOGIN_PENDING'
const GET_LOGIN_SUCCESS = 'GET_LOGIN_SUCCESS'
const GET_LOGIN_FAILURE = 'GET_LOGIN_FAILURE'
const GET_REGISTER_PENDING = 'GET_REGISTER_PENDING'
const GET_REGISTER_SUCCESS = 'GET_REGISTER_SUCCESS'
const GET_REGISTER_FAILURE = 'GET_REGISTER_FAILURE'
const GET_NOTI_PENDING = 'GET_NOTI_PENDING'
const GET_NOTI_SUCCESS = 'GET_NOTI_SUCCESS'
const GET_NOTI_FAILURE = 'GET_NOTI_FAILURE'
const GET_USERS_PENDING = 'GET_USERS_PENDING'
const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS'
const GET_USERS_FAILURE = 'GET_USERS_FAILURE'
const POST_USEREDIT_PENDING = 'POST_USEREDIT_PENDING'
const POST_USEREDIT_SUCCESS = 'POST_USEREDIT_SUCCESS'
const POST_USEREDIT_FAILURE = 'POST_USEREDIT_FAILURE'
const POST_NOTI_PENDING = 'POST_NOTI_PENDING'
const POST_NOTI_SUCCESS = 'POST_NOTI_SUCCESS'
const POST_NOTI_FAILURE = 'POST_NOTI_FAILURE'
const GET_MESSAGE_PENDING = "GET_MESSAGE_PENDING";
const GET_MESSAGE_SUCCESS = "GET_MESSAGE_SUCCESS";
const GET_MESSAGE_FAILURE = "GET_MESSAGE_FAILURE";
const GET_ROOM_PENDING = "GET_ROOM_PENDING";
const GET_ROOM_SUCCESS = "GET_ROOM_SUCCESS";
const GET_ROOM_FAILURE = "GET_ROOM_FAILURE";
const ADD_MESSAGE = "ADD_MESSAGE";
const initialState = {
  user: null,
  pending: false,
  error: false,
  noti: null,
  rooms: null,
}

export default handleActions(
  {
    [LOGIN]: (state, action) => {
      return {
        ...state, // 모든 states 복사
        user: action.payload,
      }
    },
    [USER]: (state, action) => {
      return {
        ...state, // 모든 states 복사
        user: action.payload,
      }
    },
    [LOGOUT]: (state, action) => {
      return {
        user: null,
      }
    },
    [GET_LOGIN_PENDING]: (state, action) => {
      return {
        login_pending: true,
        error: false,
      }
    },
    [GET_LOGIN_SUCCESS]: (state, action) => {
      return {
        login_pending: false,
        user: action.payload,
        error: false,
      }
    },
    [GET_LOGIN_FAILURE]: (state, action) => {
      return {
        login_pending: false,
        login_error: action.payload,
        error: false,
      }
    },

    [GET_USER_PENDING]: (state, action) => {
      return {
        ...state,
        user_pending: true,
        error: true,
      }
    },
    [GET_USER_SUCCESS]: (state, action) => {
      return {
        ...state,
        user_pending: false,
        user: action.payload,
        error: false,
      }
    },
    [GET_USER_FAILURE]: (state, action) => {
      return {
        ...state,
        user_pending: false,
        error: true,
      }
    },
    [GET_USERS_PENDING]: (state, action) => {
      return {
        ...state,
        users_pending: true,
        users_error: true,
      }
    },
    [GET_USERS_SUCCESS]: (state, action) => {
      return {
        ...state,
        users_pending: false,
        users: action.payload.users,
        users_error: false,
        users_message: action.payload.message,
      }
    },
    [GET_USERS_FAILURE]: (state, action) => {
      return {
        ...state,
        users_pending: false,
        users_error: true,
      }
    },

    [GET_NOTI_PENDING]: (state, action) => {
      return {
        ...state,
        noti_pending: true,
        error: true,
      }
    },
    [GET_NOTI_SUCCESS]: (state, action) => {
      return {
        ...state,
        noti_pending: false,
        noti: action.payload.noti,
        navNoti: action.payload.navNoti,
        noti_count: action.payload.total_count,
        count: action.payload.count,
        error: false,
      }
    },
    [GET_NOTI_FAILURE]: (state, action) => {
      return {
        ...state,
        noti_pending: false,
        error: true,
      }
    },
    [GET_REGISTER_PENDING]: (state, action) => {
      return {
        register_pending: true,
        error: false,
      }
    },
    [GET_REGISTER_SUCCESS]: (state, action) => {
      return {
        register_pending: false,
        user: action.payload,
      }
    },
    [GET_REGISTER_FAILURE]: (state, action) => {
      return {
        register_pending: false,
        register_error: action.payload,
        error: false,
      }
    },

    [POST_USEREDIT_PENDING]: (state, action) => {
      return {
        ...state,
        useredit_pending: true,
        useredit_error: false,
      }
    },
    [POST_USEREDIT_SUCCESS]: (state, action) => {
      return {
        ...state,
        useredit_register_pending: false,
        useredit: action.payload,
      }
    },
    [POST_USEREDIT_FAILURE]: (state, action) => {
      return {
        ...state,
        useredit_pending: false,
        useredit_error: action.payload,
      }
    },
    [POST_NOTI_PENDING]: (state, action) => {
      return {
        ...state,
        post_noti_pending: true,
        post_noti_error: false,
      }
    },
    [POST_NOTI_SUCCESS]: (state, action) => {
      return {
        ...state,
        post_noti_pending: false,
        post_noti: action.payload,
      }
    },
    [POST_NOTI_FAILURE]: (state, action) => {
      return {
        ...state,
        post_noti_pending: false,
        post_noti_error: action.payload,
      }
    },
    [GET_MESSAGE_PENDING]: (state, action) => {
      return {
        ...state,
        message_pending: true,
        get_message_error: true,
      }
    },
    [GET_MESSAGE_SUCCESS]: (state, action) => {
      return {
        ...state,
        message_pending: false,
        message: action.payload,
        get_message_error: false,
      }
    },
    [GET_MESSAGE_FAILURE]: (state, action) => {
      return {
        ...state,
        message_pending: false,
        get_message_error: true,
      }
    },
    [GET_ROOM_PENDING]: (state, action) => {
      return {
        ...state,
        room_pending: true,
        get_room_error: true,
      }
    },
    [GET_ROOM_SUCCESS]: (state, action) => {
      return {
        ...state,
        room_pending: false,
        rooms: action.payload,
        get_room_error: false,
      }
    },
    [GET_ROOM_FAILURE]: (state, action) => {
      return {
        ...state,
        room_pending: false,
        get_room_error: true,
      }
    },
    [ADD_MESSAGE]: (state, action) => {
      return {
        ...state,
        message:[...state.message,action.payload.message]
      }
    },
  },
  initialState
)
