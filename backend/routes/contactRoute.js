const express = require('express');
const router = express.Router();
const contactRouteController = require('../route-controllers/contactRouteController.js');
const auth = require("../middleware/userAuth.js");

router.post('/create', auth, contactRouteController.createNewContact);

router.get('/myContacts', auth, contactRouteController.getMyContacts);

router.put('/edit', auth, contactRouteController.editContact);

router.delete('/delete/:id', auth, contactRouteController.deleteContact);

router.get('/getContact/:id', auth, contactRouteController.deleteContact);

module.exports = router;