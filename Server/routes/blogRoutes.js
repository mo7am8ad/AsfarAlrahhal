import express from "express";
import Blog from "../models/Blog.js";
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    const language = req.query.lang || "en"; // Default to English if no language is specified

    // Localize the blogs based on the selected language
    const localizedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title[language],
      intro: blog.intro[language],
      first_part: blog.first_part[language],
      second_part: blog.second_part[language],
      category: blog.category[language],
      image: blog.image,
      publishedAt: blog.publishedAt,
    }));

    res.json(localizedBlogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single blog by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const language = req.query.lang; // Get the language parameter

    // If a language is specified, return only the localized data
    if (language) {
      const localizedBlog = {
        _id: blog._id,
        title: blog.title[language],
        intro: blog.intro[language],
        first_part: blog.first_part[language],
        second_part: blog.second_part[language],
        category: blog.category[language],
        image: blog.image,
        publishedAt: blog.publishedAt,
      };
      return res.json(localizedBlog);
    }

    // If no language is specified, return the full blog data (both English and Arabic)
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add a new Blog
router.post("/", authenticateToken, async (req, res) => {
  const blog = new Blog(req.body);

  try {
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update Blog
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Blog
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;