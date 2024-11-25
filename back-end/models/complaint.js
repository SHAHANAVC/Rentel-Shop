// models/Complaint.js
import mongoose, { Schema } from "mongoose";

const complaintSchema = new mongoose.Schema({
  shopId: { type: mongoose.Schema.Types.ObjectId, ref: 'Shop', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  complaintText: { type: String, required: true },
  dateSubmitted: { type: Date, default: Date.now },
  reply: {
    text: { type: String },
    dateReplied: { type: Date },
  },
});
const complaintData = mongoose.model('Complaint', complaintSchema);
export default complaintData
