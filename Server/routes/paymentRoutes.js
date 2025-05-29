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
    console.log("--- NEW PAYMENT LINK REQUEST STARTED ---");
    console.log("Request Body:", JSON.stringify(req.body, null, 2));

    try {
        // Input validation
        console.log("\n[1] Validating Inputs...");
        const { invoiceId, customerName, customerEmail, customerNumber, totalAmount } = req.body;
        if (!invoiceId || !customerName || !customerEmail || !customerNumber || !totalAmount) {
            console.error("Validation Failed - Missing Fields:", {
                invoiceId, customerName, customerEmail, customerNumber, totalAmount
            });
            return res.status(400).json({ message: "Missing required fields." });
        }
        console.log("✅ Input Validation Passed");

        // Prepare parameters
        console.log("\n[2] Preparing Parameters...");
        const requestExpiryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
            .toISOString()
            .replace(/\.\d+Z$/, "+03:00");
        
        const params = {
            service_command: "PAYMENT_LINK",
            access_code: process.env.AMAZON_ACCESS_CODE,
            merchant_identifier: process.env.AMAZON_MERCHANT_ID,
            merchant_reference: invoiceId,
            amount: Math.round(parseFloat(totalAmount) * 100).toString(),
            currency: process.env.AMAZON_CURRENCY || "SAR",
            language: "en",
            notification_type: "EMAIL",
            customer_email: customerEmail,
            customer_name: customerName,
            customer_phone: customerNumber,
            request_expiry_date: requestExpiryDate,
            return_url: process.env.RETURN_URL,
        };
        console.log("Parameters Prepared:", JSON.stringify(params, null, 2));

        // Signature generation
        console.log("\n[3] Generating Signature...");
        params.signature = generateSignature(params, process.env.AMAZON_SHA_REQUEST_PHRASE);
        console.log("Signature Generated:", params.signature);

        // API Request
        console.log("\n[4] Sending to APS...");
        console.log("Full Request Payload:", JSON.stringify(params, null, 2));
        console.log("API Endpoint:", process.env.AMAZON_API_URL);

        const response = await axios.post(
            process.env.AMAZON_API_URL, 
            params,
            {
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                timeout: 10000
            }
        );
        console.log("✅ APS Response Received");
        console.log("Response Status:", response.status);
        console.log("Response Data:", JSON.stringify(response.data, null, 2));

        // Handle response
        if (!response.data.payment_link) {
            console.error("APS Response Missing Payment Link");
            throw new Error("No payment_link in response");
        }

        console.log("\n[5] Success - Payment Link Generated");
        return res.json({
            success: true,
            paymentLink: response.data.payment_link,
            paymentLinkId:response.data.payment_link_id
        });

    } catch (error) {
        console.error("Full PayFort Response:", {
            status: error.response?.status,
            headers: error.response?.headers,
            data: error.response?.data,  // This contains the actual error message from PayFort
            config: {
                url: error.response?.config?.url,
                data: error.response?.config?.data
            }
        });
        
        return res.status(500).json({
            success: false,
            message: "Payment link generation failed",
            error: error.response?.data || error.message
        });
    }
});

export default router;