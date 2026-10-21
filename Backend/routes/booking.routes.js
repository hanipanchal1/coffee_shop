const express = require('express')
const router = express.Router()

const{createbooking,readbooking,deletebooking} = require('../controllers/booking.controllers')
const admin = require('../middlware/admin')
const auth = require('../middlware/auth')

router.post('/create',createbooking)
router.get('/read',auth,admin,readbooking)
router.delete('/delete/:id',auth,admin,deletebooking)

module.exports = router