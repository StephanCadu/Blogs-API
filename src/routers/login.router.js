const express = require('express');
const { validateLogin } = require('../middlewares');
const { userController } = require('../controllers');

const router = express.Router();

router.post('/', validateLogin, userController.login);

module.exports = router;