const express = require('express');

const resetController = require('../controllers1/resetpassword');

const router = express.Router();

router.get('/updatepassword/:resetpasswordid', resetController.updatepassword)

router.get('/resetpassword/:id', resetController.resetpassword)

router.use('/forgotpassword', resetController.forgotpassword)


module.exports = router;