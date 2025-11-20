module.exports = {
  SECRET: process.env.JWT_SECRET || "NETCARD_SUPER_SECRET_KEY",
  EXPIRE: "7d",
};
