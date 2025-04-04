import mongoose from 'mongoose';

const InvoiceSchema = new mongoose.Schema({
  paymentLink: { type: String }, // Amazon payment link
  paymentLinkId: { type: String }, // Amazon payment link ID
  customerName: { type: String, required: true },
  customerNumber:{ type: String, required:true},
  email: { type: String, required: true },
  hotel: { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: true },
  nights: { type: Number, required: true },
  pricePerNight: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
  paymentLink: { type: String }, // Amazon payment link
},{timestamps:true});

const Invoice = mongoose.model("Invoice", InvoiceSchema);
export default Invoice;