const Razorpay = require('razorpay');


const razorpayInstance=new Razorpay({
    key_id:process.env.Key_Id,
    key_secret:process.env.Key_Secret
});

module.exports=razorpayInstance;