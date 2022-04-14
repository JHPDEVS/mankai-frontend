import { handleActions } from 'redux-actions'
import * as actions from './actions.js'

const LOGIN = 'LOGIN'
const USER = 'USER'
const LOGOUT = 'LOGOUT'
const GET_USER_FAILURE = 'GET_USER_FAILURE'
const GET_USER_PENDING = 'GET_USER_PENDING'
const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
const UPDATE_USER = 'UPDATE_USER'
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
const GET_MESSAGE_PENDING = 'GET_MESSAGE_PENDING'
const GET_MESSAGE_SUCCESS = 'GET_MESSAGE_SUCCESS'
const GET_MESSAGE_FAILURE = 'GET_MESSAGE_FAILURE'
const GET_ROOM_PENDING = 'GET_ROOM_PENDING'
const GET_ROOM_SUCCESS = 'GET_ROOM_SUCCESS'
const GET_ROOM_FAILURE = 'GET_ROOM_FAILURE'
const ADD_MESSAGE = 'ADD_MESSAGE'
const ADD_ROOM = 'ADD_ROOM'
const DELETE_ROOM = 'DELETE_ROOM'
const SET_CURRENT_CHATROOM = 'SET_CURRENT_CHATROOM'
const SORT_ROOM = 'SORT_ROOM'
const SET_ROOM_UPDATED_AT = 'SET_ROOM_UPDATED_AT'
const ADD_CHAT_PAGE = 'ADD_CHAT_PAGE'
const CHAT_PAGE_ONE = 'CHAT_PAGE_ONE'
const ADD_MESSAGE_REVERSE = 'ADD_MESSAGE_REVERSE'
const CHAT_PAGE_IS = 'CHAT_PAGE_IS'
const CHAT_PAGE_NOT = 'CHAT_PAGE_NOT'
const GET_FOLLOWS_PENDING = 'GET_FOLLOWS_PENDING'
const GET_FOLLOWS_SUCCESS = 'GET_FOLLOWS_SUCCESS'
const GET_FOLLOWS_FAILURE = 'GET_FOLLOWS_FAILURE'
const GET_MEMO_PENDING = 'GET_MEMO_PENDING'
const GET_MEMO_SUCCESS = 'GET_MEMO_SUCCESS'
const GET_MEMO_FAILURE = 'GET_MEMO_FAILURE'
const CHAT_SIDE_OPEN = 'CHAT_SIDE_OPEN'
const CHAT_SIDE_CLOSE = 'CHAT_SIDE_CLOSE'
const SET_CHAT_SIDE_DATAS = 'SET_CHAT_SIDE_DATAS'
const ADD_CHAT_SIDE_FILES = 'ADD_CHAT_SIDE_FILES'
const ADD_CHAT_SIDE_IMAGES = 'ADD_CHAT_SIDE_IMAGES'
const ADD_CHAT_SIDE_MEMOS = 'ADD_CHAT_SIDE_MEMOS'
const CHAT_INVITE_MODAL_OPEN = 'CHAT_INVITE_MODAL_OPEN'
const CHAT_INVITE_MODAL_CLOSE = 'CHAT_INVITE_MODAL_CLOSE'
const GET_CURRENT_ROOM_PENDING = 'GET_CURRENT_ROOM_PENDING'
const GET_CURRENT_ROOM_SUCCESS = 'GET_CURRENT_ROOM_SUCCESS'
const GET_CURRENT_ROOM_FAILURE = 'GET_CURRENT_ROOM_FAILURE'
const SET_ROOM_USERS = 'SET_ROOM_USERS'
const SET_FOLLOWERFOLLOWER = 'SET_FOLLOWERFOLLOWER'
const TOGGLE_FOLLOWERFOLLOWER = 'TOGGLE_FOLLOWERFOLLOWER'
const GET_FOLLOWINGS_PENDING = 'GET_FOLLOWINGS_PENDING'
const GET_FOLLOWINGS_SUCCESS = 'GET_FOLLOWINGS_SUCCESS'
const GET_FOLLOWINGS_FAILURE = 'GET_FOLLOWINGS_FAILURE'
const SET_FOLLOWERFOLLOWING = 'SET_FOLLOWERFOLLOWING'
const DELETE_FOLLOWINGS = 'DELETE_FOLLOWINGS'
const DELETE_MEMO = 'DELETE_MEMO'
const UPDATE_MEMO = 'UPDATE_MEMO'
const BOARD_REALUPDATE = 'BOARD_REALUPDATE'
const BOARD_UPDATE = "BOARD_UPDATE"
const BOARD_CLICK ="BOARD_CLICK"
const BOARD_CLEAR ="BOARD_CLEAR"
const BOARD_DELETE = "BOARD_DELETE"
const LIKE_UPDATE ="LIKE_UPDATE"
const SIDE_OPEN = "SIDE_OPEN"
const SIDE_CLOSE ="SIDE_CLOSE"
const MEMO_UPDATE = "MEMO_UPDATE"
const GROUP_LIST = "GROUP_LIST"
const ADD_MEMO = "ADD_MEMO"
const MODAL_OPEN = "MODAL_OPEN"
const MODAL_CLOSE = "MODAL_CLOSE"
const GROUP_IN = "GROUP_IN"
const GROUP_OUT = "GROUP_OUT"
const SET_FOLLOWID = "SET_FOLLOWID"

const initialState = {
  user: null,
  pending: false,
  error: false,
  noti: null,
  rooms: null,
  message: [],
  currentRoom: null,
  chat_current_page: 1,
  chat_inf_handle: true,
  chat_side: false,
  chat_invite_modal: false,
  current_room_users: null,
  boardData:[],
  sideData:"",
  sideLikeData:[],
  sideImageList:[],
  isOpen:false,

  likeData:[],
  memoUpdate:[],
  likeUpdate:0,
  likeId:0,
  groupChange:0,
  rooms: null,
  message: [],
  memo : null,
  follows : null,
  currentRoom: null,
  chat_current_page: 1,
  chat_inf_handle: true,
  isModalOpen : false,
  isGroupChange:0,
  followId:0,
  followerFollower: null,
  followings: null,
  followerFollowing : null,
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
    [UPDATE_USER] : (state,action) => {
      const copieduser = {...state.user};


      copieduser.name = action.payload.name;
      copieduser.country = action.payload.country;
      copieduser.description = action.payload.description;
      copieduser.profile = action.payload.image;

      return {
        ...state,
        user: copieduser
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
    [BOARD_REALUPDATE] : (state,action)=>{

    },
    [BOARD_UPDATE]:(state,action)=>{
      return{
          ...state,
          boardData:[...state.boardData,action.payload.boardData]
      }
    },
    [BOARD_DELETE]:(state,action)=>{
      return{
        ...state,
        boardData : state.boardData.filter((boardDataone)=>{
          return boardDataone.id !== action.payload.boardId
        })
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

  [MODAL_OPEN]:(state,action)=>{
    return {
      ...state,
      isModalOpen:true
    }
  },
  [MODAL_CLOSE]:(state,action)=>{
    return {
      ...state,
      isModalOpen:false
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
        sideData:action.payload.sideData,
        sideLikeData:action.payload.sideLikeData,
        sideImageList:action.payload.sideImageList   
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
        message: [...state.message, action.payload.message],
      }
    },
    [ADD_MESSAGE_REVERSE]: (state, action) => {
      return {
        ...state,
        message: [action.payload.message, ...state.message],
      }
    },
    [ADD_ROOM]: (state, action) => {
      return {
        ...state,
        rooms: [action.payload.room, ...state.rooms],
      }
    },
    [DELETE_ROOM]: (state, action) => {
      return {
        ...state,
        // rooms:[...state.rooms,action.payload.room]
        rooms: state.rooms.filter((room, index) => {
          return room.id !== action.payload.room.id
        }),
      }
    },
    [SET_CURRENT_CHATROOM]: (state, action) => {
      return {
        ...state,
        // rooms:[...state.rooms,action.payload.room]
        currentRoom: action.payload.room,
        current_room_users: action.payload.room.users,
        chat_inf_handle: true,
      }
    },
    [SET_ROOM_UPDATED_AT]: (state, action) => {
      return {
        ...state,
        rooms: [
          ...state.rooms.filter(room => {
            if (room.id == action.payload.room_id) {
              room.updated_at = action.payload.updated_at
              room.last_message = action.payload.last_message
            }
            return room.id == action.payload.room_id
          }),
          ...state.rooms.filter(room => {
            return room.id != action.payload.room_id
          }),
        ],
      }
    },
    [SORT_ROOM]: (state, action) => {
      return {
        ...state,
        rooms: action.payload.rooms.sort((a, b) => {
          return new Date(a.updated_at) - new Date(b.updated_at)
        }),
      }
    },
    [ADD_CHAT_PAGE]: (state, action) => {
      return {
        ...state,
        chat_current_page: state.chat_current_page + 1,
      }
    },
    [CHAT_PAGE_ONE]: (state, action) => {
      return {
        ...state,
        chat_current_page: 1,
      }
    },

    [CHAT_PAGE_NOT]: (state, action) => {
      return {
        ...state,
        chat_inf_handle: false,
      }
    },
    [GET_FOLLOWS_PENDING]: (state, action) => {
      return {
        ...state,
        follows_pending: true,
        get_follows_error: true,
      }
    },
    [GET_FOLLOWS_SUCCESS]: (state, action) => {
      return {
        ...state,
        follows_pending: false,
        follows: action.payload,
        get_follows_error: false,
      }
    },
    [GET_FOLLOWS_FAILURE]: (state, action) => {
      return {
        ...state,
        follows_pending: false,
        get_follows_error: true,
      }
    },
  
    [SET_FOLLOWERFOLLOWING] : (state, action) => {
      return {
        ...state,
        followerFollowing :action.payload.followerFollowing
      }
    },

    [GET_FOLLOWINGS_PENDING]: (state, action) => {
      return {
        ...state,
        followings_pending: true,
        get_followings_error: true,
      }
    },
    [GET_FOLLOWINGS_SUCCESS]: (state, action) => {
      return {
        ...state,
        followings_pending: false,
        followings: action.payload,
        get_followings_error: false,
      }
    },
    [GET_FOLLOWINGS_FAILURE]: (state, action) => {
      return {
        ...state,
        followings_pending: false,
        get_followings_error: true,
      }
    },

    [SET_FOLLOWID]: (state, action) => {
      return {
        ...state,
        followId : action.payload.followId, 
      }
    },
    [SET_FOLLOWERFOLLOWER] : (state, action) => {
      return {
        ...state,
      followerFollower: action.payload.followerFollower,
      }
    },
    [TOGGLE_FOLLOWERFOLLOWER] : (state, action) => {
      var plus = true;
      var i = 0 ;

      var copiedfollowerFollower = [...state.followerFollower];
      copiedfollowerFollower.forEach(follower => {
        if(follower.id === action.payload.followerFollower.id){
          copiedfollowerFollower.splice(i,1)
          plus = false;
        }
        i++;
      })
      if(plus === true){
        copiedfollowerFollower.push(action.payload.followerFollower);
      }

      return{
      ...state,
      followerFollower : copiedfollowerFollower
    }
    },

    [DELETE_FOLLOWINGS] : (state,action) => {
        return {
          ...state,
          followings : state.followings.filter((following)=>{
            return following.id !== action.payload
          })
        }
    },
    [GET_MEMO_PENDING]: (state, action) => {
      return {
        ...state,
        memo_pending: true,
        get_memo_error: true,
      }
    },
    [GET_MEMO_SUCCESS]: (state, action) => {
      return {
        ...state,
        memo_pending: false,
        memo: action.payload,
        get_memo_error: false,
      }
    },
    [GET_MEMO_FAILURE]: (state, action) => {
      return {
        ...state,
        memo_pending: false,
        get_memo_error: true,
      }
    },
    [ADD_MEMO]: (state, action) => {
      return {
        ...state,
        memo: [...state.memo, action.payload.memo],
      }
    },
    [CHAT_SIDE_OPEN]: (state, action) => {
      return {
        ...state,
        chat_side: true,
      }
    },
    [CHAT_SIDE_CLOSE]: (state, action) => {
      return {
        ...state,
        chat_side: false,
      }
    },
    [CHAT_INVITE_MODAL_OPEN]: (state, action) => {
      return {
        ...state,
        chat_invite_modal: true,
      }
    },
    [CHAT_INVITE_MODAL_CLOSE]: (state, action) => {
      return {
        ...state,
        chat_invite_modal: false,
      }
    },
    [SET_CHAT_SIDE_DATAS]: (state, action) => {
      return {
        ...state,
        room_files: action.payload.files,
        room_images: action.payload.images,
        room_memos: action.payload.memos,
      }
    },
    [ADD_CHAT_SIDE_FILES]: (state, action) => {
      return {
        ...state,
        room_files: [action.payload.files, ...state.room_files],
      }
    },
    [ADD_CHAT_SIDE_IMAGES]: (state, action) => {
      return {
        ...state,
        room_images: [action.payload.images, ...state.room_images],
      }
    },
    [ADD_CHAT_SIDE_MEMOS]: (state, action) => {
      return {
        ...state,
        room_memos: [action.payload.memos, ...state.room_memos],
      }
    },
    [GET_CURRENT_ROOM_SUCCESS]: (state, action) => {
      return {
        ...state,
        current_room_users: action.payload,
        rooms: [
          ...state.rooms.filter(room => {
            if (room.id == state.currentRoom.id) {
              room.users = action.payload
            }
            return room.id == state.currentRoom.id
          }),
          ...state.rooms.filter(room => {
            return room.id != state.currentRoom.id
          }),
        ],
      }
    },

    [DELETE_MEMO]: (state, action) => {
      return {
        ...state,
        memo: state.memo.filter((onememo, index) => {
                    return onememo.id !== action.payload.memo_id
        }),
      }
    },

    [UPDATE_MEMO]:(state, action) => {
      return { 
        ...state,
          memo: [
            ...state.memo.filter(onememo => {
              if(onememo.id === action.payload.memo_id){
                onememo.memo_title = action.payload.memo_title  
                onememo.content_text = action.payload.content_text
              }
              return onememo.id === action.payload.memo_id
            }

            ),
            ...state.memo.filter(onememo => {
              return onememo.id !== action.payload.memo_id
            })
          ]
      }
    },

    [ADD_MESSAGE]: (state, action) => {
      return {
        ...state,
        message: [...state.message, action.payload.message],
      }
    },
    [ADD_MESSAGE_REVERSE]: (state, action) => {
      return {
        ...state,
        message: [action.payload.message, ...state.message],
      }
    },
    [ADD_ROOM]: (state, action) => {
      return {
        ...state,
        rooms: [action.payload.room, ...state.rooms],
      }
    },
    [DELETE_ROOM]: (state, action) => {
      return {
        ...state,
        // rooms:[...state.rooms,action.payload.room]
        rooms: state.rooms.filter((room, index) => {
          return room.id !== action.payload.room.id
        }),
      }
    },
    [SET_CURRENT_CHATROOM]: (state, action) => {
      return {
        ...state,
        // rooms:[...state.rooms,action.payload.room]
        currentRoom: action.payload.room,
        chat_inf_handle: true,
      }
    },
    [SET_ROOM_UPDATED_AT]: (state, action) => {
      return {
        ...state,
        rooms: [
          ...state.rooms.filter(room => {
            if (room.id == action.payload.room_id) {
              room.updated_at = action.payload.updated_at
              room.last_message = action.payload.last_message
            }
            return room.id == action.payload.room_id
          }),
          ...state.rooms.filter(room => {
            return room.id != action.payload.room_id
          }),
        ],
      }
    },
    [SORT_ROOM]: (state, action) => {
      return {
        ...state,
        rooms: action.payload.rooms.sort((a, b) => {
          return new Date(a.updated_at) - new Date(b.updated_at)
        }),
      }
    },
    [ADD_CHAT_PAGE]: (state, action) => {
      return {
        ...state,
        chat_current_page: state.chat_current_page + 1,
      }
    },
    [CHAT_PAGE_ONE]: (state, action) => {
      return {
        ...state,
        chat_current_page: 1,
      }
    },
    [CHAT_PAGE_NOT]: (state, action) => {
      return {
        ...state,
        chat_inf_handle: false,
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
    },
    [MEMO_UPDATE]:(state,action)=>{
      return{
        ...state,
        memoUpdate:[...state.memoUpdate,1]
      }
    }
  },
  initialState
)