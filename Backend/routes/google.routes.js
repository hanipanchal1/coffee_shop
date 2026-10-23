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

            if (process.env.CLIENT_URL) {
                return res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`)
            }

            // Direct JSON response in Chrome browser
            res.json({
                success: true,
                message: "Google login successful!",
                token,
                user: req.user
            })
        } catch (error) {
            console.error('Google login error:', error)
            res.status(500).json({ success: false, message: "Google login failed", error: error.message })
        }
    }        
)

router.get('/me',auth,(req,res) =>{
    res.json({success:true, user:req.user})
})

module.exports = router