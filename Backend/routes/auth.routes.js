const express = require('express')
const router = express.Router()

const {register,login,logout} = require('../controllers/auth.controllers')
const auth = require('../middlware/auth')

router.post('/register',register)
router.post('/login',login)
router.get('/logout',logout)

module.exports = router