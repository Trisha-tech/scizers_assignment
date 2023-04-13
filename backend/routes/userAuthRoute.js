const express = require('express');
const router = express.Router();
const userRouteController = require('../route-controllers/userRouteController.js');

router.post('/register', userRouteController.registerNewUser);

router.post('/login', userRouteController.loginUser);

module.exports = router;