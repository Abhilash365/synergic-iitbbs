import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';
import pen from './images/logo.png';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { 
      name: 'Question Papers', 
      path: '/questionpapers', 
      icon: 'https://img.icons8.com/ios/50/ffffff/paper.png' 
    },
    { 
      name: 'Materials', 
      path: '/materials', 
      icon: 'https://img.icons8.com/ios/50/ffffff/book.png' 
    },
    { 
      name: 'Contribute', 
      path: '/contribute', 
      icon: 'https://img.icons8.com/ios/50/ffffff/paper-plane.png' 
    },
  ];

  return (
    <nav className="synergic-navbar">
      <div className="nav-logo">
        <img className="pen_logo" src={pen} alt="logo" style={{ width: '30px', marginRight: '10px' }} />
        <span className="logo-text">Synergic</span>
      </div>

      <div className="nav-pill-container">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-item ${isActive ? 'active' : ''}`}
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
      </div>

      <div className="nav-actions">
        <button className="action-btn theme-toggle">
          <img src="https://img.icons8.com/ios/50/C6EF4E/sun--v1.png" alt="Theme" />
        </button>
        <button className="action-btn profile-btn">
          <img 
            src="https://img.icons8.com/?size=100&id=zxB19VPoVLjK&format=png&color=C6EF4E" 
            alt="Profile Icon" 
            className="logo-icon"
          />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;