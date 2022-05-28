const express = require('express');

const { checkRoomParameters } = require('./middleware');
const { chat } = require('./controllers/chatController');
const { login } = require('./controllers/loginController');

const router = express.Router();

router.use('/chat', checkRoomParameters, chat);
router.use('/', login);

module.exports = router;