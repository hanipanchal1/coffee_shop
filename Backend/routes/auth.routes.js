const express = require('express')
const router = express.Router()

const { register, login, logout } = require('../controllers/auth.controllers')
const auth = require('../middlware/auth')
const { authLimiter } = require('../middlware/rateLimiter')

// Strict rate limiting on authentication routes (10 attempts / 15 min)
router.post('/register', authLimiter, register)
router.post('/login', authLimiter, login)
router.get('/logout', logout)

module.exports = router
