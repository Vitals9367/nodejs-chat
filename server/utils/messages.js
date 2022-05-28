const moment = require('moment');

const messagesList = [];

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a'),
    }
}

function getRoomMessages(room) {
    return messagesList.filter(messageObject => messageObject.room === room);
}

function saveRoomMessage(formatedMessage,room){
    const roomMessage = {
        ...formatedMessage,
        room,
    };

    messagesList.push(roomMessage);
}

module.exports = {
    formatMessage,
    saveRoomMessage,
    getRoomMessages,
};