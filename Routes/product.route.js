const express=require('express')
const mongoose=require('mongoose')
const createError=require('http-errors');

const Product=require('../Models/Products.model')
const ProductController=require('../Controller/Product.controller')


const router=express.Router();


router.get('/',ProductController.getAllProducts)

router.post('/',ProductController.CreateProducts)

router.get('/:id',ProductController.GetProductByID)

router.patch('/:id',ProductController.UpdateProductByID)

router.delete('/:id',ProductController.DeleteProductByID)


module.exports=router;