import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    en: { type: String, required: true }, // English title
    ar: { type: String, required: true }, // Arabic title
  },
  intro: {
    en: { type: String, required: true }, // English intro
    ar: { type: String, required: true }, // Arabic intro
  },
  first_part: {
    en: { type: String, required: true }, // English first part
    ar: { type: String, required: true }, // Arabic first part
  },
  second_part: {
    en: { type: String, required: true }, // English second part
    ar: { type: String, required: true }, // Arabic second part
  },
  category: {
    en: { type: String, required: true }, // English category
    ar: { type: String, required: true }, // Arabic category
  },
  image: { type: Array, required: true }, // Images (common for both languages)
  publishedAt: { type: Date, required: true }, // Publication date (common for both languages)
}, {
  timestamps: true,
});

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;