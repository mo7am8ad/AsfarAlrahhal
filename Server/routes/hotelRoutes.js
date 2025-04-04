import express from "express";
import Hotel from "../models/Hotel.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all hotels
router.get("/", async (req, res) => {
  try {
    const hotels = await Hotel.find();
    const language = req.query.lang || "en"; // Default to English if no language is specified

    // Localize the hotels based on the selected language
    const localizedHotels = hotels.map((hotel) => ({
      _id: hotel._id,
      hotelName: hotel.hotelName,
      location: hotel.location,
      detailed_location: hotel.detailed_location,
      description: hotel.description,
      images: hotel.images,
    }));

    res.json(localizedHotels);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single hotel by ID
router.get("/:id", async (req, res) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    const language = req.query.lang; // Get the language parameter

    // If a language is specified, return only the localized data
    if (language) {
      const localizedHotel = {
        _id: hotel._id,
        hotelName: hotel.hotelName[language],
        location: hotel.location[language],
        detailed_location: hotel.detailed_location[language],
        description: hotel.description[language],
        images: hotel.images,
      };
      return res.json(localizedHotel);
    }

    // If no language is specified, return the full hotel data (both English and Arabic)
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new hotel
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { hotelName, location, detailed_location, description, images } = req.body;

    if (!images || images.length === 0) return res.status(400).json({ message: "Images required" });

    const newHotel = new Hotel({
      hotelName,
      location,
      detailed_location,
      description,
      images,
    });

    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an existing hotel
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { hotelName, location, detailed_location, description, images } = req.body;
    const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {
      hotelName,
      location,
      detailed_location,
      description,
      images,
    }, { new: true });

    if (!updatedHotel) return res.status(404).json({ message: "Hotel not found" });

    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a hotel
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) return res.status(404).json({ message: "Hotel not found" });

    res.json({ message: "Hotel deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;