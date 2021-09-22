const mongoose = require('mongoose')

const userTemplate = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    btc:{
        type:String,
        required:true
    },
    eth:{
        type:String,
        required:true
    },
    invest:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('mytable', userTemplate)