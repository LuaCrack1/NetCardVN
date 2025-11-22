import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import authRoutes from "./routes/auth.js";
import cardRoutes from "./routes/card.js";
import adminRoutes from "./routes/admin.js";
import systemRoutes from "./routes/system.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

// Anti spam
app.use(
  "/api/",
  rateLimit({
    windowMs: 10000,
    max: 10,
    message: { status: "error", msg: "Bạn thao tác quá nhanh!" },
  })
);

// DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/card", cardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/system", systemRoutes);

// Static public
app.use("/public", express.static("public"));
app.use("/views", express.static("views"));

app.get("/", (req, res) => {
  res.sendFile(process.cwd() + "/index.html");
});

app.listen(process.env.PORT, () =>
  console.log(`NetCard chạy tại http://localhost:${process.env.PORT}`)
);
