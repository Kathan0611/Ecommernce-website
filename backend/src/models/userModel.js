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
  role:{
    type:String,
    required:true,
    default:'admin'
  }
},{
    timestampes:true
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
