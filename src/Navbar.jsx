import React, { useState, useRef } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import './Navbar.css';
import pen from './images/logo.png';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const burgerRef = useRef(null);

  // --- NEW LOGIC: HIDE NAVBAR ON SPECIFIC PATHS ---
  const hiddenPaths = ["/ContactUs", "/"]; 
  if (hiddenPaths.includes(location.pathname)) {
    return null; // Don't render anything
  }
  // -----------------------------------------------

  const fullUsername = Cookies.get("username") || "User";
  const displayedUsername = fullUsername.length > 12 
    ? fullUsername.substring(0, 12) + "..." 
    : fullUsername;

  const handleLogout = () => {
    Cookies.remove("username");
    sessionStorage.clear();
    localStorage.clear();
    closeMobileMenu();
    navigate("/login");
    window.location.reload(); 
  };

  const closeMobileMenu = () => {
    if (burgerRef.current) {
      burgerRef.current.checked = false;
    }
    setIsDropdownOpen(false);
  };

  const navItems = [
    { name: 'Question Papers', path: '/questionpapers', icon: 'https://img.icons8.com/ios/50/ffffff/paper.png' },
    { name: 'Collections', path: '/collections', icon: 'https://img.icons8.com/ios/50/ffffff/bookmark-ribbon.png' },
    { name: 'Contribute', path: '/contribute', icon: 'https://img.icons8.com/ios/50/ffffff/paper-plane.png' },
  ];

  return (
    <nav className="synergic-navbar">
      <div className="nav-logo">
        <Link to="/" onClick={closeMobileMenu}>
          <img src={pen} alt="logo" />
        </Link>
      </div>

      <label className="burger" htmlFor="burger">
        <input type="checkbox" id="burger" ref={burgerRef} />
        <span></span><span></span><span></span>
      </label>

      <div className="nav-pill-container">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={closeMobileMenu}
            >
              <img 
                src={item.icon} 
                alt={item.name} 
                className={`nav-icon ${isActive ? 'icon-dark' : 'icon-light'}`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}

        <div className="profile-select">
          <div className="profile-selected" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <div className="profile-avatar">
              {fullUsername.charAt(0).toUpperCase()}
            </div>
            <span className="profile-name">{displayedUsername}</span>
            <svg viewBox="0 0 10 10" className={`profile-arrow ${isDropdownOpen ? 'open' : ''}`}>
              <path d="M1 3L5 7L9 3" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
            </svg>
          </div>

          <div className={`profile-options ${isDropdownOpen ? 'show' : ''}`}>
            <div className="profile-option" onClick={() => { navigate("/ContactUs"); closeMobileMenu(); }}>
              Leave a message
            </div>
            <div className="profile-option logout" onClick={handleLogout}>
              Log Out
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;