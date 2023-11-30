const express=require('express')
const {
    getComplaints,
    getComplaint,
    createComplaint,
    deleteComplaint,
    updateComplaint
} = require('../controllers/complaintcontroller')

const router = express.Router()

//get all Complaints
router.get('/',getComplaints)

//get single Complaint
router.get('/:id',getComplaint)

//post new Complaint
router.post('/', createComplaint)

//delete a Complaint
router.delete('/:id',deleteComplaint)

//update new Complaint
router.patch('/:id',updateComplaint)

module.exports = router