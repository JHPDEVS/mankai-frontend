import React, { useEffect, useRef, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import styled from 'styled-components'
import Header from '../../admin/layout/Header'
import { useSelector } from 'react-redux'
import { IconButton } from '@mui/material'
import { OpenVidu } from 'openvidu-browser'
import axios from 'axios'
import UserVideo from './UserVideo'
import './Room.css'

const OPENVIDU_SERVER_URL = process.env.REACT_APP_OPENVIDU_SERVER_URL
const OPENVIDU_SERVER_SECRET = process.env.REACT_APP_OPENVIDU_SERVER_SECRET

const Room = props => {
  const roomAxios = axios.create()
  const [Room, setRoom] = useState(props.match.params.roomID)
  const user = useSelector(state => state.Reducers.user)
  const [Session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [currentVideoDevice, setCurrentVideoDevice] = useState(undefined)
  const OV = useRef(null)
  useEffect(() => {
    window.addEventListener('beforeunload', onbeforeunload)
    return () => {
      window.removeEventListener('beforeunload', onbeforeunload)
    }
  }, [])

  useEffect(() => {
    if (user) {
      joinSession() // 방 참가
    }
  }, [user])
  const onbeforeunload = e => {
    leaveSession()
  }

  const handleMainVideoStream = stream => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream)
    }
  }

  const deleteSubscriber = streamManager => {
    let subscribersArray = subscribers
    let index = subscribersArray.indexOf(streamManager, 0)
    if (index > -1) {
      subscribersArray.splice(index, 1)
      setSubscribers(subscribersArray)
    }
  }
  const joinSession = () => {
    OV.current = new OpenVidu()
    var mySession = OV.current.initSession()
    setSession(mySession)
    mySession.on('streamCreated', event => {
      var subscriber = mySession.subscribe(event.stream, undefined)
      var subscribersArray = subscribers
      subscribersArray.push(subscriber)
      setSubscribers(subscribersArray)
    })

    mySession.on('streamDestroyed', event => {
      deleteSubscriber(event.stream.streamManager)
    })

    mySession.on('exception', exception => {
      console.warn(exception)
    })

    getToken().then(token => {
      mySession
        .connect(token, { clientData: user.name })
        .then(async () => {
          var devices = await OV.current.getDevices()
          var videoDevices = devices.filter(
            device => device.kind === 'videoinput'
          )

          // --- 5) Get your own camera stream ---

          let publisher = OV.current.initPublisher(undefined, {
            audioSource: undefined, // The source of audio. If undefined default microphone
            videoSource: videoDevices[0].deviceId, // The source of video. If undefined default webcam
            publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
            publishVideo: true, // Whether you want to start publishing with your video enabled or not
            resolution: '640x480', // The resolution of your video
            frameRate: 30, // The frame rate of your video
            insertMode: 'APPEND', // How the video is inserted in the target element 'video-container'
            mirror: false, // Whether to mirror your local video or not
          })

          // --- 6) Publish your stream ---
          mySession.publish(publisher)

          setCurrentVideoDevice(videoDevices[0])
          setMainStreamManager(publisher)
          setPublisher(publisher)
        })
        .catch(err => {
          console.log('session에 err 발생', err.code, err.message)
        })
    })
  }

  const leaveSession = () => {
    const mySession = Session
    if (mySession) {
      mySession.disconnect()
    }

    OV.current = null
    setSession(undefined)
    setSubscribers([])
    setMainStreamManager(undefined)
    setPublisher(null)
  }

  const switchCamera = async () => {
    try {
      const devices = await OV.current.getDevices()
      var videoDevices = devices.filter(device => device.kind === 'videoinput')

      if (videoDevices && videoDevices.length > 1) {
        var newVideoDevice = videoDevices.filter(
          device => device.deviceId !== currentVideoDevice.deviceId
        )
        if (newVideoDevice.length > 0) {
          // Creating a new publisher with specific videoSource
          // In mobile devices the default and first camera is the front one
          var newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          })
          await Session.unpublish(mainStreamManager)
          await Session.publish(newPublisher)
          setCurrentVideoDevice(newVideoDevice)
          setMainStreamManager(newPublisher)
          setPublisher(newPublisher)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * --------------------------
   * SERVER-SIDE RESPONSIBILITY
   * --------------------------
   * These methods retrieve the mandatory user token from OpenVidu Server.
   * This behavior MUST BE IN YOUR SERVER-SIDE IN PRODUCTION (by using
   * the API REST, openvidu-java-client or openvidu-node-client):
   *   1) Initialize a Session in OpenVidu Server	(POST /openvidu/api/sessions)
   *   2) Create a Connection in OpenVidu Server (POST /openvidu/api/sessions/<SESSION_ID>/connection)
   *   3) The Connection.token must be consumed in Session.connect() method
   */

  const getToken = () => {
    return createSession(props.match.params.roomID).then(sessionId =>
      createToken(sessionId)
    )
  }

  const createSession = sessionId => {
    return new Promise((resolve, reject) => {
      var data = JSON.stringify({ customSessionId: sessionId })

      roomAxios
        .post(OPENVIDU_SERVER_URL + '/openvidu/api/sessions', data, {
          headers: {
            Authorization:
              'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log('CREATE SESION', response)
          resolve(response.data.id)
        })
        .catch(response => {
          var error = Object.assign({}, response)
          if (error?.response?.status === 409) {
            resolve(sessionId)
          } else {
            console.log(error)
            console.warn(
              'No connection to OpenVidu Server. This may be a certificate error at ' +
                OPENVIDU_SERVER_URL
            )
            if (
              window.confirm(
                'No connection to OpenVidu Server. This may be a certificate error at "' +
                  OPENVIDU_SERVER_URL +
                  '"\n\nClick OK to navigate and accept it. ' +
                  'If no certificate warning is shown, then check that your OpenVidu Server is up and running at "' +
                  OPENVIDU_SERVER_URL +
                  '"'
              )
            ) {
              window.location.assign(
                OPENVIDU_SERVER_URL + '/openvidu/accept-certificate'
              )
            }
          }
        })
    })
  }

  const createToken = sessionId => {
    return new Promise((resolve, reject) => {
      var data = {}
      roomAxios
        .post(
          OPENVIDU_SERVER_URL +
            '/openvidu/api/sessions/' +
            sessionId +
            '/connection',
          data,
          {
            headers: {
              Authorization:
                'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
              'Content-Type': 'application/json',
            },
          }
        )
        .then(response => {
          console.log('TOKEN', response)
          resolve(response.data.token)
        })
        .catch(error => reject(error))
    })
  }
  return (
    <div className="flex  h-screen overflow-hidden">
      <div className="relative flex flex-col flex-1 h-screen  overflow-x-hidden">
        {/*  Site header */}
        <Header />
        <div className="flex w-full h-full">
          <div className="flex flex-col w-full h-full">
            <div className="flex flex-row h-full w-full">
              {OPENVIDU_SERVER_URL}
              {OPENVIDU_SERVER_SECRET}
              {Session !== undefined ? (
                <div id="session" className="w-96">
                  <div id="session-header">
                    <h1 id="session-title">{Room}</h1>
                    <input
                      className="btn btn-large btn-danger"
                      type="button"
                      id="buttonLeaveSession"
                      onClick={leaveSession}
                      value="방 나가기"
                    />
                  </div>

                  {mainStreamManager !== undefined ? (
                    <div id="main-video" className="col-md-6">
                      <UserVideo streamManager={mainStreamManager} />
                      <input
                        className="btn btn-large btn-success"
                        type="button"
                        id="buttonSwitchCamera"
                        onClick={switchCamera}
                        value="Switch Camera"
                      />
                    </div>
                  ) : null}
                  <div id="video-container" className="col-md-6">
                    {publisher !== undefined ? (
                      <div
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() => handleMainVideoStream(publisher)}
                      >
                        <UserVideo streamManager={publisher} />
                      </div>
                    ) : null}
                    {subscribers.map((sub, i) => (
                      <div
                        key={i}
                        className="stream-container col-md-6 col-xs-6"
                        onClick={() => handleMainVideoStream(sub)}
                      >
                        <UserVideo streamManager={sub} />
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
            {/* <div className="h-24 bg-tabbg rounded-xl">
              <span>룸 이름 : {props.match.params.roomID}</span>
            </div> */}
          </div>
          <div className="w-full w-2/6 bg-videochatbg">
            <div className=" font-bold text-sm text-left p-2">
              <div className="flex w-full">
                <span className="px-2 py-1 text-sm font-bold text-blue-900  rounded-md ">
                  대화상대 명
                  {subscribers.map((user, index) => (
                    <div>{user.videos.id}</div>
                  ))}
                </span>
              </div>
              <div className="text-sm  "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Room
