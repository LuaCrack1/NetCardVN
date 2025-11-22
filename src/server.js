import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import rateLimit from "./config/rateLimit.js";
import authRoutes from "./routes/auth.js";
import cardRoutes from "./routes/card.js";
import adminRoutes from "./routes/admin.js";
import systemRoutes from "./routes/system.js";

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(rateLimit);

// Static
app.use(express.static("public"));
app.set("view engine", "html");

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.error("MongoDB Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/system", systemRoutes);

// Views router (optional)
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/index.html"));
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);
  res.status(500).json({ success: false, message: "Server error", error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running at http://localhost:" + PORT));
