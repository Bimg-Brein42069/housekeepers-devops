const express = require('express')
const router = express.Router()
const { signupUser , loginUser, signupAdmin } = require("../controllers/usercontroller")

// login route
router.post('/login',loginUser)

// signup route
router.post('/signup',signupUser)

// signup admin route
router.post('/signupadmin',signupAdmin)

module.exports = router