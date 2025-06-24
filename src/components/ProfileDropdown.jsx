import React from "react";
import { Link } from "react-router-dom";

export default function ProfileDropdown({ show, onClose, onLogout, anchor = "", mobile = false }) {
  if (!show) return null;

  return (
    <div
      className={`absolute ${anchor} mt-2 bg-white text-gray-800 rounded-xl shadow-lg z-20 min-w-[150px] ring-1 ring-blue-100 ${mobile ? "right-0" : ""}`}
      onMouseLeave={onClose}
    >
      <Link
        to="/profile"
        className="block px-5 py-3 font-semibold text-blue-700 hover:bg-blue-50 rounded-t-xl transition"
        onClick={onClose}
      >
        Profile
      </Link>
      <button
        onClick={onLogout}
        className="block w-full text-left px-5 py-3 font-semibold text-red-600 hover:bg-blue-50 rounded-b-xl transition"
      >
        Logout
      </button>
    </div>
  );
}
