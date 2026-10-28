const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
    image: {
        type: String,
        default: null
    },
    date: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: [true, "Blog title is required"],
        trim: true
    },
    description: {
        type: String,
        required: [true, "Blog description is required"],
        trim: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true })

module.exports = mongoose.model('blog', blogSchema)