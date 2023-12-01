const Complaint = require('../models/complaintmodel')
const mongoose = require('mongoose')

const getComplaints=async(req,res) => {
    const user_id = req.user._id
    const complaints= await Complaint.find({user_id}).sort({priority: -1,createdAt: 1})
    res.status(200).json(complaints)
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

    try{
        const user_id= req.user._id
        const complaint=await Complaint.create({desc, priority,user_id})
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
    const complaint = await Complaint.findOneAndUpdate({_id:id},{
        ...req.body
    }) 
    if(!complaint){
        return res.status(404).json({error: 'No such complaint'})
    }
    res.status(200).json(complaint)
}

module.exports = {
    getComplaints,
    getComplaint,
    createComplaint,
    deleteComplaint,
    updateComplaint
}