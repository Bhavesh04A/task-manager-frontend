import React from "react";
import { FiCheckCircle, FiAlertCircle, FiInfo, FiX } from "react-icons/fi";

export default function Toast({ message, type = "info", onClose }) {
  const colors = {
    success: {
      bg: "bg-green-50",
      text: "text-green-800",
      icon: <FiCheckCircle className="text-green-500" size={20} />
    },
    error: {
      bg: "bg-red-50",
      text: "text-red-800",
      icon: <FiAlertCircle className="text-red-500" size={20} />
    },
    info: {
      bg: "bg-blue-50",
      text: "text-blue-800",
      icon: <FiInfo className="text-blue-500" size={20} />
    }
  };

  return (
    <div
      className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-lg shadow-md ${colors[type].bg} ${colors[type].text} flex items-center space-x-3 animate-fade-in-up`}
      role="alert"
      aria-live="assertive"
    >
      {colors[type].icon}
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-2 text-gray-400 hover:text-gray-500 focus:outline-none"
        aria-label="Close"
      >
        <FiX size={18} />
      </button>
    </div>
  );
}
