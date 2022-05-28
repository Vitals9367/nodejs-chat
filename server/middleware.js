const expressWinston = require('express-winston');
const winston = require('winston'); 

const checkRoomParameters = (req, res, next) => {

    const username = req.query.username;
    const room = req.query.room;

    if(username === undefined || room === undefined)
        return res.redirect('/');

    if(username.trim() === '' || room.trim() === '')
        return res.redirect('/');

    next();
}

const winstonLogger = expressWinston.logger({
    transports: [
      new winston.transports.Console()
    ],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    meta: false, 
});

module.exports = {
    checkRoomParameters,
    winstonLogger,
}