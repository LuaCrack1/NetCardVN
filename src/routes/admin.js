const router = require("express").Router();
const CardConfig = require("../models/CardConfig");
const Order = require("../models/Order");

// Lấy danh sách thẻ
router.get("/cards", async (req, res) => {
  res.json(await CardConfig.find());
});

// Thêm thẻ
router.post("/cards/add", async (req, res) => {
  res.json(await CardConfig.create(req.body));
});

// Xem tất cả đơn
router.get("/orders", async (req, res) => {
  res.json(await Order.find().sort({ createdAt: -1 }));
});

module.exports = router;
