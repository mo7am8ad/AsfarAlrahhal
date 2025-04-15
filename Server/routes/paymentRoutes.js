import express from "express";
import axios from "axios";
import crypto from "crypto";
import dotenv from "dotenv";
import { generateSignature } from "../utils/signatureUtils.js";
import { error } from "console";

dotenv.config();
const router = express.Router();



// Route to create a payment link
router.post("/create-payment-link", async (req, res) => {
    try {
        const { invoiceId, customerName, customerEmail, customerNumber, totalAmount, notificationType } = req.body;

        // Validate required fields
        if (!invoiceId || !customerName || !customerEmail || !customerNumber || !totalAmount) {
            return res.status(400).json({ message: "Missing required fields." });
            
        }

        // Format the request_expiry_date
        const requestExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .replace(/\.\d+Z$/, "+03:00");

        // Payment request parameters
        const params = {
            service_command: "PAYMENT_LINK",
            access_code: process.env.AMAZON_ACCESS_CODE,
            merchant_identifier: process.env.AMAZON_MERCHANT_ID,
            merchant_reference: invoiceId,
            amount: totalAmount * 100, // Convert to smallest unit (e.g., cents)
            currency: process.env.AMAZON_CURRENCY || "SAR",
            language: "en",
            customer_email: customerEmail,
            customer_name: customerName,
            customer_phone: customerNumber,
            request_expiry_date: requestExpiryDate,
            notification_type: "EMAIL", // for now , im gonna change it later
            return_url: process.env.RETURN_URL,
        };

        // Generate signature
        params.signature = generateSignature(params, process.env.AMAZON_SHA_REQUEST_PHRASE);

        console.log("Sending request to Amazon Pay with params:", params);

        // Send request to Amazon Pay (PayFort)
        const response = await axios.post(process.env.AMAZON_API_URL, params, {
            headers: { "Content-Type": "application/json" },
        });

        console.log("Amazon Pay Response:", response.data);

        // Check if the payment link was generated successfully
        if (response.data.response_code !== "48000") {
            return res.status(400).json({
                success: false,
                message: "Failed to generate payment link",
                error: response.data.response_message,
            });
        }

        // Return the payment link to the frontend
        return res.status(200).json({
            success: true,
            paymentLink: response.data.payment_link,
            paymentLinkId: response.data.payment_link_id,
        });
    } catch (error) {
        console.error("Payment Link Error:", error.response?.data || error.message);
        return res.status(500).json({
            message: "Internal Server Error",
            error: error.response?.data || error.message,
        });
    }
});

export default router;