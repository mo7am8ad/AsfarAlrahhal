import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export const createCheckoutSession = async (req, res) => {
  const { invoiceId, amount } = req.body;

  try {
    const amazonPayResponse = await axios.post(
      "https://pay-api.amazon.com/live/checkoutSessions",
      {
        webCheckoutDetails: {
          checkoutResultReturnUrl: "http://localhost:5173/payment-success",
        },
        chargeAmount: {
          amount: amount.toFixed(2),
          currencyCode: "USD",
        },
        merchantMetadata: {
          merchantReferenceId: invoiceId,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.AMAZON_PAY_ACCESS_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({ paymentUrl: amazonPayResponse.data.webCheckoutDetails.checkoutUrl });
  } catch (error) {
    console.error("Amazon Pay Error:", error);
    res.status(500).json({ message: "Payment processing failed" });
  }
};