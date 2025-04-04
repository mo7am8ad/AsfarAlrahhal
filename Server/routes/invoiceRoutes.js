import express from "express";
import Invoice from "../models/Invoice.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { updatePaymentStatus } from "../controllers/invoiceController.js"; // Import the function

const router = express.Router();

// Create Invoice
router.post("/", authenticateToken, async (req, res) => {
    try {
        const { customerName, customerNumber, email, hotel, nights, pricePerNight, paymentLink, paymentLinkId } = req.body;

        // Validate required fields
        if (!customerName || !customerNumber || !email || !hotel || !nights || !pricePerNight || !paymentLink || !paymentLinkId) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        // Calculate total amount
        const totalAmount = nights * pricePerNight;

        // Create new invoice
        const newInvoice = new Invoice({
            customerName,
            customerNumber,
            email,
            hotel,
            nights,
            pricePerNight,
            totalAmount,
            paymentStatus: "pending",
            paymentLink,
            paymentLinkId,
        });

        // Save invoice to database
        const savedInvoice = await newInvoice.save();
        res.status(201).json(savedInvoice);
    } catch (error) {
        console.error("Error creating invoice:", error);
        res.status(500).json({ message: "Error creating invoice", error: error.message });
    }
});

// Get all invoices
router.get("/", authenticateToken, async (req, res) => {
    try {
        const invoices = await Invoice.find().populate("hotel");
        res.json(invoices);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ message: "Error fetching invoices", error: error.message });
    }
});

// Route to update payment status for all invoices
router.get("/update-payment-status", authenticateToken, async (req, res) => {
    try {
        await updatePaymentStatus(); // Call the imported function
        res.status(200).json({ success: true, message: "Payment status updated successfully." });
    } catch (error) {
        console.error("Error updating payment status:", error);
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
});

// Get single invoice by ID
router.get("/:id", authenticateToken, async (req, res) => {
    try {
        const invoice = await Invoice.findById(req.params.id).populate("hotel");
        if (!invoice) {
            return res.status(404).json({ message: "Invoice not found" });
        }
        res.json(invoice);
    } catch (error) {
        console.error("Error fetching invoice:", error);
        res.status(500).json({ message: "Error fetching invoice", error: error.message });
    }
});

export default router;