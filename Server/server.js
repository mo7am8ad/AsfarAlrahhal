import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import hotelRoutes from "./routes/hotelRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from './routes/authRoutes.js';
import invoiceRoutes from "./routes/invoiceRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    'https://www.asfaralrahhal.net',
    'https://asfaralrahhal.net',
    'http://localhost:5173'  // For local dev
  ],
  credentials: true
}));

app.use(express.json()); // Parse incoming JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Asfar Alrahhal backend!');
});

// Authentication routes
app.use('/api/auth', authRoutes);

// Protect the hotel and blog routes
app.use('/api/hotels', hotelRoutes); // Protect hotels route
app.use('/api/blogs', blogRoutes);   // Protect blogs route
app.use("/api/invoices", invoiceRoutes);
app.use("/api/payments", paymentRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
