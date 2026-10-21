const mongoose = require('mongoose')

const booking = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    },
    time:{
        type:String,
        required:true
    },
    seats:{
        type:Number,
        required:true
    },
    notes:{
        type:String,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

module.exports = mongoose.model('booking',booking)