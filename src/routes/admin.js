import express from "express";
import { verifyToken, verifyAdmin } from "../config/jwt.js";
import User from "../models/User.js";
import Order from "../models/Order.js";
import CardLog from "../models/CardLog.js";
import NCCStatus from "../models/NCCStatus.js";

const router = express.Router();

// Dashboard số liệu
router.get("/stats", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.countDocuments();
  const orders = await Order.countDocuments();
  const success = await Order.countDocuments({ status: "success" });

  res.json({ success: true, users, orders, success });
});

// Danh sách đơn
router.get("/orders", verifyToken, verifyAdmin, async (req, res) => {
  const data = await Order.find().sort({ createdAt: -1 });
  res.json({ success: true, data });
});

// Logs
router.get("/logs/:id", verifyToken, verifyAdmin, async (req, res) => {
  const logs = await CardLog.find({ orderId: req.params.id });
  res.json({ success: true, logs });
});

// Người dùng
router.get("/users", verifyToken, verifyAdmin, async (req, res) => {
  const users = await User.find().select("-password");
  res.json({ success: true, users });
});

export default router;
