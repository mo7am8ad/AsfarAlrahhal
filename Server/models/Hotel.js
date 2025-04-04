import mongoose from "mongoose";

const hotelSchema = new mongoose.Schema({
  hotelName: {
    en: { type: String, required: true }, // English hotel name
    ar: { type: String, required: true }, // Arabic hotel name
  },
  location: {
    en: { type: String, required: true }, // English location
    ar: { type: String, required: true }, // Arabic location
  },
  detailed_location: {
    en: { type: String, required: true }, // English detailed location
    ar: { type: String, required: true }, // Arabic detailed location
  },
  description: {
    en: { type: String, required: true }, // English description
    ar: { type: String, required: true }, // Arabic description
  },
  images: { type: [String], required: false }, // Store multiple image URLs
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const Hotel = mongoose.model("Hotel", hotelSchema);

export default Hotel;