import mongoose from'mongoose';
const userSchema=mongoose.Schema({
  name:{type:String},
  email:{type:String, required:true,unique:true},
  password:{type:String},
  role:{type:String,enum:["jobseeker","employer"],required:true}
})
export default userSchema;