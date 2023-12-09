const Complaint = require('../models/complaintmodel')
const User = require('../models/usermodel')
const mongoose = require('mongoose')
const logger = require("../loggers/logConfig")

const getComplaints=async(req,res) => {
    logger.info("Inside complaint list method - Winston Message")
    const user_id = req.user._id
    const userad = await User.findById(user_id);
    //const userad = req.user.isAdmin
    if(userad.isAdmin.valueOf() === true){
        const complaints= await Complaint.find({}).sort({priority: -1,createdAt: 1})
        logger.info("Admin user complaint list method successful - Winston Message")
        res.status(200).json(complaints)
    }
    else{
        const complaints= await Complaint.find({user_id}).sort({priority: -1,createdAt: 1})
        logger.info("Non-admin user complaint list method successful - Winston Message")
        res.status(200).json(complaints)
    }
}

const getComplaint=async(req,res) => {
    logger.info("Inside complaint query method - Winston Message")
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        logger.error("Invalid complaint id - Winston Message")
        return res.status(404).json({error: 'No such complaint'})
    }
    const complaint = await Complaint.findById(id)
    if(!complaint){
        logger.error("Complaint not found - Winston Message")
        return res.status(404).json({error: 'No such complaint'})
    }
    logger.info("Complaint query successful - Winston Message")
    res.status(200).json(complaint)
}

const createComplaint= async (req,res) => {
    logger.info("Inside complaint creation method - Winston Message")
    const {desc, priority} = req.body

    let emptyFields = []

    if(!desc){
        emptyFields.push('desc')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(emptyFields.length > 0){
        logger.error("Incomplete form - Winston Message")
        return res.status(400).json({ error: 'Please fill in all fields', emptyFields })
    }
    if(priority > 3)
        priority=3
    if(priority < 1)
        priority=1
    try{
        const user_id= req.user._id
        const ruser = await User.findById(user_id)
        const complaint=await Complaint.create({desc, priority,stats:'Sent',user_id,user_name:ruser.name,user_room:ruser.roomno})
        logger.info("Complaint created successfully - Winston Message")
        res.status(200).json(complaint)
    }catch(err){
        logger.error("Complaint creation failure - Winston Message")
        res.status(400).json({error: err.message})
    }
}

const deleteComplaint= async (req,res) => {
    logger.info("Inside complaint deletion method - Winston Message")
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        logger.error("Invalid complaint id - Winston Message")
        return res.status(404).json({error: 'No such complaint'})
    }
    const complaint = await Complaint.findOneAndDelete({_id:id}) 
    if(!complaint){
        logger.error("Complaint not found - Winston Message")
        return res.status(404).json({error: 'No such complaint'})
    }
    logger.info("Complaint deletion successful - Winston Message")
    res.status(200).json(complaint)
}

const updateComplaint= async (req,res) => {
    logger.info("Inside complaint update method - Winston Message")
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        logger.error("Invalid complaint id - Winston Message")
        return res.status(404).json({error: 'No such complaint'})
    }

    const complaint = await Complaint.findOneAndUpdate({$and:[{_id:id,stats:'Sent'}]},{
        stats:'Resolving',
    }) 
    
    if(!complaint){
        const complaint = await Complaint.findOneAndUpdate({$and:[{_id:id,stats:'Resolving'}]},{
            stats:'Resolved',
        })
        if(!complaint){
            logger.error("Complaint not found - Winston Message")
            return res.status(404).json({error: 'No such complaint!'})
        }
        logger.info("Complaint updated successfully - Winston Message")
        return res.status(200).json(complaint)
    }
    logger.info("Complaint updated successfully - Winston Message")
    return res.status(200).json(complaint)

}

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    deleteComplaint,
    updateComplaint
}