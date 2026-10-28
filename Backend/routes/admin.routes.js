const express = require('express')
const router = express.Router()
const auth = require('../middlware/auth')
const admin = require('../middlware/admin')
const { getStats, getAllUsers, deleteUser, updateSettings, updateUser } = require('../controllers/admin.controllers')

router.get('/stats', auth, admin, getStats)
router.get('/users', auth, admin, getAllUsers)
router.put('/settings', auth, admin, updateSettings)
router.put('/users/:id', auth, admin, updateUser)
router.delete('/users/:id', auth, admin, deleteUser)

module.exports = router
