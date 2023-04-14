const express = require('express');
const router = express.Router();
const contactRouteController = require('../route-controllers/contactRouteController.js');
const auth = require("../middleware/userAuth.js");

router.post('/create', auth, contactRouteController.createNewContact);

router.get('/myContacts', auth, contactRouteController.getMyContacts);

router.put('/edit', auth, contactRouteController.editContact);

module.exports = router;