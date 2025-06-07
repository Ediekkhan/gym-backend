const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
// router.get('/me', authenticateToken, getProfile);
// router.post('/logout', authenticateToken, logout);

module.exports = router;
