const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const sidebarRoomName = document.getElementById('chat-sidebar__room-name');
const sidebarUserList = document.getElementById('chat-sidebar__user-list');

const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true});

const socket = io();

socket.emit('joinRoom', { username, room });

socket.on('roomUsers',({ room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

socket.on('serverLoadMessages',(messages) => {
    messages.forEach(msg => outputChatMessage(msg))
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

socket.on('message',(message) => {
    outputChatMessage(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
})

chatForm.addEventListener('submit',e => {
    e.preventDefault();

    const message = e.target.elements.msg.value;
    e.target.elements.msg.value = "";

    socket.emit('chatMessage',{message});
})


function outputChatMessage(message){
    const div = document.createElement('div');

    div.className = "chat-message";

    div.innerHTML = `<p class="chat-message-user">${message.username} <span class="chat-message-date">${message.time}</span></p>
    <p class="chat-message-text">
        ${message.text}
    </p>
    `

    chatMessages.append(div);
}

function outputRoomName (room){
    sidebarRoomName.innerHTML = `${room}`;
}

function outputUsers (users){

    sidebarUserList.innerHTML = '';

    const appenUserList = (user) => {
        const p = document.createElement('p');
        p.className = "chat-sidebar-user";
        p.innerHTML = `${user.username}`;

        sidebarUserList.append(p);
    }

    users.forEach(user => appenUserList(user))
}