const express=require('express')
const mongoose=require('mongoose')
const createError=require('http-errors')

const Productroutes=require("./Routes/product.route")
require('./initDB')();

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.all('/test',(req,res)=>{
    console.log(req.query)
    res.send(req.query)
})
app.use('/products',Productroutes);

app.use((req,res,next)=>{
//     const err=new Error("URL Not Found")
//     err.status=404;
//    next(err);

    next(createError(404,'URL Not Found'))
});


app.use((err,req,res,next)=>{
    res.status(err.status || 500)
    res.send({
        error:{
            status:err.status || 500,
            message:err.message
        }
    })
})

console.log(process.env.PORT)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log("Started on port 5000");
})