import axios from "axios";

const NCC_API_URL = "https://doithe1s.vn/api/card-auto.php";

export const sendToNCC = async ({ telco, amount, serial, code, requestId, provider }) => {
  try {
    const apiKey =
      provider === "NCC1"
        ? process.env.NCC1_KEY
        : provider === "NCC2"
        ? process.env.NCC2_KEY
        : process.env.NCC3_KEY;

    const body = {
      merchant_id: process.env.MERCHANT_ID,
      api_key: apiKey,
      card_type: telco,
      card_amount: amount,
      card_serial: serial,
      card_code: code,
      request_id: requestId,
      callback_url: process.env.CALLBACK_URL,
    };

    const res = await axios.post(NCC_API_URL, body, {
      timeout: 10000,
    });

    return res.data;
  } catch (err) {
    console.error("NCC Error:", err.message);
    return {
      status: "error",
      message: "Không gọi được NCC",
    };
  }
};
