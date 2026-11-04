const express = require('express')
const router = express.Router()

const { createBlog, readBlog, readbyIdblog, updateBlog, deleteBlog } = require('../controllers/blog.controllers')
const auth = require('../middlware/auth')
const admin = require('../middlware/admin')
const { upload } = require('../middlware/cloudinaryUpload')

router.post('/create', auth, admin, upload.single('image'), createBlog)
router.get('/read', readBlog)
router.get('/readbyIdblog/:id', readbyIdblog)
router.get('/read/:id', readbyIdblog)
router.put('/update/:id', auth, admin, upload.single('image'), updateBlog)
router.delete('/delete/:id', auth, admin, deleteBlog)

module.exports = router
