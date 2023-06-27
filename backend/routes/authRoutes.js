const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

// Login route
router.post('/login', authController.login);

// Signup route
router.post('/signup', authController.signup);

module.exports = router;
