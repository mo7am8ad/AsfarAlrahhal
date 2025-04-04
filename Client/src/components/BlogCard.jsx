import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../Css/BlogCard.css";

const BlogCard = ({ blog }) => {
  const { t, i18n } = useTranslation();
  const language = i18n.language;

  return (
    <Link to={`/blogs/${blog._id}?lang=${language}`}>
      <div className="BlogCardContainer">
        <div className="BlogImageContianer">
          <img src={blog.image[0]} alt={blog.title} />
        </div>
        <div className="BlogCardLowerContianer">
          <div className="BlogCatigory">
            <p>{blog.category}</p>
          </div>
          <h1>{blog.title}</h1>
          <p>{blog.intro}</p>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;