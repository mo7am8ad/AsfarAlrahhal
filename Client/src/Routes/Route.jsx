import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Layout from "../Layout";
import Homepage from "../pages/HomePage.jsx";
import Hotels from "../pages/Hotels.jsx";
import Flights from "../pages/Flights.jsx";
import Transportations from "../pages/Transportations.jsx";
import Hotel from "../pages/Hotel.jsx";
import AboutUS from "../pages/AboutUs.jsx";
import Blogs from "../pages/Blogs.jsx";
import Blog from "../pages/Blog.jsx";
import Login from "../admin/login.jsx";
import Dashboard from "../admin/dashboard.jsx";
import ManageHotels from "../admin/ManageHotels.jsx";
import ManageBlogs from "../admin/ManageBlogs.jsx";
import CreateInvoice from "../admin/CreateInvoice.jsx";
import HotelForm from "../admin/HotelForm.jsx"; 
import BlogForm from "../admin/BlogForm.jsx"; 
import Invoices from "../admin/Invoices.jsx";
import Allinvoices from "../admin/Allinvoices.jsx";
import TermsOfUse from "../pages/TermOfUse.jsx";
import PrivacyPolicy from "../pages/PrivacyPolicy.jsx";
import ContactForm from "../pages/ContactForm.jsx";


// Authentication check function
const isAuthenticated = () => {
  return sessionStorage.getItem("token") !== null;
};

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/admin/login" replace />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/hotels" replace />} />
          <Route path="/hotels" element={<Homepage />} />
          <Route path="/hotels/:id" element={<Hotel />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/transportations" element={<Transportations />} />
          <Route path="/about-us" element={<AboutUS />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/terms&conditions" element={<TermsOfUse/>} />
          <Route path="/privacy-policy" element={<PrivacyPolicy/>} />
          <Route path="/Contact-us" element={<ContactForm/>} />

          

          {/* Admin Login Route */}
          <Route path="/admin/login" element={<Login />} />

          {/* Protected Admin Routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="hotels" element={<ManageHotels />} />
            <Route path="hotels/add" element={<HotelForm isEdit={false} />} />
            <Route path="hotels/edit/:id" element={<HotelForm isEdit={true} />} />
            <Route path="blogs" element={<ManageBlogs />} />
            <Route path="blogs/add" element={<BlogForm isEdit={false}/>} />
            <Route path="blogs/edit/:id" element={<BlogForm isEdit={true}/>} />
            <Route path="invoices" element={<Invoices/>} />
            <Route path="invoices/create" element={<CreateInvoice/>}/>
            <Route path="invoices/all" element={<Allinvoices/>}/>
          </Route>

          {/* Catch-all for unknown routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;