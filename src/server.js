const { createServer } = require('http')
const { Server } = require('socket.io')
const { instrument } = require('@socket.io/admin-ui')
const express = require('express')
const app = express()
const httpServer = createServer(app)
import { useSelector } from 'react-redux'
const currentRoom = {}
const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['PUT', 'GET', 'POST', 'DELETE', 'OPTIONS'],
    credentials: true,
  },
})

instrument(io, {
  auth: false,
})

function countRoom(roomName, currentUser) {
  if (!currentRoom.users) {
    currentRoom.users = [currentUser]
  } else {
    currentRoom.users = currentRoom.users.filter(user => {
      if (user.email != currentUser.email) {
        return user
      }
    })
    currentRoom.users = [...currentRoom.users, currentUser]
  }

  currentRoom.peopleLength = currentRoom.users.length

  return currentRoom
}
function publicRooms() {
  const {
    sockets: {
      adapter: { sids, rooms },
    },
  } = io

  const publicRooms = []
  rooms.forEach((_, key) => {
    if (sids.get(key) === undefined) {
      publicRooms.push(key)
    }
  })
  return publicRooms
}
io.on('connection', socket => {
  socket.on('enter_room', (roomname, user) => {
    socket.join(roomname)
    console.log(roomname)
    io.sockets.emit('room_change', countRoom(roomname, user))
  })

  socket.on('alert', touserid => {
    //alet 이벤트로 데이터 받기
    io.to(touserid).emit('alert', `${touserid}`) //touserid: 클라이언트1이 보낸데이터"hwi"
    console.log('userid로' + touserid)
  })
})
httpServer.listen(5000)
