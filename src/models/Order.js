import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    telco: String,
    amount: Number,
    serial: String,
    code: String,
    requestId: String,

    provider: String, // NCC1 | NCC2 | NCC3
    status: { type: String, default: "pending" }, // pending | success | wrong | refund
    nccResponse: { type: Object, default: {} }
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);

