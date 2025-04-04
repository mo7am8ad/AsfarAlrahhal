import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/ManageHotels.css"

const ManageBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels from the backend
  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/blogs", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch hotels");
      const data = await response.json();
      setBlogs(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Handle delete hotel
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete hotel");
      fetchBlogs(); // Refresh the list after deletion
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ManageHotelsContianer">
      <h1>إدارة المدونات</h1>
      <table>
        <thead>
          <tr>
            <th>اسم المدونة</th>
            <th>الفئة</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog._id}>
              <td>{blog.title}</td>
              <td>{blog.category}</td>
              <td className="EditDeleteColumn">
                <Link to={`/admin/dashboard/blogs/edit/${blog._id}`}>تعديل</Link>
                <button onClick={() => handleDelete(blog._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/admin/dashboard/blogs/add">إضافة مدونة جديدة</Link>
    </div>
  );
};

export default ManageBlogs;