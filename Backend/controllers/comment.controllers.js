const comment = require('../models/comment')
const menu = require('../models/menu')

const createComment = async function(req,res){
    try{
        const {comments,name,email}=req.body
        
        if (!comments || !name || !email ) {
            return res.status(400).json({ msg: "All fields are required" })
        }

        const userId = req.data?._id || req.data?.id || null

        const Create = await comment.create({
            comments,
            name,
            email,
            userId
        })
        await Create.populate('userId', 'name role').sort({ createdAt: -1 })
        res.status(201).json({msg: "Comment created successfully",createComment:Create})
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const readComment = async function(req,res){
    try{
        const Read = await comment.find().sort({createdAt:-1})
        res.status(200).json({msg:"Comment List",readComment:Read})
    }catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const updateComment = async function(req, res) {
    try {
        const { id } = req.params
        const { comments, name, email } = req.body

        const existingComment = await comment.findById(id)

        if (!existingComment) {
            return res.status(404).json({ msg: "Comments item not found" })
        }

        const Update = await comment.findByIdAndUpdate(
            id,
            { comments, name, email },
            { new: true }
        )
        res.status(200).json({ msg: 'Comment updated successfully', updatedComment: Update })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

const deleteComment = async function(req, res) {
    try {
        const { id } = req.params
        const existingComment = await comment.findById(id)

        if (!existingComment) {
            return res.status(404).json({ msg: 'Comment not found' })
        }

        const Delete = await comment.findByIdAndDelete(id)
        res.status(200).json({ msg: "Comment deleted successfully", deleteComment: Delete })
    } catch (err) {
        console.error(err)
        res.status(500).json({ message: err.message })
    }
}

module.exports = { createComment, readComment, updateComment, deleteComment }
