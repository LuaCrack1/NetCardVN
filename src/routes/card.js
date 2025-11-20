const router = require("express").Router();
const Order = require("../models/Order");
const CardConfig = require("../models/CardConfig");

router.get("/list", async (req, res) => {
  const cards = await CardConfig.find({ active: true });
  res.json(cards);
});

// Tạo đơn nạp thẻ
router.post("/buy", async (req, res) => {
  const { userId, network, amount, serial, code } = req.body;

  const order = await Order.create({
    userId, network, amount, serial, code
  });

  res.json({ status: true, order });
});

module.exports = router;
