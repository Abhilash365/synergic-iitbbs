import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Navbar.css";
import pen from './pen.png';


const Navbar = ({ setAuth }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);


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
        <li className={location.pathname === "/" ? "color" : ""}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Question Papers</Link>
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
        </li>
      </ul>
      </div>
    </nav>
    </div>
  );
};

export default Navbar;
