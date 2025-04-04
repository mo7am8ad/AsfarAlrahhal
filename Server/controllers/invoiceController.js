import Invoice from "../models/Invoice.js";
import axios from "axios";
import dotenv from "dotenv";
import { generateSignature } from "../utils/signatureUtils.js"; // Import the function

dotenv.config();

// Function to update payment status for all invoices
export const updatePaymentStatus = async () => {
    try {
        // Fetch all invoices from the database
        const invoices = await Invoice.find();

        // Loop through each invoice and check its payment status
        for (const invoice of invoices) {
            if (invoice.paymentLinkId) {
                // Prepare the request to check payment status
                const params = {
                    query_command: "CHECK_PAYMENT_LINK_STATUS",
                    access_code: process.env.AMAZON_ACCESS_CODE,
                    merchant_identifier: process.env.AMAZON_MERCHANT_ID,
                    payment_link_id: invoice.paymentLinkId,
                    language:"en"
                };

                // Generate signature
                params.signature = generateSignature(params, process.env.AMAZON_SHA_REQUEST_PHRASE);

                console.log("Sending request to Amazon Pay with params:", params);

                // Send request to Amazon Pay
                const response = await axios.post(process.env.AMAZON_API_URL, params, {
                    headers: { "Content-Type": "application/json" },
                });

                console.log("Amazon Pay Response:", response.data);

                // Check if the request was successful
                if (response.data.response_message === "Success") {
                    const paymentStatus = response.data.payment_link_status;

                    // Update the invoice status in the database if it has changed
                    if (invoice.paymentStatus !== paymentStatus) {
                        await Invoice.findByIdAndUpdate(invoice._id, { paymentStatus });
                        console.log(`Updated invoice ${invoice._id} to status: ${paymentStatus}`);
                    }
                } else {
                    console.error(`Failed to check status for invoice ${invoice._id}:`, response.data.response_message);
                }
            }
        }

        console.log("Payment status update completed.");
    } catch (error) {
        console.error("Error updating payment status:", error);
        throw error; // Rethrow the error to handle it in the route
    }
};