import mongoose from "mongoose";

const NCCStatusSchema = new mongoose.Schema(
  {
    provider: String, // NCC1 | NCC2 | NCC3
    lastStatus: String, // up | down
    lastCheck: Date
  },
  { timestamps: true }
);

export default mongoose.model("NCCStatus", NCCStatusSchema);
