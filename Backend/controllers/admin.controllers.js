const User = require('../models/auth')
const booking = require('../models/booking')
const comment = require('../models/comment')
const menu = require('../models/menu')
const blog = require('../models/blog')
const jwt = require('jsonwebtoken')

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

// Update current admin/user settings (Update Name and Role only)
const updateSettings = async function(req, res) {
    try {
        const userId = req.data?.id || req.data?._id
        if (!userId) {
            return res.status(401).json({ msg: 'Unauthorized: User not identified' })
        }

        const { name, role } = req.body

        if (name === undefined && role === undefined) {
            return res.status(400).json({ msg: 'Please provide name or role to update' })
        }

        const updateData = {}
        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ msg: 'Name cannot be empty' })
            }
            updateData.name = name.trim()
        }

        if (role !== undefined) {
            if (!['admin', 'user'].includes(role)) {
                return res.status(400).json({ msg: "Role must be either 'admin' or 'user'" })
            }
            updateData.role = role
        }

        // Strictly update Name and Role ONLY
        const updated = await User.findByIdAndUpdate(
            userId,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password')

        if (!updated) {
            return res.status(404).json({ msg: 'User not found' })
        }

        // Issue refreshed JWT token containing updated name and role
        const newToken = jwt.sign(
            { _id: updated._id, id: updated._id, role: updated.role, email: updated.email, name: updated.name },
            process.env.SECRET,
            { expiresIn: '7d' }
        )
        res.cookie('token', newToken)

        res.status(200).json({
            msg: 'Settings updated successfully (Name and Role only)',
            user: updated,
            token: newToken
        })
    } catch (err) {
        console.error('Error updating settings:', err)
        res.status(500).json({ message: err.message })
    }
}

// Update a specific user (Update Name and Role only)
const updateUser = async function(req, res) {
    try {
        const { id } = req.params
        const { name, role } = req.body

        if (name === undefined && role === undefined) {
            return res.status(400).json({ msg: 'Please provide name or role to update' })
        }

        const updateData = {}
        if (name !== undefined) {
            if (typeof name !== 'string' || !name.trim()) {
                return res.status(400).json({ msg: 'Name cannot be empty' })
            }
            updateData.name = name.trim()
        }

        if (role !== undefined) {
            if (!['admin', 'user'].includes(role)) {
                return res.status(400).json({ msg: "Role must be either 'admin' or 'user'" })
            }
            updateData.role = role
        }

        // Strictly update Name and Role ONLY
        const updated = await User.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select('-password')

        if (!updated) {
            return res.status(404).json({ msg: 'User not found' })
        }

        let newToken = null
        const currentUserId = req.data?.id || req.data?._id
        if (currentUserId && currentUserId.toString() === updated._id.toString()) {
            newToken = jwt.sign(
                { _id: updated._id, id: updated._id, role: updated.role, email: updated.email, name: updated.name },
                process.env.SECRET,
                { expiresIn: '7d' }
            )
            res.cookie('token', newToken)
        }

        res.status(200).json({
            msg: 'User updated successfully (Name and Role only)',
            user: updated,
            token: newToken
        })
    } catch (err) {
        console.error('Error updating user:', err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = { getStats, getAllUsers, deleteUser, updateSettings, updateUser }

