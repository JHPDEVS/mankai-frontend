import React, { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import Peer from 'simple-peer'
import styled from 'styled-components'
import Header from '../../admin/layout/Header'
import { useSelector } from 'react-redux'

export const getPermissions = () => {
  return new Promise((res, rej) => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then(stream => {
        res(stream)
      })
      .catch(err => {
        throw new Error('스트림 에러 ' + err)
      })
  })
}

export const getCamera = () => {
  return new Promise((res, rej) => {
    try {
      res(navigator.mediaDevices.enumerateDevices())
    } catch (e) {
      rej(e)
    }
  })
}

const Room = props => {
  const socketRef = useRef(null)
  const myVideo = useRef(null)
  const [peopleLength, setPeopleLength] = useState(0)
  const [myStream, setMyStream] = useState(null)
  const [users, setUsers] = useState()
  const [mute, setMute] = useState(false)
  const [cameraOn, setCamera] = useState(true)
  const [cameras, setCameras] = useState()
  const user = useSelector(state => state.Reducers.user)
  useEffect(() => {
    if (user) {
      socketRef.current = window.io
      socketRef.current.emit('enter_room', props.match.params.roomID, user)
      socketRef.current.on('room_change', room => {
        setPeopleLength(room.peopleLength)
        setUsers(room.users)
        console.log(room)
      })
      socketRef.current.on('user_exit', room => {
        console.log(room)
      })
    }
    getPermissions().then(streamValue => {
      setMyStream(streamValue)
      myVideo.current.srcObject = streamValue
      myVideo.current.play()
    })
    getCamera().then(devices => {
      const cameras = devices.filter(device => device.kind === 'videoinput')
      console.log(cameras)
    })
  }, [user])

  const alert = () => {
    socketRef.current.emit('alert', props.match.params.roomID)
    return
  }

  const muteClicked = () => {
    myStream.getAudioTracks().forEach(track => (track.enabled = !track.enabled))
    setMute(!mute)
    console.log(myStream.getAudioTracks())

    console.log('음소거 클릭됨')
  }

  const cameraClicked = () => {
    myStream.getVideoTracks().forEach(track => (track.enabled = !track.enabled))
    setCamera(!cameraOn)
    console.log(myStream.getVideoTracks())
    console.log('비디오 클릭됨')
  }
  return (
    <div className="flex  h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 h-screen  overflow-y-hidden overflow-x-hidden">
        {/*  Site header */}
        <Header />
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="h-full bg-primary">
              <video ref={myVideo}></video>
            </div>
            <div className="h-24 bg-tabbg rounded-xl">
              <span>
                룸 이름 : {props.match.params.roomID} {peopleLength}
                {mute ? (
                  <button
                    onClick={muteClicked}
                    className="border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
                  >
                    음소거 해제
                  </button>
                ) : (
                  <button
                    onClick={muteClicked}
                    className="border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
                  >
                    음소거
                  </button>
                )}
                {cameraOn ? (
                  <button
                    onClick={cameraClicked}
                    className="border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
                  >
                    카메라 끄기
                  </button>
                ) : (
                  <button
                    onClick={cameraClicked}
                    className="border-2 border-blue-500 font-bold text-blue-500 px-4 py-3 transition duration-300 ease-in-out hover:bg-blue-500 hover:text-white mr-6"
                  >
                    카메라 켜기
                  </button>
                )}
              </span>
            </div>
          </div>
          <div className="w-full w-2/6 bg-videochatbg">
            <button>방 입장 : {peopleLength} 명</button>
            {users ? users.map((user, index) => <div>{user.name}</div>) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
