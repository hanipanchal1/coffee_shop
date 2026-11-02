const express = require('express')
const router = express.Router()

const { createMenu, readMenu, getMenuById, updateMenu, deleteMenu } = require('../controllers/menu.controllers')
const auth = require('../middlware/auth')
const admin = require('../middlware/admin')
const { upload } = require('../middlware/cloudinaryUpload')

router.get('/read', readMenu)
router.get('/read/:id', getMenuById)
router.post('/create', auth, admin, upload.single('image'), createMenu)
router.put('/update/:id', auth, admin, upload.single('image'), updateMenu)
router.delete('/delete/:id', auth, admin, deleteMenu)

module.exports = router
