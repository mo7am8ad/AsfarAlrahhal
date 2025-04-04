import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../Css/Blogs.css";
import BlogsBackgroundImage from "../assets/MakkahAtNight.png";
import BlogCard from "../components/BlogCard";
import BlogCatigoryComponent from "../components/BlogCatigory.jsx";

const Blogs = () => {
  const { t, i18n } = useTranslation();
  const categories = ["All", "travel", "Haj", "omrah"]; // English category names
  const [activeCategory, setActiveCategory] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch blogs from the backend
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/blogs?lang=${i18n.language}`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading blog data:", error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [i18n.language]); // Re-fetch blogs when the language changes

  // Filter blogs based on category and search query
  useEffect(() => {
    let filtered = blogs;

    // Filter by category
    if (activeCategory !== "All") {
      filtered = filtered.filter((blog) => blog.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((blog) => {
        const title = blog.title || ""; // Default to empty string if title is undefined
        const content = blog.intro || ""; // Use intro for search
        return (
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          content.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });
    }

    setFilteredBlogs(filtered);
  }, [activeCategory, blogs, searchQuery]);

  // Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="BlogsPage">
      <div className="BLogsHeroSection">
        <div className="BLogsHeroSectionLowerContainer">
          <h1>{t("BlogPageHeroSectionHeader")}</h1>
          <p>{t("BlogPageHeroSectionParagraph")}</p>
          <button>{t("BlogPageHeroSectionButton")}</button>
        </div>
      </div>

      <div className="BlogsSection">
        <div className="BlogsCardsContianer">
          {loading ? (
            <p>{t("loading")}</p>
          ) : error ? (
            <p>{t("error")}: {error}</p>
          ) : filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          ) : (
            <p>{t("noBlogsFound")}</p>
          )}
        </div>

        <div>
          <div className="BlogsSearchContainer">
            <input
              type="text"
              placeholder={t("searchPlaceholder")}
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          <div className="BlogsFilterContainer">
            {categories.map((cat) => (
              <BlogCatigoryComponent
                key={cat}
                Catigory={t(`categories.${cat}`)} // Use translated category name
                isActive={activeCategory === cat}
                onClick={() => handleCategoryClick(cat)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;