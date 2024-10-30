  module.exports = function (schema) {
  return async function (req, res, next) {
    try {

      const{confirmPassword,ProfilePic,...rest}=req.body;

      const { error, value } = await schema.validate(rest);

      console.log(error ,"error-message")
      if (error) {
        return res.status(400).json({
          success: false,
          error:true,
          data: null,
          message: error.details[0].message.replace(/"/g, ''), 
        });
         
      }

      req.body = {...value,ProfilePic}; 
      console.log(req.body);
      next();
    } catch (err) {
      
     return res.status(500).json({
        success: false,
        error:true,
        data: null,
        message: err.message,
      });
    }
  };
};