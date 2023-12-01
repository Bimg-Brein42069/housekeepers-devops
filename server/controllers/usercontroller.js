const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')

const createToken = (id) => {
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'2h'})
}

//login user
const loginUser = async (req,res) => {
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)

        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

//signup user
const signupUser = async (req,res) => {
    const {name,email,roomno,password} = req.body
    try{
        const user = await User.signup(name,email,roomno,password)
        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const signupAdmin = async (req,res) => {
    const {name,email,roomno,password} = req.body
    try{
        const user = await User.signupadmin(name,email,roomno,password)
        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    signupUser,
    loginUser,
    signupAdmin,
    createToken
}