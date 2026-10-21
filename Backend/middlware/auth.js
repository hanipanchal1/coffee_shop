const jwt = require('jsonwebtoken')

const auth = async function(req, res, next) {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ msg: 'Please login first' })
        }
        const data = jwt.verify(token, process.env.SECRET)
        req.data = data
        next()
    } catch (err) {
        return res.status(401).json({ msg: 'Invalid or expired token' })
    }
}

module.exports = auth