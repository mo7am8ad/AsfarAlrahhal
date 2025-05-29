import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Css/ManageHotels.css";

const ManageHotels = () => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hotels from the backend
  const fetchHotels = async () => {
    try {
      const response = await fetch("https://api.asfaralrahhal.net/api/hotels", {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch hotels");
      const data = await response.json();
      setHotels(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHotels();
  }, []);

  // Handle delete hotel
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://api.asfaralrahhal.net/api/hotels/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      if (!response.ok) throw new Error("Failed to delete hotel");
      fetchHotels(); // Refresh the list after deletion
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="ManageHotelsContianer">
      <h1>إدارة الفنادق</h1>
      <Link to="/admin/dashboard/hotels/add">إضافة فندق جديد</Link>
      <table>
        <thead>
          <tr>
            <th>اسم الفندق</th>
            <th>الموقع</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {hotels.map((hotel) => (
            <tr key={hotel._id}>
              <td>{hotel.hotelName.ar}</td> {/* Display Arabic hotel name */}
              <td>{hotel.location.ar}</td> {/* Display Arabic location */}
              <td className="EditDeleteColumn">
                <Link to={`/admin/dashboard/hotels/edit/${hotel._id}`}>تعديل</Link>
                <button onClick={() => handleDelete(hotel._id)}>حذف</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageHotels;