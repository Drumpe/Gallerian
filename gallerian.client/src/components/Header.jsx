import React from 'react';
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import "../styling/Header.css";

const Header = () => {
  const { user, handleLogout } = useContext(UserContext);

  return (
    <header className="header" role="banner">
      <nav className="header-nav" aria-label="Main navigation">
        <div className="logo-and-search">
          <div className="logo-container">
            <span className="site-name">Gallerian</span>
          </div>
          <Link to="/search" className="search-link" aria-label="Search all artwork on Gallerian">
            <span className="search-text">SEARCH</span>
          </Link>
        </div>
        <div className="auth-links">
          {user ? (
            <>
              <span className="user-greeting">Welcome, {user.userName}</span>
              <button onClick={handleLogout} className="btn btn-primary" aria-label="Log out of your account">
                Log Out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" aria-label="Log in to your account">
              Log In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;