import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // Navigate to the home page when the logo is clicked
  };

  return (
    <header className="bg-indigo-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Brand Name */}
        <div
          onClick={handleLogoClick}
          className="cursor-pointer text-2xl font-bold"
        >
          Join Table
        </div>

        {/* Navigation Links */}
        <nav className="space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;