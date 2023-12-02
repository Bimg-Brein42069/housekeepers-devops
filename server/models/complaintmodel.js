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
    stats: {
        type: String,
        required: true,
        enum: ['Sent','Resolving','Resolved']
    },
    user_id: {
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    user_room:{
        type: String,
        required: true
    }
},{ timestamps: true})

module.exports = mongoose.model('complaint',complaintSchema)