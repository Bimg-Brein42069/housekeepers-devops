const Complaint = require('../models/complaintmodel')
const User = require('../models/usermodel')
const mongoose = require('mongoose')

const getComplaints=async(req,res) => {
    const user_id = req.user._id
    const userad = await User.findById(user_id);
    //const userad = req.user.isAdmin
    if(userad.isAdmin.valueOf() === true){
        const complaints= await Complaint.find({}).sort({priority: -1,createdAt: 1})
        res.status(200).json(complaints)
    }
    else{
        const complaints= await Complaint.find({user_id}).sort({priority: -1,createdAt: 1})
        res.status(200).json(complaints)
    }
}

const getComplaint=async(req,res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such complaint'})
    }
    const complaint = await Complaint.findById(id)
    if(!complaint){
        return res.status(404).json({error: 'No such complaint'})
    }
    res.status(200).json(complaint)
}

const createComplaint= async (req,res) => {
    const {desc, priority} = req.body

    let emptyFields = []

    if(!desc){
        emptyFields.push('desc')
    }
    if(!priority){
        emptyFields.push('priority')
    }
    if(emptyFields.length > 0){
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
        res.status(200).json(complaint)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const deleteComplaint= async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such complaint'})
    }
    const complaint = await Complaint.findOneAndDelete({_id:id}) 
    if(!complaint){
        return res.status(404).json({error: 'No such complaint'})
    }
    res.status(200).json(complaint)
}

const updateComplaint= async (req,res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such complaint'})
    }

    const complaint = await Complaint.findOneAndUpdate({$and:[{_id:id,stats:'Sent'}]},{
        stats:'Resolving',
    }) 
    
    if(!complaint){
        const complaint = await Complaint.findOneAndUpdate({$and:[{_id:id,stats:'Resolving'}]},{
            stats:'Resolved',
        })
        if(!complaint)
            return res.status(404).json({error: 'No such complaint!'})
        return res.status(200).json(complaint)
    }
    return res.status(200).json(complaint)

}

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    deleteComplaint,
    updateComplaint
}