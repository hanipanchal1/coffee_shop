const blog = require('../models/blog')

const createBlog = async function (req, res) {
    try {
        const { image, date, title, description } = req.body || {}

        if (!title || !description) {
            return res.status(400).json({ msg: "Title and description are required" })
        }

        const uploadedFile = (req.files && req.files.length > 0) ? req.files[0].filename : (image || null)
        const userId = req.data?._id || req.data?.id

        const Create = await blog.create({
            image: uploadedFile,
            date: date || Date.now(),
            title,
            description,
            userId
        })
        const populate = await Create.populate('userId', 'name role')
        res.status(201).json({ msg: "Blog created successfully", createBlog: Create })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const readBlog = async function (req, res) {
    try {
        const Read = await blog.find().populate('userId', 'name role').sort({ createdAt: -1 })
        res.status(200).json({ msg: "Blog List", readBlog: Read })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const updateBlog = async function (req, res) {
    try {
        const { id } = req.params
        const { image, date, title, description } = req.body || {}

        const check = await blog.findById(id)

        if (!check) {
            return res.status(404).json({ msg: "Blog not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id)?.toString()
        const isOwner = check.userId && check.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        const uploadedFile = (req.files && req.files.length > 0) ? req.files[0].filename : (image || check.image)

        const Update = await blog.findByIdAndUpdate(
            id,
            { image: uploadedFile, date: date || check.date, title: title || check.title, description: description || check.description },
            { new: true }
        ).populate('userId', 'name role')
        res.status(200).json({ msg: "Blog updated successfully", updateBlog: Update })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

const deleteBlog = async function (req, res) {
    try {
        const { id } = req.params
        const check = await blog.findById(id)

        if (!check) {
            return res.status(404).json({ msg: "Blog not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id)?.toString()
        const isOwner = check.userId && check.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        const Delete = await blog.findByIdAndDelete(id)
        res.status(200).json({ msg: "Blog deleted successfully", deleteBlog: Delete })
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

module.exports = { createBlog, readBlog, updateBlog, deleteBlog }