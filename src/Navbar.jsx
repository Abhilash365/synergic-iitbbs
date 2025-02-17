import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import pen from './pen.png';


const Navbar = ({ setAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated"); // Clear authentication state
    setAuth(false); // Update state in App.js
    navigate("/signin"); // Redirect to login page
  };

  return (
    <div className="relative">
    <nav className="navbar">
      {/* Logo */}
      <div className="part_1">
      <div className="log"><img className="pen_logo" src={pen} alt="logo" /></div>
      </div>
    <div className="part_2">
      {/* Hamburger Menu Icon */}
      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Menu */}
      <ul className={`buttons ${menuOpen ? "active" : ""}`}>
        <li className={location.pathname === "/questionpapers" ? "color" : ""}>
          <Link to="/questionpapers" onClick={() => setMenuOpen(false)}>Question Papers</Link>
        </li>
        <li className={location.pathname === "/materials" ? "color" : ""}>
          <Link to="/materials" onClick={() => setMenuOpen(false)}>Materials</Link>
        </li>
        <li className={location.pathname === "/newskill" ? "color" : ""}>
          <Link to="/newskill" onClick={() => setMenuOpen(false)}>New Skill</Link>
        </li>
        <li className={location.pathname === "/contribute" ? "color" : ""}>
          <Link to="/contribute" onClick={() => setMenuOpen(false)}>Contribute</Link>
        </li>
        <li>
          <button className="logout_btn" onClick={handleLogout}>Logout</button>
        </li>
      </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
