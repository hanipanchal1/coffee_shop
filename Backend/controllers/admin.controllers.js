const User = require('../models/auth')
const booking = require('../models/booking')
const comment = require('../models/comment')
const menu = require('../models/menu')
const blog = require('../models/blog')

const getStats = async function(req, res) {
    try {
        const [totalUsers, totalBookings, totalComments, totalMenu, totalBlog] = await Promise.all([
            User.countDocuments(),
            booking.countDocuments(),
            comment.countDocuments(),
            menu.countDocuments(),
            blog.countDocuments().catch(() => 0)
        ])

        const recentBookings = await booking.find().sort({ createdAt: -1 }).limit(5)
        const recentComments = await comment.find().sort({ createdAt: -1 }).limit(5)

        res.status(200).json({
            msg: 'Dashboard stats fetched successfully',
            stats: {
                totalUsers,
                totalBookings,
                totalComments,
                totalMenu,
                totalBlog
            },
            recentBookings,
            recentComments
        })
    } catch (err) {
        console.error('Error fetching admin stats:', err)
        res.status(500).json({ message: err.message })
    }
}

const getAllUsers = async function(req, res) {
    try {
        const users = await User.find().select('-password').sort({ createdAt: -1 })
        res.status(200).json({ msg: 'Users list', users })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

const deleteUser = async function(req, res) {
    try {
        const { id } = req.params
        const deleted = await User.findByIdAndDelete(id)
        if (!deleted) {
            return res.status(404).json({ msg: 'User not found' })
        }
        res.status(200).json({ msg: 'User deleted successfully', deletedUser: deleted })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getStats, getAllUsers, deleteUser }
