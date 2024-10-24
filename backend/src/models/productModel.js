const mongoose=require('mongoose');

const ProductSchema= mongoose.Schema({
    productName:{
        type:String,
    },
    brandName:{
        type:String,
    },
    category:{
       type:String,
    },
    productImage:{
        type:Array,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    },
    sellingPrice:{
        type:Number
    }
},{
    timestamps:true
})

const productModel= mongoose.model('product',ProductSchema);

module.exports=productModel;