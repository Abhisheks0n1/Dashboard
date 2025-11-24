const express = require('express');
const router = express.Router();


const { register, login, logout } = require('../controllers/authController');
const { getDashboard, saveDashboard } = require('../controllers/dashboardController');
const authenticate = require('../middleware/authMiddleware');


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);


router.get('/dashboard', authenticate, getDashboard);
router.post('/dashboard', authenticate, saveDashboard);

module.exports = router;