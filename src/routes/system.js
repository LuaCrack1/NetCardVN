import express from "express";
import Order from "../models/Order.js";
import CardLog from "../models/CardLog.js";
import NCCStatus from "../models/NCCStatus.js";

const router = express.Router();

// Callback từ NCC
router.post("/callback", async (req, res) => {
  const { request_id, status, message } = req.body;

  const order = await Order.findOne({ requestId: request_id });
  if (!order) return res.send("Order not found!");

  order.status = status;
  order.nccResponse = req.body;
  await order.save();

  await CardLog.create({
    orderId: order._id,
    message: `NCC CALLBACK: ${status}`,
    raw: req.body
  });

  res.send("OK");
});

// Kiểm tra NCC
router.get("/ncc-status", async (req, res) => {
  const data = await NCCStatus.find();
  res.json({ success: true, data });
});

export default router;
