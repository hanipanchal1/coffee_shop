const menu = require('../models/menu')

const createMenu = async function (req,res){
    try{
        const {category,name,description,price,image} = req.body
        
        if (!category || !name || !description || !price) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        const uploadedFile = req.files && req.files.length > 0 ? req.files[0].filename : null
        const userId = req.data?._id || req.data?.id

        const Create = await menu.create({
            category,
            name,
            description,
            price,
            image: uploadedFile,
            userId
        })
        await Create.populate('userId', 'name role').sort({ createdAt: -1 })
        res.status(201).json({ msg: "Menu item created successfully", createMenu: Create })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const readMenu = async function (req, res) {
    try {
        const Read = await menu.find().populate('userId', 'name role').sort({ createdAt: -1 })
        res.status(200).json({ msg: "Menu List", readMenu: Read })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const updateMenu = async function(req,res){
    try{
        const {id} = req.params
        const { category, name, description, price } = req.body

        const menuItem = await menu.findById(id)

        if (!menuItem) {
            return res.status(404).json({ msg: "Menu item not found" })
        }

        const currentUserId = (req.data?._id || req.data?.id)?.toString()
        const isOwner = menuItem.userId && menuItem.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        const uploadedFile = req.files && req.files.length > 0 ? req.files[0].filename : menuItem.image

        const Update = await menu.findByIdAndUpdate(
            id,
            { category, name, description, price, image: uploadedFile },
            { new: true }
        ).populate('userId', 'name role')
        res.status(200).json({ msg: 'Menu updated successfully', updatedMenu: Update })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const deleteMenu = async function (req, res) {
    try {
        const { id } = req.params

        const menuItem = await menu.findById(id)

        if (!menuItem) {
            return res.status(404).json({ msg: 'Menu item not found' })
        }

        const currentUserId = (req.data?._id || req.data?.id)?.toString()
        const isOwner = menuItem.userId && menuItem.userId.toString() === currentUserId
        const isAdmin = req.data?.role === 'admin'

        if (!isAdmin && !isOwner) {
            return res.status(403).json({ msg: 'Unauthorized' })
        }

        const Delete = await menu.findByIdAndDelete(id)
        res.status(200).json({ msg: 'Menu deleted successfully', deleteMenu: Delete })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createMenu, readMenu, updateMenu, deleteMenu }