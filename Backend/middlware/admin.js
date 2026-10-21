const admin = (req, res, next) => {
    if (!req.data || req.data.role !== 'admin') {
        return res.status(403).json({ msg: "Access denied. Only admin can perform this action." })
    }
    next()
}

module.exports = admin