const express = require('express');
const eventsRegistrationController = require('../controllers/registrationController');
const router = express.Router();

router.post('/:club/:event', eventsRegistrationController.addRegistration);

module.exports = router;
