const mongoose=require('mongoose')
const Schema=mongoose.Schema
const complaintSchema=new Schema({
    desc: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},{ timestamps: true})

module.exports = mongoose.model('complaint',complaintSchema)