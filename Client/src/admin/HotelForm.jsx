import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Css/HotelForm.css';

const HotelForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    hotelName: { en: "", ar: "" },
    location: { en: "", ar: "" },
    detailed_location: { en: "", ar: "" },
    description: { en: "", ar: "" },
    images: [], // Array to store image URLs
  });

  const [selectedImages, setSelectedImages] = useState([]);

  // Fetch hotel details if in edit mode
  useEffect(() => {
    if (isEdit && id) {
      const fetchHotel = async () => {
        try {
          const response = await fetch(`http://localhost:5000/api/hotels/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch hotel");
          const data = await response.json();

          // Debug the fetched data
          console.log("Fetched hotel data:", data);

          // Set the fetched data to formData
          setFormData({
            hotelName: data.hotelName || { en: "", ar: "" },
            location: data.location || { en: "", ar: "" },
            detailed_location: data.detailed_location || { en: "", ar: "" },
            description: data.description || { en: "", ar: "" },
            images: data.images || [],
          });
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchHotel();
    }
  }, [isEdit, id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Split the name into the field and language (e.g., "location.en" -> ["location", "en"])
    const [field, lang] = name.split(".");
  
    // Update the nested state
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field], // Preserve other language fields
        [lang]: value, // Update the specific language field
      },
    }));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  // Upload images to Cloudinary
  const uploadImages = async () => {
    const uploadedImageUrls = [];
    const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/djxcopfga/image/upload';
    const uploadPreset = 'AsfarAlrahhalF';

    for (let image of selectedImages) {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", uploadPreset);

      try {
        const response = await fetch(cloudinaryUrl, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Cloudinary error response:", errorText);
          continue;
        }

        const data = await response.json();
        uploadedImageUrls.push(data.secure_url);
      } catch (error) {
        console.error("Image upload failed:", error);
      }
    }

    return uploadedImageUrls;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrls = [];

    if (selectedImages.length > 0) {
      imageUrls = await uploadImages();
    }

    // Prepare the data to send to the backend
    const updatedFormData = {
      ...formData,
      images: [...formData.images, ...imageUrls],
    };

    const url = isEdit
      ? `http://localhost:5000/api/hotels/${id}`
      : "http://localhost:5000/api/hotels";

    const method = isEdit ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
        body: JSON.stringify(updatedFormData),
      });

      if (!response.ok) throw new Error("Failed to save hotel");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="EditAddHotelContianer">
      <h1>{isEdit && id ? "تعديل معلومات الفندق" : "إضافة فندق جديد"}</h1>
      <form className="EditAddHotelForm" onSubmit={handleSubmit}>
        {/* Hotel Name */}
        <input
          type="text"
          name="hotelName.en"
          value={formData.hotelName.en}
          onChange={handleChange}
          placeholder="Hotel Name (English)"
          required
        />
        <input
          type="text"
          name="hotelName.ar"
          value={formData.hotelName.ar}
          onChange={handleChange}
          placeholder="اسم الفندق (العربية)"
          required
        />

        {/* Location */}
        <div>
          <select
            name="location.en"
            value={formData.location.en}
            onChange={handleChange}
            required
          >
            <option value="" disabled>Select City (English)</option>
            <option value="Makkah">Makkah</option>
            <option value="Madinah">Madinah</option>
          </select>
        </div>

        <div>
          <select
            name="location.ar"
            value={formData.location.ar}
            onChange={handleChange}
            required
          >
            <option value="" disabled>اختر المدينة (العربية)</option>
            <option value="مكة المكرمة">مكة المكرمة</option>
            <option value="المدينة المنورة">المدينة المنورة</option>
          </select>
        </div>
        {/* Detailed Location */}
        <input
          type="text"
          name="detailed_location.en"
          value={formData.detailed_location.en}
          onChange={handleChange}
          placeholder="Detailed Location (English)"
          required
        />
        <input
          type="text"
          name="detailed_location.ar"
          value={formData.detailed_location.ar}
          onChange={handleChange}
          placeholder="الموقع التفصيلي (العربية)"
          required
        />

        {/* Description */}
        <textarea
          name="description.en"
          value={formData.description.en}
          onChange={handleChange}
          placeholder="Description (English)"
          required
        />
        <textarea
          name="description.ar"
          value={formData.description.ar}
          onChange={handleChange}
          placeholder="وصف الفندق (العربية)"
          required
        />

        {/* Image Upload */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <button type="submit">{isEdit ? "تعديل" : "إضافة"}</button>
      </form>
    </div>
  );
};

export default HotelForm;