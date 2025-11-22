import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { signToken, verifyToken } from "../config/jwt.js";

const router = express.Router();

// Đăng ký
router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const exist = await User.findOne({ username });
  if (exist) return res.json({ success: false, message: "Tên đã tồn tại!" });

  const hash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ username, password: hash });

  res.json({ success: true, message: "Đăng ký thành công!", userId: newUser._id });
});

// Đăng nhập
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user) return res.json({ success: false, message: "Sai tài khoản!" });

  const check = await bcrypt.compare(password, user.password);
  if (!check) return res.json({ success: false, message: "Sai mật khẩu!" });

  const token = signToken(user);

  res.json({ success: true, token, user: { id: user._id, role: user.role, balance: user.balance } });
});

// Lấy info
router.get("/me", verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json({ success: true, user });
});

export default router;
