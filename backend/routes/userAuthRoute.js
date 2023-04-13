const express = require('express');
const router = express.Router();
const userRouteController = require('../route-controllers/userRouteController.js');

router.post('/register', userRouteController.registerNewUser);

module.exports = router;