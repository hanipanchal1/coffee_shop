const mongoose = require('mongoose')

const comment = mongoose.Schema({
    comments:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

module.exports = mongoose.model('comment',comment)