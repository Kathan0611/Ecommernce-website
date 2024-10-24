const usermodel=require('../models/userModel');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const path=require('path');
const fs=require('fs');
const addToCartModel = require('../models/cartProduct');
require('dotenv').config()
const cloudinary = require('cloudinary').v2 

cloudinary.config({ 
  cloud_name: process.env.cloud_name, 
  api_key: process.env.api_key, 
  api_secret: process.env.api_secret 
});


// const filePath=path.resolve(__dirname,'../uploads/'+req.file.filename)


exports.signup = async (req, res) => {
    try {
      

      const { email, name, password,ProfilePic} = req.body;

      console.log(email,name,password,ProfilePic,"data")
      let uploadResult;
      if (!email || !name || !password) {
              return res.status(400).json({message:"please fill required filed"})
      }

      else
      {

        if(ProfilePic){
          const decode=new Buffer.from(ProfilePic,'utf-8')
          console.log(decode,"hellow")
          const filePath=path.resolve(__dirname,'../uploads/'+ `${Date.now()}.png`)
          console.log(filePath,"filePath")
          fs.writeFileSync(filePath, decode);

          if(!filePath){
              return 'localfilePath not exist'
            }
    
             uploadResult = await cloudinary.uploader.upload(
            filePath, {
               public_id: 'user',
               folder:'Profile',
               resource_type:'auto'
           }
       )
       .catch((error) => {
           console.log(error);
       });

        }

  
        // if(!filePath){
        //   return 'localfilePath not exist'
        // }

        // if(!decode){
        //    return 'image required'
        // }
   
  
        //  uploadResult = await cloudinary.uploader.upload(
        //      filePath, {
        //         public_id: 'user',
        //         folder:'Profile',
        //         resource_type:'auto'
        //     }
        // )
        // .catch((error) => {
        //     console.log(error);
        // });
     
           
          const saltRounds=10;
          const salt= bcrypt.genSaltSync(saltRounds)
          const hashPassword = bcrypt.hashSync(password, salt);

          const existUser= await usermodel.findOne({email:email});
           
          if(existUser){
             return res.status(400).json({message:'User alreday exist'})
           }
          
           const newUser = await usermodel.create({
            email:email,
            name:name,
            password:hashPassword,
            ProfilePic:uploadResult ? uploadResult?.secure_url:null
          });
           console.log(newUser,"hello")

        return res.status(201).json({
          error:false,
          status: 201,
          message: "Signup Successfully",
          data: {
            user: newUser
          },
        });
      }
    } 
    
    catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
  
exports.login = async (req, res) => {
    try {

      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ 
          error:true,
          success:false,
          statusCode:400,
          message: "please fill required filed" });
      }
      else
      {
        
        const existUser = await usermodel.findOne({ email: email});
        // console.log(existUser)

        if (!existUser) {
          return res.status(404).json({ 
            error:true,
            success:false,
            statusCode:404,
            message: "Users not found" 
          });
        } 
        else{
          
          const correctPassword= await  bcrypt.compareSync(password,existUser.password);

          if(!correctPassword){
              return res.status(401).json({
                error:true,
                success:false,
                statuscode:401,
                message:"Unauthorized User"
              })
          }
          const tokenData={
             _id:existUser._id,
              email:existUser.email
          }

          const token = jwt.sign(tokenData, process.env.SECRET_KEY,{expiresIn:'1d'});
          
           
          if (!token) {
            return res.status(400).json({ 
              success:false,
              statuscode:400,
              error:true,
              message: "token is not defined" 
            });
          }

          const tokenOptions={
            httpOnly:true,
            secure:true
          }
         
             return res.status(200).cookie('token',token,tokenOptions).json({
                error:false,
                success:true,
                statusCode: 200,
                message: "Login Successfully",
                data: {
                  token: token,
                  user: existUser,
                },
              });
            }
          }
    } 
    catch(err) {
      res.status(500).json({ message: err.message });
    }
  };
  
exports.userDetails=async (req,res)=>{
  try{
      console.log(req.userId,"jee");
      
      const user= await usermodel.findById(req.userId)
      
      console.log('user',user)
       
       if(!user){
         return res.status(404).json({
           error: true,
           success:false,
           message:'user doesn`t exist',

         })
       }
       
       return res.status(200).json({
          error:false,
          success:true,
          message:'All userDetails getting Successfully',
          data:user
       })

  }
  catch(error){
    console.log(error.message)
    res.status(500).json({
      error:true,
      success:false,
      message:'server error'
    })
  }
}

exports.logout=async(req,res)=>{
    try{
         if(res?.clearCookie){

          res.clearCookie('token') 

          res.status(200).json({
            error:false,
            success:true,
            message:"Logout Successfully",
            data:[]
          })
         } 
    }
    catch(error){
      console.log(error.message)
      return res.status(500).json({
        error:true,
        success:false,
        message: error.message ||'server error'
      })
    }
}

exports.allUser= async (req,res)=>{
  try{
    const user= await usermodel.find();
      
    console.log('user',user)
     
     if(!user){
       return res.status(404).json({
         error: true,
         success:false,
         message:'user doesn`t exist',

       })
     }

     return res.status(200).json({
      error:false,
      success:true,
      message:'AllUser  getting Successfully',
      data:user
   })
  }
  catch(error){
     return res.status(500).json({
      error:true,
      success:false,
      message:error.message ||'server error'
     })
  }
}

exports.updateUser= async(req,res)=>{
   try{
        const sessionUser= req.userId;

        const {userId,email,name,role}=req.body;

        const updateObj={
  
          email,
          name,role
        }
        console.log(updateObj,"obj")
        const user = await usermodel.findById(sessionUser);

        console.log("user-role",user.role);

        const updateUser = await usermodel.findByIdAndUpdate(userId,updateObj);
        
       if(!updateUser){
         return res.status(400).json({
            error:true,
            success:false,
            statusCode:400,
            message:error.message
         })
       }
      
       return res.status(200).json({
         error:false,
         success:true,
         statusCode:200,
         message:"User Update Successfully",
         data:updateUser
       })
   }
   catch(error){
    return res.status(500).json({
      error:true,
      success:false,
      message:error.message ||'server error'
    })
   }
}

exports.addCartController=async(req,res)=>{
  
    try{
        // console.log(req.body)
        const {productId}=req?.body;
        
        const currentUser=req?.userId;
        console.log("hellow")
        const isProductAvailable= await addToCartModel.findOne({productId:productId})
        console.log(isProductAvailable,"ll")
        if(isProductAvailable){
           return res.status(200).json({
               message:'Already exist in Add to cart',
               success:false,
               error:true
           })
        }

        const payload={
            productId:productId,
            quantity:1,
            userId:'6706c24189e2aedb6094d236',
        }

        const newAddToCart= new addToCartModel(payload);
        const saveProduct= await newAddToCart.save();

       return res.status(200).json({
           message:'Product Added in Add to Cart',
           success:true,
           error:false,
           data:saveProduct
       })

    }
    catch(error){
      
      return res.status(500).json({
        error:true,
        success:false,
        message:error?.message ||'server error'
      })
    }
}

exports.countAddToCart=async(req,res)=>{
   try{
         const userId=req.userId;

         const count= await addToCartModel.countDocuments({
            userId:userId
         })

         return res.status(200).json({
             data:{count:count},
             error:false,
             success:true,
             message:"ok"
         })
   }
   catch(error){
     return res.status(500).json({
        error:true,
        success:false,
        message:error?.message || 'server error'
     })
   }
}

exports.addToCartViewProduct=async(req,res)=>{
  try{
      const currentUser=req.userId;
      
      const allProduct= await addToCartModel.find({
        userId:currentUser,
        
      }).populate('productId')

      return res.status(200).json({
         error:false,
         success:true,
         data:allProduct
      })
  }
  catch(error){
    return res.status(500).json({
      error:true,
      success:false,
      message:error?.message || 'server error'
   })
  }
}

exports.updateAddToCartProduct=async(req,res)=>{
    try{
        const currentUserId=req.userId
        const addToCartProductId=req.body._id;

        const qty=req.body.quantity;
    
        const updateProduct= await addToCartModel.updateOne({_id:addToCartProductId},{
           ...(qty && {quantity:qty})
        })

        return res.status(200).json({
           message:'Product Update Successfully',
           data:updateProduct,
           error:false,
           success:true
        })
    }
    catch(error){
      return res.status(500).json({
        error:true,
        success:false,
        message:error?.message || 'server error'
     })
    }
}

exports.deleteAddToCartProduct=async(req,res)=>{
   try{
       
        const currentUserId=req.userId;
         const addToCartProductId=req.body._id;

         const deleteProduct=await addToCartModel.deleteOne({_id:addToCartProductId});
         console.log(deleteProduct)

         return res.status(200).json({
            message:'Product Deleted From Cart',
            error:false,
            success:true,
            data:deleteProduct
         })


   }
   catch(error){
      return res.status(500).json({
        error:true,
        success:false,
        message:error?.message ||'server error'
      })
   }
}