const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  userId: String,
  network: String,
  amount: Number,
  serial: String,
  code: String,
  status: { type: String, default: "processing" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);
