const razorpayInstance=require('../config/razorpay');
const crypto=require('crypto')
const PaymentModel=require('../models/paymentSchema')

exports.paymentController=async(req,res)=>{
    try{
        const {cartItems}=req.body;
        console.log("cartItems",cartItems)
        const options={
             amount:cartItems[0]?.productId?.sellingPrice*100,
             currency:'INR',
             
        }

            razorpayInstance.orders.create(options, 
            (err, order)=>{

              if(!err)
                 return res.status(201).json({
                  success:true,
                  message:'Order Created',
                  data:{
                    amount:order.amount,
                    order_id:order.id,
                    key_id:process.env.key_id,
                    product_name:cartItems[0].productId.productName,
                    description:cartItems[0].productId.description,
                    contact:"9773257728",
                    name:cartItems[0].userId.name,
                    email:cartItems[0].userId.email
                  }
                })


              else
                res.send(err);
            }
        )
    }
    catch(error){
        return res.status(500).json({
            message:error?.message || error,
            error:true,
            success:false
        })
    }
}

exports.paymentverification=async(req,res)=>{
       try{
        const{razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body;
        console.log(req.body,"id")
        const body=razorpay_order_id+"|"+razorpay_payment_id;
        const expectedsignature=crypto.createHmac('sha256',process.env.Key_Secret).update(body.toString()).digest('hex');
  
        if(expectedsignature===razorpay_signature){
          
           await PaymentModel.create({
              razorpay_order_id,razorpay_payment_id,razorpay_signature
           })
         
              return res.status(200).json({
                    success:true
              })
        }
        else{
         
          return res.status(400).json({
              success:false
          })
        }
       }
       catch(error){
         return res.status(500).json({
           error:true,
           success:false,
           message:" server error message"||error.message,
         })
       }
}

exports.getkey=async(req,res)=>{
  return res.status(200).json({
    key:process.env.SECRET_KEY
  })
}