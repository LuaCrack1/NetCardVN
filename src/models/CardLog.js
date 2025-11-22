import mongoose from "mongoose";

const CardLogSchema = new mongoose.Schema(
  {
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    message: String,
    raw: Object
  },
  { timestamps: true }
);

export default mongoose.model("CardLog", CardLogSchema);
