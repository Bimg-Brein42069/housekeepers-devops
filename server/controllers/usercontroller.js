const User = require('../models/usermodel')
const jwt = require('jsonwebtoken')
const logger = require('../loggers/logConfig')

const createToken = (id) => {
    logger.info("Inside user token generation method - Winston message")
    return jwt.sign({_id:id},process.env.SECRET,{expiresIn:'2h'})
}

//login user
const loginUser = async (req,res) => {
    logger.info("Inside login method - Winston message")
    const {email,password} = req.body
    try{
        const user = await User.login(email,password)

        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        logger.info("User logged in successfully - Winston message")
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        logger.error("Login failure - Winston message")
        res.status(400).json({error: err.message})
    }
}

//signup user
const signupUser = async (req,res) => {
    logger.info("Inside student signup method - Winston message")
    const {name,email,roomno,password} = req.body
    try{
        const user = await User.signup(name,email,roomno,password)
        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        logger.info("New student signed in successfully - Winston message")
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        logger.error("Student signup failure - Winston message")
        res.status(400).json({error: err.message})
    }
}

const signupAdmin = async (req,res) => {
    logger.info("Inside admin signup method - Winston message")
    const {name,email,roomno,password} = req.body
    try{
        const user = await User.signupadmin(name,email,roomno,password)
        //create token
        const token = createToken(user._id)
        const isAdmin = user.isAdmin
        logger.info("New admin signed in successfully - Winston message")
        res.status(200).json({isAdmin,email,token})
    }catch(err){
        logger.error("Admin signup failure - Winston message")
        res.status(400).json({error: err.message})
    }
}

module.exports = {
    signupUser,
    loginUser,
    signupAdmin,
    createToken
}