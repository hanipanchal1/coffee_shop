const mongoose = require('mongoose')

const menu = mongoose.Schema({
    category:{
        type:String,
        enum:['Starters','BreakFast','Lunch','Dinner','Desserts','Coffee','Mocktails'],
        default:'Coffee'
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number ,
        required:true
    },
    image:{
        type:String
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    }
},{timestamps:true})

module.exports = mongoose.model('menu',menu)