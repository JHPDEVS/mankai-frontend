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
const BOARD_UPDATE = "BOARD_UPDATE"
const BOARD_CLICK ="BOARD_CLICK"
const BOARD_CLEAR ="BOARD_CLEAR"
const LIKE_UPDATE ="LIKE_UPDATE"
const SIDE_OPEN = "SIDE_OPEN"
const SIDE_CLOSE ="SIDE_CLOSE"
const GROUP_LIST = "GROUP_LIST"
const GROUP_IN = "GROUP_IN"
const GROUP_OUT = "GROUP_OUT"
const initialState = {
  user: null,
  pending: false,
  error: false,
  noti: null,
  boardData:[],
  sideData:"",
  sideLikeData:[],
  sideImageList:[],
  isOpen:false,
  likeUpdate:0,
  likeId:0,
  groupChange:0,
  isGroupChange:0
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
        users: action.payload,
        users_error: false,
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
    [BOARD_UPDATE]:(state,action)=>{
        return{
            ...state,
            boardData:[...state.boardData,action.payload.boardData]
        }
    },
    [BOARD_CLICK]:(state,action)=>{
      return {
        ...state,
        sideData:action.payload.sideData,
        sideLikeData:action.payload.sideLikeData,
        sideImageList:action.payload.sideImageList   
      }
    },
    [BOARD_CLEAR]:(state,action)=>{
      return {
        ...state,
        boardData:[]
      }
    },
    [SIDE_OPEN]:(state,action)=>{
      return {
        ...state,
        isOpen:true
      }
    },
    [SIDE_CLOSE]:(state,action)=>{
      return {
        ...state,
        isOpen:false
      }
    },
    [LIKE_UPDATE]:(state,action)=>{
      return{
        ...state,
        likeUpdate:state.likeUpdate+1,
        likeId:action.payload.board_id
      }
    },
    [GROUP_LIST]:(state,action)=>{
      return{
        ...state,
        groupChange:state.groupChange+1
      }
    },
    [GROUP_IN]:(state,action)=>{
      return{
        ...state,
        isGroupChange:state.isGroupChange+1
      }
    },
    [GROUP_OUT]:(state,action)=>{
      return{
        ...state,
        isGroupChange:state.isGroupChange+1
      }
    }
  },
  
  initialState
)

