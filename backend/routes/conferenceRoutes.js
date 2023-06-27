const express = require('express');
const conferenceController = require('../controllers/conferenceController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Generate conference link route
router.post('/generateLink', authMiddleware.authenticateStrict, conferenceController.generateLink);

// Verify conference ID route
router.get('/verify-conference-id/:id', authMiddleware.authenticate, conferenceController.verifyConferenceId);

module.exports = router;
