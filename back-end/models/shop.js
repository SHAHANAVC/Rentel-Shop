import mongoose from "mongoose";
const Schema = mongoose.Schema


const shopSchema = new Schema({
    commonKey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
      },
      shopId:{
        type: String,
    required: true,
      },
    shopName:{
        type:String,
        required:true
    },
    ownerName:{
        type:String,
        required:true
    },
    shopEmail:{
        type:String,
        required:true
    },
    shopState:{
        type:String,
        required:true
    },
    shopCity:{
        type:String,
        required:true
    },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true }
    },
    shopImage:{
    type: String,
},

})
const shopData = mongoose.model("Shop",shopSchema)
export default  shopData