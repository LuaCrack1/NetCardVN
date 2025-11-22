// src/routes/callback.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const CardLog = require("../models/CardLog");
const crypto = require("crypto");


// ====== VERIFY CALLBACK SECRET ======
function verifyCallback(req, secretKey) {
    const {
        request_id,
        status,
        message,
        amount,
        declared_amount,
        code,
        serial,
        sign
    } = req.body;

    const raw = `${request_id}${status}${message}${amount}${declared_amount}${code}${serial}${secretKey}`;
    const hash = crypto.createHash("sha256").update(raw).digest("hex");

    return hash === sign;
}
