const Complaint=require('../models/complaintmodel')
const mongoose = require('mongoose')

const getcomplaints=async(req,res) => {
    const complaints= await Complaint.find({}).sort({createdAt: -1})
    res.status(200).json(complaints)
}

const getcomplaint=async(req,res) => {
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

const createcomplaint= async (req,res) => {
    const {title,load,reps} = req.body
    try{
        const complaint=await Complaint.create({title,load,reps})
        res.status(200).json(complaint)
    }catch(err){
        res.status(400).json({error: err.message})
    }
}

const deletecomplaint= async (req,res) => {
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

const updatecomplaint= async (req,res) => {
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
    getcomplaints,
    getcomplaint,
    createcomplaint,
    deletecomplaint,
    updatecomplaint
}