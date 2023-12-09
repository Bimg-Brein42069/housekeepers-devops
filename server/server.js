require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const complaintRoutes = require('./routes/complaints')
const userRoutes = require('./routes/user')
const port=process.env.PORT
const uri=process.env.ATLAS_URI


const app=express()

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path,req.method)
    next()
})

app.use('/api/complaints',complaintRoutes)
app.use('/api/user',userRoutes)

//connect to db
mongoose.connect(uri)
.then(() => {
    app.listen(port,() => {
        console.log(`Connected to db:Listening on port ${port}`)
    })
})
.catch(err => {
    console.log(err);
})

module.exports = app;

