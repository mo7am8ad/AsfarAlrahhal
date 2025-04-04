import React from "react";
import "../Css/BlogCatigory.css";

const BlogCatigoryComponent = ({ Catigory, isActive, onClick }) => {
  return (
    <button
      className={`BlogCatigoryComponent ${isActive ? "active" : ""}`}
      onClick={onClick}
    >
      {Catigory}
    </button>
  );
};

export default BlogCatigoryComponent;
