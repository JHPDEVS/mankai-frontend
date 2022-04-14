const { createServer } = require('http')
const { Server } = require('socket.io')
const { instrument } = require('@socket.io/admin-ui')
const express = require('express')
const app = express()
const httpServer = createServer(app)
import { useSelector } from 'react-redux'
const rooms = []
const allClients = []
const user_info = {}
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
  return rooms[roomName]
}
function minusUser(currentUser) {
  currentRoom.users = currentRoom.users.filter(user => {
    if (user.email != currentUser.email) {
      return user
    }
  })
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
    io.sockets.to(roomname).emit('welcome')
    allClients.push(socket)
    socket.user = user
    socket.join(roomname)
    console.log(roomname)
    if (!rooms[roomname]) {
      rooms[roomname] = {}
    }

    if (!rooms[roomname].user) {
      rooms[roomname].user = [socket.user]
    } else {
      rooms[roomname].user = rooms[roomname].user.filter(user => {
        if (user.email != socket.user.email) {
          return user
        }
      })
      rooms[roomname].user = [...rooms[roomname].user, socket.user]
    }
    io.sockets.emit('room_change', countRoom(roomname, user))
  })

  socket.on('offer', (offer, roomName) => {
    io.sockets.to(roomName).emit('offer', offer)
  })
  socket.on('answer', (answer, roomName) => {
    socket.to(roomName).emit('answer', answer)
  })
  socket.on('ice', (ice, roomName) => {
    socket.to(roomName).emit('ice', ice)
  })
  socket.on('disconnect', function () {
    io.sockets.emit('user_exit')

    var i = allClients.indexOf(socket)
    allClients.splice(i, 1)
    console.log(allClients)
  })
  socket.on('alert', touserid => {
    //alet 이벤트로 데이터 받기
    io.to(touserid).emit('alert', `${touserid}`) //touserid: 클라이언트1이 보낸데이터"hwi"
    console.log('userid로' + touserid)
  })
})
httpServer.listen(5000)
