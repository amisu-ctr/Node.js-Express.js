const http = require('http')
const io = require('socket.io')

const apiServer = require('./api')
const httpServer = http.createServer(apiServer)
const socketServer = io(httpServer)

const sockets = require('./sockets')

const PORT = 3001;
httpServer.listen(PORT);
console.log('Listening on port 3001...')

sockets.listen(socketServer)

