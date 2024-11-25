import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  productName: {
    type: String,
    // required: true,
  },
  productId: {
    type: String,
    // required: true,
  },
  productShopId: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
    // enum: ["electronics", "clothing", "books", "home"] // Optional: restrict to specific categories
  },
  image: {
    type: String, // Store the image filename or URL
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status:{
    type: String,
    enum: ['available', 'booked','shiped'], // Define possible statuses
    default: 'available', // Set default to 'available'
  },
  bookedBy: {
    type: Schema.Types.ObjectId, // Reference to the User ID who booked it
    ref: 'User', // Assuming you have a User model
    default: null, // Default to null, meaning no user has booked it
  },
  rating: {
    averageRating: {
      type: Number,
      default: 0,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
  },
});
const productData = mongoose.model("Product", productSchema);
export default productData
