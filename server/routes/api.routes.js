const express = require('express');
const router = express.Router();

const users_controller  =  require('../controller/user.controller');

router.use('/users', users_controller);


module.exports = router;