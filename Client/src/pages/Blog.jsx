import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Css/Blog.css";
import BlogDotIcon from '../assets/record-button.png';
import BlogCard from "../components/BlogCard.jsx";
import HotelCard from "../components/HotelCard.jsx";

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  // Fetch the single blog
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`https://api.asfaralrahhal.net/api/blogs/${id}?lang=${language}`);
        if (!response.ok) throw new Error("Failed to fetch blog");
        const data = await response.json();
        setBlog(data);
        setLoading(false);
      } catch (error) {
        console.error("Error loading blog data:", error);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id, language]);

  // Fetch all blogs for related blogs section
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`https://api.asfaralrahhal.net/api/blogs?lang=${language}`);
        if (!response.ok) throw new Error("Failed to fetch blogs");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error loading blog data:", error);
      }
    };
    fetchBlogs();
  }, [language]);

  // Fetch hotels
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await fetch("https://api.asfaralrahhal.net/api/hotels");
        if (!response.ok) throw new Error("Failed to fetch hotels");
        const data = await response.json();
        setHotels(data);
      } catch (error) {
        console.error("Error loading hotel data:", error);
      }
    };
    fetchHotels();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!blog) {
    return <p>Blog not found.</p>;
  }

  const relatedBlogs = blogs.filter((b) => b._id !== blog._id);

  return (
    <div className="SingleBlogPage">
      <div className="SingleBlogPageUpper">
        <div className="SingleBlogContianer">
          <div className="SingleBlogUpperPart">
            <div className="SingleBLogImageContainer">
              <img src={blog.image[0]} alt={blog.title} />
            </div>
            <div className="SingleBlogHeaderContianer">
              <div className="SingleBlogCatigory">
                <p>{blog.category}</p>
              </div>
              <h1>{blog.title}</h1>
              <p>{new Date(blog.publishedAt).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="SingleBlogContentContianer">
            <div className="SingleBlogIntroContainer">
              <img src={BlogDotIcon} alt="Dot Icon" />
              <h1>{blog.intro}</h1>
            </div>
            <div className="SingleBlogContentFirstSection">
              <p>{blog.first_part}</p>
            </div>
            <div className="SingleBlogContentSecondSection">
              <p>{blog.second_part}</p>
            </div>
          </div>
          <hr />
        </div>
        <div className="OtherBlogsContinaer">
          <h1>{t('SingleBlogPageLeftPartHeaderReadMore')}</h1>
          {relatedBlogs.map((relatedBlog) => (
            <BlogCard key={relatedBlog._id} blog={relatedBlog} />
          ))}
        </div>
      </div>

      <div className="SingleBlogContactUsContainer">
        <h1>{t('SingleBlogContactUsCardHeader')}</h1>
        <p>{t('SingleBlogContactUsCardParagraph')}</p>
        <button onClick={() => window.open(`https://wa.me/+971506851559?text=${encodeURIComponent(t('whatsAppMessage'))}`, "_blank")}>
          {t('SingleBlogContactUsCardButton')}
        </button>
      </div>

      <div className="SingleBlogHotelCardsContianer">
        <h1>{t('SingleBlogBestHotelsCardHeader')}</h1>
        <div className="HotelCardsContainerAtSingleBlogPage">
          {hotels.slice(0, 4).map((hotel) => (
            <HotelCard key={hotel._id} hotel={hotel} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;