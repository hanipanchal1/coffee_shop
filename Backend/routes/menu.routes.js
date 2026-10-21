const express = require('express')
const router = express.Router()

const{createMenu,readMenu,updateMenu,deleteMenu} = require('../controllers/menu.controllers')
const auth = require('../middlware/auth')
const admin = require('../middlware/admin')

const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    crypto.randomBytes(16, function (err, raw) {
      if (err) return cb(err)
      cb(null, file.fieldname + '-' + raw.toString('hex') + path.extname(file.originalname))
    })
  }
})

const upload = multer({ storage: storage })

router.get('/read', readMenu)

router.post('/create', auth, admin, upload.any(), createMenu)
router.put('/update/:id', auth, admin, upload.any(), updateMenu)
router.delete('/delete/:id', auth, admin, deleteMenu)

module.exports = router