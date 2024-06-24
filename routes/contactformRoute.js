const express = require('express');
const router = express.Router();
const { sendContactForm} = require('../controllers/contactFormController');

router.post('/sendcontactform',sendContactForm);

module.exports = router;