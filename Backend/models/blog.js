const mongoose = require('mongoose')

const blog = mongoose.Schema({
    image:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true})

module.exports = mongoose.model('blog',blog)