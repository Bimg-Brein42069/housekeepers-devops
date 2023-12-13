const jwt=require('jsonwebtoken')
const User=require('../models/usermodel')
const logger=require('../loggers/logConfig')
const requireAuth = async (req,res,next) => {
    //verify authentication
    const { authorization } = req.headers
    if(!authorization){
        logger.error("Unauthorized - Winston Message")
        return res.status(401).json({error: 'Unauthorized'})
    }
    
    const token = authorization.split(' ')[1]
    try{
        const {_id}=jwt.verify(token,process.env.SECRET)
        req.user=await User.findOne({_id}).select('_id')
        next()
    }catch(err){
        logger.error("Unauthorized - Winston Message")
        res.status(401).json({error: 'Unauthorized'})
    }
}

module.exports=requireAuth