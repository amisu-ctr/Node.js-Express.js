let readyPlayerCount = 0;

function listen(io) {
    const pongNamespace = io.of('/pong');
    pongNamespace.on('connection', (socket) => {
        let room
        console.log('a user connected', socket.id);

        socket.on('ready', () => {
             room = 'room' + Math.floor(readyPlayerCount / 2);
            socket.join(room);

            console.log('Player ready', socket.id, room);

            readyPlayerCount++;

            //allows players to restart the game when there's been a disconnect. Checks for an even amount of players. There always need to be pairs of two players ready for pong
            if (readyPlayerCount % 2 === 0) {
                pongNamespace.in(room).emit('startGame', socket.id);
            }
        });

        socket.on('paddleMove', (paddleData) => {
            socket.to(room).broadcast.emit('paddleMove', paddleData);
        });

        socket.on('ballMove', (ballData) => {
            socket.to(room).broadcast.emit('ballMove', ballData);
        });

        socket.on('disconnect', (reason) => {
            console.log(`Client ${socket.id} disconnected: ${reason}`);
            socket.leave(room);
        });
    })
}

module.exports = {
    listen,
};
