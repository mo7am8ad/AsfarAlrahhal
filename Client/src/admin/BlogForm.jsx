import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import './Css/HotelForm.css';

const BlogForm = ({ isEdit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: { en: "", ar: "" },
    intro: { en: "", ar: "" },
    first_part: { en: "", ar: "" },
    second_part: { en: "", ar: "" },
    category: { en: "", ar: "" },
    publishedAt: "", // Ensure this is a string
    image: [],
  });

  const [selectedImages, setSelectedImages] = useState([]);

  useEffect(() => {
    if (isEdit && id) {
      const fetchBlog = async () => {
        try {
          const response = await fetch(`https://api.asfaralrahhal.net/api/blogs/${id}`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          });
          if (!response.ok) throw new Error("Failed to fetch blog");
          const data = await response.json();
  
          // Debug the fetched data
          console.log("Fetched blog data:", data);
  
          // Transform the backend data to match the formData structure
          const transformedData = {
            title: { en: data.title?.en || "", ar: data.title?.ar || "" },
            intro: { en: data.intro?.en || "", ar: data.intro?.ar || "" },
            first_part: { en: data.first_part?.en || "", ar: data.first_part?.ar || "" },
            second_part: { en: data.second_part?.en || "", ar: data.second_part?.ar || "" },
            category: { en: data.category?.en || "", ar: data.category?.ar || "" },
            publishedAt: data.publishedAt ? new Date(data.publishedAt).toISOString().split("T")[0] : "",
            image: data.image || [],
          };
  
          // Set the transformed data to formData
          setFormData(transformedData);
        } catch (error) {
          console.error("Fetch error:", error);
        }
      };
      fetchBlog();
    }
  }, [isEdit, id]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Handle publishedAt separately
    if (name === "publishedAt") {
      setFormData((prev) => ({
        ...prev,
        publishedAt: value, // Set as plain text
      }));
    } else {
      const [field, lang] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...prev[field],
          [lang]: value,
        },
      }));
    }
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
      image: [...formData.image, ...imageUrls],
      publishedAt: `${formData.publishedAt}T00:00:00.000Z`, // Append time to match the database format
    };

    const url = isEdit
      ? `https://api.asfaralrahhal.net/api/blogs/${id}`
      : "https://api.asfaralrahhal.net/api/blogs";

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

      if (!response.ok) throw new Error("Failed to save blog");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Save error:", error);
    }
  };

  return (
    <div className="EditAddHotelContianer">
      <h1>{isEdit && id ? "تعديل المدونة" : "إضافة مدونة جديدة"}</h1>
      <form className="EditAddHotelForm" onSubmit={handleSubmit}>
        {/* Title */}
        <input
          type="text"
          name="title.en"
          value={formData.title.en || ""}
          onChange={handleChange}
          placeholder="Title (English)"
          required
        />
        <input
          type="text"
          name="title.ar"
          value={formData.title.ar || ""}
          onChange={handleChange}
          placeholder="عنوان المدونة (العربية)"
          required
        />

        {/* Category */}
        <input
          type="text"
          name="category.en"
          value={formData.category.en || ""}
          onChange={handleChange}
          placeholder="Category (English)"
          required
        />
        <input
          type="text"
          name="category.ar"
          value={formData.category.ar || ""}
          onChange={handleChange}
          placeholder="فئة المدونة (العربية)"
          required
        />

        {/* Intro */}
        <textarea
          name="intro.en"
          value={formData.intro.en || ""}
          onChange={handleChange}
          placeholder="Intro (English)"
          required
        />
        <textarea
          name="intro.ar"
          value={formData.intro.ar || ""}
          onChange={handleChange}
          placeholder="مقدمة عن المدونة (العربية)"
          required
        />

        {/* First Part */}
        <textarea
          name="first_part.en"
          value={formData.first_part.en || ""}
          onChange={handleChange}
          placeholder="First Part (English)"
          required
        />
        <textarea
          name="first_part.ar"
          value={formData.first_part.ar || ""}
          onChange={handleChange}
          placeholder="الجزء الاول من المدونة (العربية)"
          required
        />

        {/* Second Part */}
        <textarea
          name="second_part.en"
          value={formData.second_part.en || ""}
          onChange={handleChange}
          placeholder="Second Part (English)"
          required
        />
        <textarea
          name="second_part.ar"
          value={formData.second_part.ar || ""}
          onChange={handleChange}
          placeholder="الجزء الثاني من المدونة (العربية)"
          required
        />

        {/* Published At */}
        <input
          type="text" // Plain text input
          name="publishedAt"
          value={formData.publishedAt || ""}
          onChange={handleChange}
          placeholder="تاريخ النشر (e.g., 2024-08-23)"
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

export default BlogForm;