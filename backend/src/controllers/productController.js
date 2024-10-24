const { uploadProductPermission } = require('../helpers/permission');
const productModel=require('../models/productModel');


exports.UploadProductController=async(req,res)=>{
    try{

        const sessionUserId=req.userId;

        if(!uploadProductPermission(sessionUserId)){
             throw new Error("permission Denied") 
        }
        
        console.log(req.body,"lk")
         const uploadProduct= await productModel.create(req.body)

         if(!uploadProduct){
            return res.status(400).json({
                error:true,
                success:false,
                message:'UploadProduct not created Successfully',
                statusCode:400
            })
         }

         return res.status(201).json({
             error:false,
             success:true,
             message:"Product upload successfully",
             statusCode:201,
             data:uploadProduct
         })
    }
    catch(err){
        return res.status(500).json({
            error:true,
            success:false,
            message:"Server error",
            statusCode:500 ,
             
        })
    }
}

exports.getProduct=async(req,res)=>{
    try{
          const getProduct= await productModel.find({});
          
          if(!getProduct.length>0){
            return res.status(400).json({
                error:true,
                success:false,
                message:"Products not getting successfully",
                statusCode:400,
            })
          }

          return res.status(200).json({
            error:false,
            success:true,
            message:"Product get Successfully",
            statusCode:200,
            data:getProduct
          })

    }
    catch(error){
        return  res.status(500).json({
            error:true,
            success:false,
            message:"Server error",
            statusCode:500
        })
    }
}

exports.updateProduct=async(req,res)=>{
    try{

        if(!uploadProductPermission(req.userId)){
            throw new Error("permission Denied") 
         } 
        
      
         
         const{_id,...resBody}=req.body;
         console.log(req.body,"klkl")
       
         
         const product= await productModel.findById(_id);

         if(!product){

            return res.status(400).json({
                 error:true,
                 success:false,
                 message:'productName is not existed',
                 statusCode:400
            })
         }

         const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)

         if(!updateProduct){
            
            return res.status(400).json({
                message:"Product not update Successfully",
                success:false,
                error:true,
                statusCode:400
            })
         }

           return res.status(200).json({
             message:"Product update Succesfully",
             data:updateProduct,
             success:true,
             error:false
           })
    
    }
    catch(error){
        return res.status(500).json({
            error:true,
            success:false,
            statusCode:500,
            message:error.message
        })
    }
}

exports.getCategoryProduct=async(req,res)=>{
    try{
       const productCategory= await productModel.distinct('category');
       console.log('category',productCategory)

       const productByCategory=[]

       for(const category of productCategory){
           const product= await productModel.findOne({category:category});

           if(product){
             productByCategory.push(product)
           }
       }

       return res.status(200).json({
          error:false,
          success:true,
          message:'category product',
          data:productByCategory
       })

    }
    catch(error){
        return res.status(500).json({
            error:true,
            success:false,
            statusCode:500,
            message:error.message
        })
    }
}

exports.getCategoryWiseProduct=async (req,res)=>{
    try{
        const {category}=req?.body || req?.query;

        const product= await productModel.find({category:category})

        return res.status(200).json({
            error:false,
            success:true,
            statusCode:200,
            message:"category-product",
            data:product
        })
    } 
    catch(error){
        return res.status(500).json(({
            error:true,
            success:false,
            statusCode:500,
            message:error.message
        }))
    }
}

exports.getProductDetails=async(req,res)=>{
    try{
       const{productId}=req.body;

       const product= await productModel.findById(productId)
    
       return res.status(200).json({
          data:product,
          success:true,
          error:false,
          message:'ok',
          statusCode:200
       })
    }
    catch(err){
          return res.status(500).json({
             error:true,
             success:false,
             message:'server error' ||err.message,
             statusCode:500
          })
    }
}

exports.searchProduct=async(req,res)=>{
    try{
         const query=req.query.q;
        console.log(query)
        const  regex= new RegExp(query,'i','g')

        const product=await productModel.find({
            "$or":[
                {
                    productName:regex
                },
                {
                    category:regex
                }
            ]
        })

        return res.status(200).json({
             data:product,
             message:'Search Product list',
             error:false,
             success:true
        })
    }
    catch(error){
        return res.status(500).json({
            error:true,
            message:err.message,
            success:false,
            statusCode:500
        })
    }
}