const express = require('express')
const router = express.Router()

const {createComment,readComment,updateComment,deleteComment} = require('../controllers/comment.controllers')

router.post('/create',createComment)
router.get('/read',readComment)
router.put('/update/:id',updateComment)
router.delete('/delete/:id',deleteComment)

module.exports = router