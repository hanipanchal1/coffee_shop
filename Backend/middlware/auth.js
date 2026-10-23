const jwt = require('jsonwebtoken')

// ─────────────────────────────────────────────────────────────
//  Auth Middleware
//
//  Checks for a JWT token in TWO places (in order):
//    1. req.cookies.token          → set by cookie-based login
//    2. Authorization: Bearer <token>  → set by localStorage-based login
//
//  We check both so the system works whether the token is stored
//  in a cookie OR in localStorage.
// ─────────────────────────────────────────────────────────────

const auth = async function(req, res, next) {
    try {
        // 1. Try cookie first
        let token = req.cookies.token

        // 2. If no cookie, try Authorization header (Bearer token)
        if (!token) {
            const authHeader = req.headers.authorization
            if (authHeader && authHeader.startsWith('Bearer ')) {
                token = authHeader.split(' ')[1]
            }
        }

        if (!token) {
            return res.status(401).json({ msg: 'Please login first' })
        }

        const data = jwt.verify(token, process.env.SECRET)
        req.user = data   // attach decoded user to request
        req.data = data   // keep backward compatibility
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid or expired token' })
    }
}

module.exports = auth