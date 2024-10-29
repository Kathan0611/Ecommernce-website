const mongoose = require("mongoose");
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true
  },
  ProfilePic:{
    type:String,
  },
  otp:{
    type:String,
    required:true
  },
  otpExpiration:{ 
    type:Date,
    required:true
  },
  role:{
    type:String,
    required:true,
    default:'GENERAL'
  }
},{
    timestampes:true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
