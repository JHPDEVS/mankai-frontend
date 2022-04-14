import React, { useEffect, useState, Suspense } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  Link
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'
import Mypage from './components/Mypage'
import BoardCopy from './components/BoardCopy'
import axios from 'axios'
import Home from './layouts/Home'
import Empty from './components/Empty'
import { useSelector, useDispatch } from 'react-redux'
import { User } from './store/modules/getUser'
import { ToastContainer } from 'react-toastify'
import { Noti } from './store/modules/getNoti'
import NotiView from './components/NotiView'
import Dashboard from './components/Dashboard'
import Chat from './components/Chat/Chat'
import DashboardUser from './admin/component/User'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import './css/style.scss'
import Room from './components/WebRtc/VideoRoom'
import WaitRoom from './components/WebRtc/WaitRoom'
import speechTest from './components/stream/speechTest'
import Group from './components/Group'
import DashboardUser from './admin/component/User'
import ChatMemo from './components/MyPage/ChatMemo';
import './css/style.scss'
import Profile from './components/MyPage/Profile';
import YouPage from './components/MyPage/YouPage'
import GroupDetail from './components/GroupDetail'

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = [token ? `Bearer ${token}` : '']
  return config
})

window.Pusher = require('pusher-js')
window.Echo = new Echo({
  broadcaster: 'pusher',
  key: 'anykey',
  cluster: 'ap3',
  forceTLS: false,
  wsHost: window.location.hostname,
  wsPort: 6001,
  authEndpoint: '/broadcasting/auth',
  disableStats: true,
  enabledTransports: ['ws', 'wss'],
  auth: {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('auth_token'),
    },
  },
})

function App() {
  const token = localStorage.getItem('auth_token')
  const dispatch = useDispatch()
  if (!token) {
  } else {
    dispatch(User())
    dispatch(Noti())
  }
  return (
    <Router>
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/mypage" component={Mypage}></Route>
        <Route exact path="/noti" component={NotiView}></Route>
        <Route exact path="/login">
          {true ? <Login /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/dashboard" component={Dashboard}></Route>
        <Route exact path="/dashboard/user" component={DashboardUser}></Route>
        <Route exact path="/chat" component={Chat}></Route>
        <Route exact path="/video/:roomID" component={WaitRoom}></Route>
        <Route exact path="/speak/test" component={speechTest}></Route>
        <Route
          exact
          path="/dashboard/user/:id"
          component={DashboardUser}
        ></Route>

          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/youpage/:follow_id" component={YouPage}></Route>
        <Route exact path="/chatting_memo" component={ChatMemo}></Route>
          {/* <Route exact path="/post_memo" component={PostMemo}></Route>
          <Route exact path="/my_memo_edit/:id" component={MyMemoEdit}></Route> */}

          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/youProfile" component={YouPage}></Route>
          



        <Route exact path="/board" component={BoardCopy}></Route>

        <Route exact path="/group" component={Group}></Route>
        <Route exact path="/group/:group_id" component={GroupDetail}></Route>
        <Route path="*" component={Empty}></Route>
      </Switch>
    </Router>
  )
}

export default App
