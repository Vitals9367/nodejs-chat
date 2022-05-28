const {
    formatMessage, 
    saveRoomMessage,
    getRoomMessages,
} = require('../utils/messages');

const {
    userJoin, 
    getCurrentUser, 
    getRoomUsers, 
    userLeave
} = require('../utils/users');

const botName = process.env.CHATBOT_NAME || 'ChatRoom'; 

const joinRoom = (data, socket, io) => {
    const { username, room } = data;

    const user = userJoin(socket.id, username, room);
    const roomMessages = getRoomMessages(user.room);

    socket.join(user.room);

    socket.emit('message', formatMessage(botName,'Welcome to the chat'));
    socket.emit('serverLoadMessages', roomMessages);

    // on user connect
    socket.broadcast.to(user.room).emit('message',formatMessage(botName,`${user.username} has joined the chat`));

    io.to(user.room).emit('roomUsers',{
        room: user.room,
        users: getRoomUsers(user.room),
    })

}

const chatMessage = (data, socket, io) => {
    const { message } = data;

    const user = getCurrentUser(socket.id);
    const formatedMessage = formatMessage(user.username,message);

    saveRoomMessage(formatedMessage, user.room);
    io.to(user.room).emit('message',formatedMessage);
}

const disconnect = (data, socket, io) => {
    const user = userLeave(socket.id);

    if(user){
        io.to(user.room).emit('message',formatMessage(botName,`${user.username} has left the chat`));

        io.to(user.room).emit('roomUsers',{
            room: user.room,
            users: getRoomUsers(user.room),
        })
    }
}

module.exports = {
    joinRoom,
    chatMessage,
    disconnect,
}