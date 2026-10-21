const mongoose = require('mongoose')

const users = mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
    },
    google:{
        type:String,
    },
    avatar:{
        type:String,
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
},{timestamps:true})

module.exports = mongoose.model('users',users)