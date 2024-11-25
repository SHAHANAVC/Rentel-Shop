// models/chat.js
import mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  receiverId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Shop' },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  status: { type: String, default: 'unread' },
});

export default mongoose.model('Chat', chatSchema);
