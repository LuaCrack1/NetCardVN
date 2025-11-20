const router = require("express").Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const JWT = require("../config/jwt");

// Đăng ký
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exists = await User.findOne({ username });
  if (exists) return res.json({ status: false, msg: "Tên đã tồn tại" });

  const user = await User.create({ username, password });
  res.json({ status: true, user });
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });
  if (!user) return res.json({ status: false, msg: "Sai tài khoản hoặc mật khẩu" });

  const token = jwt.sign({ id: user._id }, JWT.SECRET, { expiresIn: JWT.EXPIRE });

  res.json({ status: true, token, user });
});

module.exports = router;
