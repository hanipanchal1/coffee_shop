const mongoose = require('mongoose')
const menu = require('../models/menu')
const { uploadToCloudinary, deleteFromCloudinary } = require('../middlware/cloudinaryUpload')

const createMenu = async function (req, res) {
    try {
        const { category, name, description, price } = req.body

        if (!category || !name || !description || !price) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        // Upload image to Cloudinary if a file was sent
        let imageUrl = null
        if (req.file && req.file.buffer) {
            imageUrl = await uploadToCloudinary(req.file.buffer, 'coffee-shop/menu')
        }

        const userId = req.data?._id || req.data?.id || req.user?._id || req.user?.id

        const createMenuItem = await menu.create({
            category: category.trim(),
            name: name.trim(),
            description: description.trim(),
            price: Number(price),
            image: imageUrl,
            userId
        })
        await createMenuItem.populate('userId', 'name role')
        res.status(201).json({ msg: "Menu item created successfully", createMenu: createMenuItem, menuItem: createMenuItem })
    } catch (err) {
        console.error('Create Menu Error:', err)
        res.status(500).json({ message: err.message })
    }
}

const readMenu = async function (req, res) {
    try {
        const { category, search } = req.query || {}
        const query = {}

        if (category && category !== "All") {
            query.category = { $regex: new RegExp(`^${category}$`, 'i') }
        }

        if (search) {
            query.$or = [
                { name: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } },
                { category: { $regex: search, $options: 'i' } }
            ]
        }

        const Read = await menu.find(query).populate('userId', 'name role').sort({ createdAt: -1 })
        res.status(200).json({ msg: "Menu List", readMenu: Read, menuItems: Read })
    } catch (err) {
        console.error('Read Menu Error:', err)
        res.status(500).json({ message: err.message })
    }
}

const getMenuById = async function (req, res) {
    try {
        const { id } = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Menu item ID format" })
        }
        const item = await menu.findById(id).populate('userId', 'name role')
        if (!item) {
            return res.status(404).json({ msg: "Menu item not found" })
        }
        res.status(200).json({ msg: "Menu item found", menuItem: item })
    } catch (err) {
        console.error('Get Menu By ID Error:', err)
        res.status(500).json({ message: err.message })
    }
}

const updateMenu = async function (req, res) {
    try {
        const { id } = req.params
        const { category, name, description, price } = req.body

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Menu item ID format" })
        }

        const menuItem = await menu.findById(id)
        if (!menuItem) {
            return res.status(404).json({ msg: "Menu item not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id || req.user?._id || req.user?.id)?.toString()
        const isOwner = menuItem.userId && menuItem.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin' || req.user?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        // If a new image was uploaded, delete the old one from Cloudinary and upload the new one
        let imageUrl = menuItem.image
        if (req.file && req.file.buffer) {
            await deleteFromCloudinary(menuItem.image)
            imageUrl = await uploadToCloudinary(req.file.buffer, 'coffee-shop/menu')
        }

        const Update = await menu.findByIdAndUpdate(
            id,
            {
                category: category !== undefined ? category.trim() : menuItem.category,
                name: name !== undefined ? name.trim() : menuItem.name,
                description: description !== undefined ? description.trim() : menuItem.description,
                price: price !== undefined ? Number(price) : menuItem.price,
                image: imageUrl
            },
            { new: true }
        ).populate('userId', 'name role')

        res.status(200).json({ msg: 'Menu updated successfully', updatedMenu: Update, menuItem: Update })
    } catch (err) {
        console.error('Update Menu Error:', err)
        res.status(500).json({ message: err.message })
    }
}

const deleteMenu = async function (req, res) {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ msg: "Invalid Menu item ID format" })
        }

        const menuItem = await menu.findById(id)
        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' })
        }

        const currentUserId = (req.data?._id || req.data?.id || req.user?._id || req.user?.id)?.toString()
        const isOwner = menuItem.userId && menuItem.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin' || req.user?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        // Delete image from Cloudinary before removing the DB record
        if (menuItem.image) {
            await deleteFromCloudinary(menuItem.image)
        }

        const Delete = await menu.findByIdAndDelete(id)
        res.status(200).json({ msg: 'Menu deleted successfully', deleteMenu: Delete, menuItem: Delete })
    } catch (err) {
        console.error('Delete Menu Error:', err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createMenu, readMenu, getMenuById, updateMenu, deleteMenu }
