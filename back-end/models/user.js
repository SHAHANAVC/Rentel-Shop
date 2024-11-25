import mongoose, { Schema }  from "mongoose";

const userSchema = new Schema({
    commonKey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
      },
userFullname:{
    type:String,
    required:true,
},
userEmail:{
    type:String,
    required:true,
},
city:{
    type:String,
    required:true
},
state:{
    type:String,
    required:true
},
pincode:{
    type:String,
    required:true,
},
userLocation: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
},


})

const userData = mongoose.model('User',userSchema)
export default userData