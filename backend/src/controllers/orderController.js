const razorpayInstance=require('../config/razorpay');
const crypto=require('crypto')
const PaymentModel=require('../models/paymentSchema');
const orderModel = require('../models/orderModel');

exports.paymentController=async(req,res)=>{
    try{
        const {cartItems}=req.body;
        console.log("cartItems",cartItems[0].productId)
        const options={
             amount:cartItems[0]?.productId?.sellingPrice*100,
             currency:'INR',
             notes: {
              product_name: cartItems[0].productId.productName,
              productImage:cartItems[0].productId.productImage[0],
              price: cartItems[0].productId.sellingPrice,
              quantity:cartItems[0].quantity
          }
        }

            razorpayInstance.orders.create(options, 
            (err, order)=>{

              if(!err)
              {
                

                return res.status(201).json({
                  success:true,
                  message:'Order Created',
                  data:{
                    amount:order.amount,
                    order_id:order.id,
                    key_id:process.env.key_id,
                    notes:[
                     {
                      productName:cartItems[0].productId.productName,
                      sellingPrice:cartItems[0].productId.sellingPrice,
                      productImage:cartItems[0].productId.productImage[0],
                      quantity:cartItems[0].quantity
                    }
                    ],
                    description:cartItems[0].productId.description,
                    quantity:cartItems[0].quantity,
                    contact:"9773257728",
                    name:cartItems[0].userId.name,
                    email:cartItems[0].userId.email
                  }
                })
              }
             
              else {
                res.send(err);
              }
                
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


exports.fetchAllOrder=async(req,res)=>
{
  try{
    
     let {razorpay_payment_id}=req.body;
      const fetchOrders=await razorpayInstance.payments.fetch(razorpay_payment_id);
      const fetchOrderDetails=await razorpayInstance.orders.fetch(fetchOrders.order_id);
      console.log(fetchOrderDetails.notes,"fetchOrderDetails")
      console.log(fetchOrders,"fecthOrder")
       

      const orderDetails={
        totalAmount:fetchOrders.amount/100*fetchOrderDetails.notes.quantity,
        ProductDetails:[fetchOrderDetails.notes.product_name,fetchOrderDetails.notes.productImage,fetchOrderDetails.notes.price],
        email:fetchOrders.email,
        userId:req.userId,
        paymentDetails: {
          paymentId: fetchOrders.id, 
          payment_method_type: [fetchOrders.method],
          payment_status: fetchOrders.status
      },
        quantity:fetchOrderDetails.notes.quantity
     }
    
     const order=await orderModel.create(orderDetails)

     return res.status(200).json({
      error:false,
      message:"fetch Allorder from paymentGateway",
      success:true,
      data:{order}
   })
      
  }
  catch(error){
    return res.status(500).json({
      error:true,
      success:false,
      message:" server error message"||error.message,
    })
  }
}

exports.getAllOrderList=async(req,res)=>{
   try{
       const orderList= await orderModel.find({userId:req.userId});
       console.log(orderList[0],"orderListhello")
       console.log(orderList.length,"orderListlength")
      if(!orderList.length>0){
         return res.status(404).json({
           error:true,
           success:false,
           statuscode:404,
           message:"orders not found",

         })
      }
      else{
         return res.status(200).json({
           error:false,
           success:true,
           statusCode:200,
           message:"orders get Successfully",
           data:orderList
         })
      }
   }
   catch(error){
     return res.status(500).json({
       error:true,
       succes:false,
       message:'Server error messagee'||error.message
     })
   }
}