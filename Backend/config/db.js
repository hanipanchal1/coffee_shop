const mongoose = require('mongoose')

const connect = async () =>{
    await mongoose.connect(process.env.URL)
    console.log("connected")
}

module.exports = connect