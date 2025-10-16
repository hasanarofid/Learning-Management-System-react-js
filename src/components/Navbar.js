import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="logo">
          LMS
        </Link>

        {/* Desktop Navigation */}
        <ul className="nav-links desktop-nav">
          <li>
            <Link 
              to="/" 
              className={isActive('/') ? 'active' : ''}
            >
              Beranda
            </Link>
          </li>
          <li>
            <Link 
              to="/courses" 
              className={isActive('/courses') ? 'active' : ''}
            >
              Kursus
            </Link>
          </li>
          {user && (
            <li>
              <Link 
                to="/enrollments" 
                className={isActive('/enrollments') ? 'active' : ''}
              >
                Kursus Saya
              </Link>
            </li>
          )}
        </ul>

        {/* User Menu */}
        <div className="user-menu">
          {user ? (
            <div className="user-dropdown">
              <div className="user-info">
                <FiUser className="user-icon" />
                <span className="user-name">{user.full_name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <FiLogOut />
                Keluar
              </button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary">
              Masuk
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="mobile-nav">
          <ul className="mobile-nav-links">
            <li>
              <Link 
                to="/" 
                className={isActive('/') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link 
                to="/courses" 
                className={isActive('/courses') ? 'active' : ''}
                onClick={() => setIsMenuOpen(false)}
              >
                Kursus
              </Link>
            </li>
            {user && (
              <li>
                <Link 
                  to="/enrollments" 
                  className={isActive('/enrollments') ? 'active' : ''}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Kursus Saya
                </Link>
              </li>
            )}
            {!user && (
              <li>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                >
                  Masuk
                </Link>
              </li>
            )}
            {user && (
              <li>
                <button onClick={handleLogout} className="mobile-logout">
                  Keluar
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
