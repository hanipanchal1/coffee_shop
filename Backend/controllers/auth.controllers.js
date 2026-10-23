const User = require('../models/auth')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// import { generateState, generateCodeVerifier } from "arctic";

const register = async function(req,res){
try{
    const {name, email,password,role} = req.body

    if(!name || !email || !password || !role){
        return res.status(400).json({message:'All fields are required'})
    }

    const exist = await User.findOne({email})

    if(exist){
        // If account was created with Google (no password set), allow them to add password & role
        if(!exist.password){
            const newPass = await bcrypt.hash(password,10)
            exist.password = newPass
            if(name) exist.name = name
            if(role) exist.role = role
            await exist.save()
            return res.status(200).json({msg:'Password set successfully for your account! You can now login.',register:exist})
        }
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
            return res.status(400).json({message:'All fields are required'})
        }

        const exist = await User.findOne({email})

        if(!exist){
            return res.status(404).json({msg:'User not found'})
        }

        // Account was created with Google and doesn't have a password
        if(!exist.password){
            return res.status(400).json({
                msg:'This account was registered using Google. Please click "Login with Google", or register on the Register page with this email to set a password.'
            })
        }

        const valPass = await bcrypt.compare(password, exist.password)
        if(!valPass){
            return res.status(400).json({msg:"Invalid email or password"})
        }

        const token = jwt.sign(
            { _id: exist._id, id: exist._id, role: exist.role, email: exist.email, name: exist.name },
            process.env.SECRET,
            { expiresIn: '7d' }
        )
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