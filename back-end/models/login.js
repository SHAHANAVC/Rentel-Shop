import mongoose, { Schema } from "mongoose";

const loginScheema =new Schema({

    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
    },
    verify: {
        type: Boolean, // Specify the type as Boolean
        default: false // Default value set to false
    }
})
const loginData = mongoose.model("Login",loginScheema) 
export default loginData