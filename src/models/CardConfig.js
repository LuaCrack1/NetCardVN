const mongoose = require("mongoose");

const CardConfigSchema = new mongoose.Schema({
  name: String,        // Viettel, Garena, Zing...
  min: Number,         // Min mệnh giá
  max: Number,         // Max mệnh giá
  logo: String,        // URL ảnh (nếu có)
  active: { type: Boolean, default: true }
});

module.exports = mongoose.model("CardConfig", CardConfigSchema);
