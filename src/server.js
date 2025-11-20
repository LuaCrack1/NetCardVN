const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.log("❌ MongoDB error:", err));

// Import routes
const authRoutes = require("./routes/auth");
const cardRoutes = require("./routes/card");
const orderRoutes = require("./routes/order");
const adminRoutes = require("./routes/admin");

// Sử dụng routes
app.use("/api/auth", authRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/admin", adminRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
