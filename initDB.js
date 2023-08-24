const express=require('express')
const mongoose=require('mongoose')
const createError=require('http-errors')
const dotenv=require('dotenv').config()

module.exports=()=>{
//local host : mongodb://0.0.0.0:27017/RestApi_prod
    mongoose.connect(process.env.MongoBD_URI,{
    dbname:process.env.dbname,
    user:process.env.user,
    pass:process.env.pass,
})
.then(()=>{
    console.log("Monogodb connected");
}).catch(err=>{
    console.log(err.message)
})

mongoose.connection.on('connected',()=>{
    console.log("Mongoose Connected to DB")
})

mongoose.connection.on('error',(err)=>{
    console.log(err.message)
})

mongoose.connection.on('disconnected',()=>{
    console.log("Mongoose is Disconnected. . .")
})

}