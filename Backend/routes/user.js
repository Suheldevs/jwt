const express = require('express');
const {userPostController,userGetController,userLogInController} =require('../controller/user')
const router = express.Router();


router.post('/post',userPostController);
router.get('/get',userGetController);
router.post('/login',userLogInController);


module.exports = router;