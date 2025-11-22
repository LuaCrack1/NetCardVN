import express from "express";
import { verifyToken } from "../config/jwt.js";
import { sendToNCC } from "../config/ncc.js";
import Order from "../models/Order.js";
import CardLog from "../models/CardLog.js";
import rate from "../config/rateLimit.js";

const router = express.Router();

// Gửi thẻ lên NCC
router.post("/send", verifyToken, rate, async (req, res) => {
  try {
    const { telco, amount, serial, code, provider } = req.body;

    const requestId = Date.now() + "_" + req.user.id;

    const order = await Order.create({
      userId: req.user.id,
      telco,
      amount,
      serial,
      code,
      provider,
      requestId,
    });

    const nccRes = await sendToNCC({ telco, amount, serial, code, requestId, provider });

    order.nccResponse = nccRes;
    await order.save();

    await CardLog.create({
      orderId: order._id,
      message: "Gửi đến NCC",
      raw: nccRes
    });

    res.json({
      success: true,
      message: "Đã gửi thẻ!",
      orderId: order._id,
      ncc: nccRes
    });
  } catch (err) {
    res.json({ success: false, message: "Lỗi hệ thống!", error: err.message });
  }
});

// Lịch sử
router.get("/history", verifyToken, async (req, res) => {
  const list = await Order.find({ userId: req.user.id }).sort({ createdAt: -1 });
  res.json({ success: true, data: list });
});

export default router;
