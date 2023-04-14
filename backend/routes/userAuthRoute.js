const express = require('express');
const router = express.Router();
const userRouteController = require('../route-controllers/userRouteController.js');
const auth = require("../middleware/userAuth.js");

router.post('/register', userRouteController.registerNewUser);

router.post('/login', userRouteController.loginUser);

router.get('/myProfile',auth, userRouteController.myProfile);

module.exports = router;