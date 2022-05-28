const path = require('path');
const projectRootPath = require('../utils/path');

exports.chat = (req,res,next) => {
    res.sendFile(path.join(projectRootPath,'client','html','chat.html'))
};

