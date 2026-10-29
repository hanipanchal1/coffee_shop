const fs = require('fs')
const path = require('path')
const mongoose = require('mongoose')
const blog = require('../models/blog')

const deleteFileIfExists = (filename) => {
    if (!filename) return
    const filePath = path.join(__dirname, '../uploads', filename)
    if (fs.existsSync(filePath)) {
        try {
            fs.unlinkSync(filePath)
        } catch (err) {
            console.warn('Could not unlink old image:', filePath, err.message)
        }
    }
}

const createBlog = async function (req, res) {
    try {
        const { image, date, title, description } = req.body || {}

        if (!title || !description) {
            return res.status(400).json({ msg: "Title and description are required" })
        }

        const uploadedFile = (req.files && req.files.length > 0)
            ? req.files[0].filename
            : (req.file ? req.file.filename : (image || null))

        const userId = req.data?._id || req.data?.id || req.user?._id || req.user?.id

        const newBlog = await blog.create({
            image: uploadedFile,
            date: date || Date.now(),
            title: title.trim(),
            description: description.trim(),
            userId
        })

        const populated = await newBlog.populate('userId', 'name email role')

        res.status(201).json({
            msg: "Blog created successfully",
            createBlog: populated,
            blog: populated
        })
    } catch (error) {
        console.error("Create Blog Error:", error)
        res.status(500).json({ message: error.message })
    }
}

const readBlog = async function (req, res) {
    try {
        const { search} = req.query || {}
        const query = {}

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
            ]
        }

        const blogs = await blog.find(query)
            .populate('userId', 'name email role')
            .sort({ createdAt: -1 })

        res.status(200).json({
            msg: "Blog List",
            readBlog: blogs,
            blogs,
            total: blogs.length
        })
    } catch (error) {
        console.error("Read Blog Error:", error)
        res.status(500).json({ message: error.message })
    }
}

const readbyIdblog = async function (req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Blog ID format" })
        }

        const foundBlog = await blog.findById(id).populate('userId', 'name email role')
        if (!foundBlog) {
            return res.status(404).json({ msg: "Blog not found" })
        }

        res.status(200).json({
            msg: "Blog fetched successfully",
            blog: foundBlog
        })
    } catch (error) {
        console.error("Get Blog By ID Error:", error)
        res.status(500).json({ message: error.message })
    }
}

const updateBlog = async function (req, res) {
    try {
        const { id } = req.params
        const { image, date, title, description } = req.body || {}

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Blog ID format" })
        }

        const check = await blog.findById(id)
        if (!check) {
            return res.status(404).json({ msg: "Blog not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id || req.user?._id || req.user?.id)?.toString()
        const isOwner = check.userId && check.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin' || req.user?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: "Unauthorized to update this blog" })
        }

        let uploadedFile = check.image
        if (req.files && req.files.length > 0) {
            uploadedFile = req.files[0].filename
            if (check.image && check.image !== uploadedFile) {
                deleteFileIfExists(check.image)
            }
        } else if (req.file) {
            uploadedFile = req.file.filename
            if (check.image && check.image !== uploadedFile) {
                deleteFileIfExists(check.image)
            }
        } else if (image !== undefined && image !== null) {
            uploadedFile = image
        }

        const updatedBlog = await blog.findByIdAndUpdate(
            id,
            {
                image: uploadedFile,
                date: date || check.date,
                title: title !== undefined ? title.trim() : check.title,
                description: description !== undefined ? description.trim() : check.description
            },
            { new: true, runValidators: true }
        ).populate('userId', 'name email role')

        res.status(200).json({
            msg: "Blog updated successfully",
            updateBlog: updatedBlog,
            blog: updatedBlog
        })
    } catch (error) {
        console.error("Update Blog Error:", error)
        res.status(500).json({ message: error.message })
    }
}

const deleteBlog = async function (req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Blog ID format" })
        }

        const check = await blog.findById(id)
        if (!check) {
            return res.status(404).json({ msg: "Blog not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id || req.user?._id || req.user?.id)?.toString()
        const isOwner = check.userId && check.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin' || req.user?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: "Unauthorized to delete this blog" })
        }

        if (check.image) {
            deleteFileIfExists(check.image)
        }

        const Delete = await blog.findByIdAndDelete(id)
        res.status(200).json({ msg: "Blog deleted successfully", deleteBlog: Delete })
    } catch (error) {
        console.error("Delete Blog Error:", error)
        res.status(500).json({ message: error.message })
    }
}

const getBlogById = readbyIdblog

module.exports = { createBlog, readBlog, readbyIdblog, getBlogById, updateBlog, deleteBlog }