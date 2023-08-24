const Product=require('../Models/Products.model')


module.exports={
    getAllProducts: async(req,res,next)=>{
        // next(new Error("Cant get a list of all products"))
        try {
         const result =await Product.find({},{__v:0})
         res.send(result)
         
        } catch (error) {
         console.log(error.message);
        }
        
     },

     CreateProducts:async (req,res,next)=>{ 
    

        try {
        const product= new Product(req.body)
            const result =await product.save();
            res.send(result)
        } catch (error) {
            console.log(error.message);
            if(error.name==='ValidationError'){
                next(createError(422,error.message));
                return;
            }
            next(error);
        }
    
    
    // Another Method below
        // const product =new Product({
        //     name:req.body.name,
        //     price:req.body.price
        // })
    
        // product.save().then(result=>{
        //     console.log(result);
        //     res.send(result)
        // }).catch(err=>{
        //     console.log(err.message);
        // })
    
    },

    GetProductByID:async(req,res,next)=>{
        const id=req.params.id
        try {
            //const result =await Product.findById(id)
            const product = await Product.findById(id);
            console.log(product)
            if(!product){
                throw createError(404,"Product Doesn't exist")
            }
            res.send(product)
            
           } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400,"Doesnt exist Product Id"))
                return ;
            }
            next(error)
           }
           
    },
    
    UpdateProductByID:async(req,res,next)=>{
        const id=req.params.id
        const update = req.body
        const option={new : true};
        try {
            //const result =await Product.findById(id)
            const result = await Product.findByIdAndUpdate(id,update,option)
            if(!result){
                throw createError(404,"Product Doesn't exist")
            }
            res.send(result)
            
           } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400,"Doesnt exist "))
                return ;
            }
            next(error)
        }
    },

    DeleteProductByID:async(req,res,next)=>{
        const id=req.params.id
        try {
            //const result =await Product.findById(id)
            const result = await Product.findByIdAndDelete({_id:id})
            res.send(result)
            if(!result){
                throw createError(404,"Product Doesn't exist")
            }
           } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400,"Doesnt Exist"))
                return ;
            }
            next(error)
           }
    }
}