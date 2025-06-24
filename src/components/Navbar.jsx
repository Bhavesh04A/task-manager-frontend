import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaUserCircle, FaTasks } from "react-icons/fa";
import ProfileDropdown from "./ProfileDropdown";

export default function Navbar() {
  const { currentUser, signOut } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    signOut();
    navigate("/login");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    if (!menuOpen) setProfileOpen(false);
  }, [menuOpen]);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-4 py-3 shadow-lg transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaTasks className="text-2xl text-white" />
          <Link 
            to="/" 
            className="text-xl font-bold tracking-wide hover:text-blue-100 transition-colors"
          >
            <span className="text-white">Task</span>
            <span className="text-blue-200">Manager</span>
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all duration-300"
                aria-label="Profile menu"
              >
                <div className="relative">
                  <FaUserCircle size={24} className="text-blue-100" />
                  {profileOpen && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-indigo-700"></div>
                  )}
                </div>
                <span className="font-medium text-white/90">{currentUser.name}</span>
              </button>
              <ProfileDropdown
                show={profileOpen}
                onClose={() => setProfileOpen(false)}
                onLogout={handleLogout}
                anchor="right-0"
              />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full font-medium text-white hover:bg-white/10 transition-all duration-300"
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full font-medium bg-white text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm"
                aria-label="Signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-white/10 focus:outline-none transition-all duration-300 ml-4"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars size={22} />
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden mt-3 pb-2 flex flex-col items-end space-y-2">
          {currentUser ? (
            <div className="relative w-full flex flex-col items-end">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center space-x-2 px-4 py-2 rounded-full hover:bg-white/10 transition-all w-full justify-end"
                aria-label="Profile menu"
              >
                <FaUserCircle size={22} className="text-blue-100" />
                <span className="font-medium">{currentUser.name}</span>
              </button>
              <ProfileDropdown
                show={profileOpen}
                onClose={() => setProfileOpen(false)}
                onLogout={handleLogout}
                anchor="right-0"
                mobile
              />
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 rounded-full font-medium text-white hover:bg-white/10 transition-all w-full text-right"
                onClick={() => setMenuOpen(false)}
                aria-label="Login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-full font-medium bg-white text-blue-600 hover:bg-blue-50 transition-all w-full text-right"
                onClick={() => setMenuOpen(false)}
                aria-label="Signup"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}