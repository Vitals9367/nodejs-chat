const {
    joinRoom,
    chatMessage,
    disconnect
} = require('./controllers/socketController');

function socketListener(io, socket){
    socket.on('joinRoom', (data) => joinRoom(data, socket, io));
    socket.on('chatMessage', (data) => chatMessage(data, socket, io));
    socket.on('disconnect', (data) => disconnect(data, socket, io));
}

module.exports = socketListener;