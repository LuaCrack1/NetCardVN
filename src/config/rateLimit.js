import rateLimit from "express-rate-limit";

export default rateLimit({
  windowMs: 30 * 1000, // 30 seconds
  max: 20,
  message: {
    success: false,
    message: "Bạn thao tác quá nhanh, vui lòng thử lại!"
  },
  standardHeaders: true,
  legacyHeaders: false,
});
