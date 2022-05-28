const http = require('http');
const socketio = require('socket.io');
const express = require('express');

const bodyParser = require('body-parser');
const path = require('path');
const rootProjectPath = require('./utils/path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

const routes = require('./routes');
const socketListener = require('./sockets');
const { winstonLogger } = require('./middleware');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(winstonLogger);
app.use(express.static(path.join(rootProjectPath,'client','public')));

app.use(routes);

io.on('connection', socket => socketListener(io, socket));

server.listen(PORT);