const path = require('path');
const projectRootPath = require('../utils/path');

exports.login = (req,res,next) => {
    res.sendFile(path.join(projectRootPath,'client','html','index.html'))
};