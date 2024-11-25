import mongoose, { Schema } from "mongoose";

const workerSchema = new mongoose.Schema(
  {
    commonKey:{
        type:Schema.Types.ObjectId,
        ref:"Login"
      },
    workerName: { type: String, required: true },
    jobTitle: { type: String, required: true },
    skills: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    workerImage: { type: String, required: false }, // Optional worker image field
  },
  { timestamps: true }
);

const workerData = mongoose.model("WorkerData", workerSchema);
export default workerData;
