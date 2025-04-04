import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../assets/AsfarALrahalLogo.svg";
import EnglishFlag from "../assets/english-flag.png";
import ArabicFlag from "../assets/arabic-flag.png";
import i18n from "i18next";
import "../Css/Navbar.css";
import ChangeLanguage from "../assets/ChangeLanguage.svg";

function Navbar() {
  const { t } = useTranslation();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.pathname);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const [isNavDropdownOpen, setIsNavDropdownOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    localStorage.getItem("appLanguage") || i18n.language
  );

  useEffect(() => {
    setActiveTab(location.pathname);
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    // Apply the direction based on the current language
    document.body.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const toggleNavDropdown = () => {
    setIsNavDropdownOpen(!isNavDropdownOpen);
  };

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    document.body.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("appLanguage", lang); // Save language to local storage
    setCurrentLanguage(lang);
    setIsLanguageDropdownOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <NavLink to="/hotels">
          <img src={Logo} alt="Logo" />
        </NavLink>
      </div>

      <ul className={`navbar-pages-list ${isNavDropdownOpen ? "show" : ""}`}>
        <NavLink to="/hotels" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${activeTab === "/hotels" ? "active" : ""}`}
          >
            {t("NavbarHotels")}
          </li>
        </NavLink>
        <NavLink to="/flights" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${activeTab === "/flights" ? "active" : ""}`}
          >
            {t("NavbarFlights")}
          </li>
        </NavLink>
        <NavLink to="/transportations" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${
              activeTab === "/transportations" ? "active" : ""
            }`}
          >
            {t("NavbarTransportations")}
          </li>
        </NavLink>
        <NavLink to="/about-us" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${
              activeTab === "/about-us" ? "active" : ""
            }`}
          >
            {t("NavbarAboutUs")}
          </li>
        </NavLink>
        <NavLink to="/blogs" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${
              activeTab === "/blogs" ? "active" : ""
            }`}
          >
            {t("NavbarBlogs")}
          </li>
        </NavLink>
        <NavLink to="/Contact-us" onClick={() => setIsNavDropdownOpen(false)}>
          <li
            className={`navbar-tab ${
              activeTab === "/Contact-us" ? "active" : ""
            }`}
          >
            {t("NavbarContactUs")}
          </li>
        </NavLink>
      </ul>

      <div className="MenuAndLangContainer">
        <button className="nav-toggle" onClick={toggleNavDropdown}>
          ☰
        </button>
        <div className="language-dropdown">
          <button onClick={toggleLanguageDropdown} className="dropdown-toggle">
            <img src={ChangeLanguage} alt="Language Toggle" />
          </button>
          {isLanguageDropdownOpen && (
            <ul className="Languagedropdown-menu">
              <li onClick={() => changeLanguage("en")}>
                <img src={EnglishFlag} alt="English" /> English
              </li>
              <li onClick={() => changeLanguage("ar")}>
                <img src={ArabicFlag} alt="Arabic" /> العربية
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
