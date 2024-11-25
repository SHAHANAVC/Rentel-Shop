import mongoose, { Schema } from "mongoose";

// Define the Review schema
const reviewSchema = new Schema({
  user:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' ,required:true,
  },
  shop: {
    type:String,
    required:true,
  },
  rating: {
    type: Number,  // Changed to Number instead of an object
    required: true, // The rating given by the user
  },
  comment: {
    type: String,
    required: true, // Review comment provided by the user
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const reviewData = mongoose.model("Review", reviewSchema);
export default reviewData;
