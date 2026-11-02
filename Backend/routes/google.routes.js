const jwt = require('jsonwebtoken')
const passport = require('passport')
const express = require('express')
const auth = require('../middlware/auth')

const router = express.Router()

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/google/callback',
    passport.authenticate('google', { session: false }),
    (req, res) => {
        try {
            const token = jwt.sign(
                { id: req.user._id, _id: req.user._id, email: req.user.email, role: req.user.role, name: req.user.name },
                process.env.SECRET,
                { expiresIn: '7d' }
            )

            const clientUrl = (process.env.CLIENT_URL || 'http://localhost:5173').replace(/\/+$/, '')
            return res.redirect(`${clientUrl}/auth-success?token=${token}`)
        } catch (error) {
            console.error('Google login error:', error)
            res.status(500).json({ success: false, message: "Google login failed", error: error.message })
        }
    }        
)

router.get('/me', auth, (req, res) => {
    res.json({ success: true, user: req.user })
})

module.exports = router
