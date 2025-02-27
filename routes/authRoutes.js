const express = require('express');
const { registController, loginController, currentUserController } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// routes

// REGISTER || post
router.post('/register', registController);

// LOGIN || post 
router.post('/login', loginController);

// GET CURRENR USET | get
router.get('/current-user', authMiddleware, currentUserController);


module.exports = router;