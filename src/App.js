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
import BoardCopy from './components/BoardCopy'
import Mypage from './components/Mypage'
import axios from 'axios'
import Home from './layouts/Home'
import Empty from './components/Empty'
import { useSelector, useDispatch } from 'react-redux'
import { User } from './store/modules/getUser'
import { ToastContainer } from 'react-toastify'
import { Noti } from './store/modules/getNoti'
import NotiView from './components/NotiView'
import Dashboard from './components/Dashboard'
import DashboardUser from './admin/component/User'
import './css/style.scss';

import ChatMemo from './components/MyPage/ChatMemo';
import PostMemo from './components/MyPage/PostMemo';
import MyNewMemo from './components/MyPage/MyNewMemo';
import Profile from './components/MyPage/Profile';
import Youpage from './components/MyPage/YouPage'
import MymemoCreate from './components/MyPage/MymemoCreate'

axios.defaults.baseURL = 'http://localhost:8000/'
axios.defaults.headers.post['Content-Type'] = 'application/json'
axios.defaults.headers.post['Accept'] = 'application/json'
axios.defaults.withCredentials = true

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
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
        <Route exact path="/chatting_memo" component={ChatMemo}></Route>
          <Route exact path="/post_memo" component={PostMemo}></Route>
          <Route exact path="/my_new_memo" component={MyNewMemo}></Route>
          <Route exact path="/profile" component={Profile}></Route>
          <Route exact path="/youProfile" component={Youpage}></Route>
          

          <Route exact path="/mymemocreate" component={MymemoCreate}></Route>


        <Route exact path="/board" component={BoardCopy}></Route>
          
        <Route path="*" component={Empty}></Route>
      </Switch>
    </Router>
  )
}

export default App
