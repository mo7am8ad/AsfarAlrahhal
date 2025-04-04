import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./Css/dashboard.css"; // Create this file for styling

const Dashboard = () => {
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/login"; // Redirect back to login page
  };
  
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>لوحة التحكم</h2>
        <nav>
          <ul>
            <li><Link to="/admin/dashboard/hotels">إدارة الفنادق</Link></li>
            <li><Link to="/admin/dashboard/blogs">إدارة البلوجز</Link></li>
            <li><Link to="/admin/dashboard/invoices">الفواتير</Link></li>
            <button onClick={handleLogout}>تسجيل الخروج</button>
          </ul>
        </nav>
      </aside>
      <main className="content">
        <div className="Asa">
          <Outlet/> {/* This will render the selected page */}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
