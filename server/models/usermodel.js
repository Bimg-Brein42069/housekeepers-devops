const mongoose=require("mongoose")
const bcrypt = require("bcrypt")
const validator = require("validator")
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    roomno:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        required: true
    }
})

//static signup method
userSchema.statics.signup = async function(name,email,roomno,password){

    if(!name || !email || !roomno || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough: Needs to be atleast 8 characters long with a mix of uppercase and lowercase letters with at least 1 number and 1 special symbol')
    }

    const exists = await this.findOne({ email })
    if(exists){
        throw Error('Roll number already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,email,roomno,password:hash,isAdmin:false})
    return user
}

userSchema.statics.signupadmin = async function(name,email,roomno,password){

    if(!name || !email || !roomno || !password){
        throw Error('All fields must be filled')
    }

    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }

    if(!validator.isStrongPassword(password,{minLength:32,minNumbers:4,minSymbols:6})){
        throw Error('Password is not strong enough: Needs to be atleast 32 characters long with a mix of uppercase and lowercase letters,numbers,symbols')
    }

    const exists = await this.findOne({ email })
    if(exists){
        throw Error('Roll number already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({name,email,roomno,password:hash,isAdmin:true})
    return user
}

//static login method
userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }
    
    const exists= await this.findOne({ email })
    if(!exists){
        throw Error('Incorrect login credentials')
    }

    const match = await bcrypt.compare(password,exists.password)
    if(!match){
        throw Error('Incorrect login credentials')
    }

    return exists
}

module.exports = mongoose.model('User', userSchema)