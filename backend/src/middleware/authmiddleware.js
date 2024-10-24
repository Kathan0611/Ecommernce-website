const jwt= require('jsonwebtoken');


exports.verifyToken=async (req,res,next)=>{
    try{
        const token =req.headers.authorization?.split(' ')[1] ||
        req.cookies?.Key || req.headers.cookie?.split('=')[1]
        console.log('token',req.headers.authorization);
          
       if(!token){
        return  res.status(200).json({
            message:'Users not Login',
            error:true,
            success:false,

        })
       }
       const decode= await jwt.verify(token,process.env.SECRET_KEY);

       console.log('decodeHello',decode._id);

       if(!decode){
          console.log('Error in decode')
       }
       
       req.userId=decode?._id;
       next()

    }
    catch(err){
        res.status(400).json({
            message:err.message ||err,
            data:[],
            error:true,
            success:false
        })
    }
}