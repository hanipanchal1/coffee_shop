const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// import { generateState, generateCodeVerifier } from "arctic";

const register = async function(req,res){
try{
    const {name, email,password,role} = req.body

    if(!name || !email || !password || !role){
        return res.status(401).json({message:'All fields are required'})
    }

    const exist = await User.findOne({email})

    if(exist){
        return res.status(400).json({msg:'User already exists'})
    }

    const newPass = await bcrypt.hash(password,10)
        if(!newPass){
            return res.status(400).json({msg:"something went wrong"})
        }

    const newUser = await User.create({
        name,
        email,
        password:newPass,
        role
    })
    res.status(201).json({msg:'User created successfully',register:newUser})
}catch(err){
    res.status(500).json({ message: err.message });
}
}

const login = async function(req,res){
    try{
        const {email,password} = req.body
        if(!email || !password){
            return res.status(401).json({message:'All fields are required'})
        }

        const exist = await User.findOne({email})

        if(!exist){
            return res.status(404).json({msg:'User not found'})
        }

        const valPass = await bcrypt.compare(password, exist.password)
        if(!valPass){
                return res.status(400).json({msg:"something went wrong"})
        }

        const token = jwt.sign({ _id: exist._id, id: exist._id, role: exist.role }, process.env.SECRET)
        res.cookie('token',token)
        res.status(200).json({msg:'Login successful',user: exist, token})
    }
    catch(err){
    res.status(500).json({ message: err.message });
    }
}

// const google = async function(req,res){
//     const state = generateState();
//     const codeVerifier = generateCodeVerifier();
//     const url = google.createAuthorizationURL(state, codeVerifier,['openid','profile','email']);
// }

const logout = async function(req,res){
    try{
        res.clearCookie('token')
        res.status(200).json({msg:'logout successfully'})
    }
    catch(err){
    res.status(500).json({ message: err.message });
    }
}

module.exports = {register,login,logout}