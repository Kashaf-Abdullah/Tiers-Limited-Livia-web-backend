// formRoute.js

const express = require('express');
const router = express.Router();
const { submitForm } = require('../controllers/formController');

router.post('/sendEmail', submitForm);

module.exports = router;
