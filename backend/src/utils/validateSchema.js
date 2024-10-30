const Joi=require('joi');

const registerSchema= Joi.object({
    name:Joi.string().trim().required(),
    email:Joi.string().email().trim().required(),
    password:Joi.string().trim().required(),
    ProfilePic:Joi.string().trim()
     
});

const loginSchema= Joi.object({
    email: Joi.alternatives().try(
        Joi.string().email().trim().required(),
        Joi.string().trim().required()
      ),
     password:Joi.string().trim().required()
})

const resetPassword = Joi.object({
    newPassword:Joi.string().trim().required(),
    otp:Joi.string().trim().required()
  });

const forgotpassword =Joi.object({
    email:Joi.string().trim().required().trim()
})



module.exports={
    registerSchema,
    loginSchema,
    forgotpassword,
    resetPassword

}