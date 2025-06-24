import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { updateProfile, updatePassword } from "../services/api";
import { FaUserEdit, FaKey, FaSave, FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { token, currentUser, setCurrentUser } = useAuth();
  const [name, setName] = useState(currentUser?.name || "");
  const [email, setEmail] = useState(currentUser?.email || "");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProfile({ name, email }, token);
      setCurrentUser((user) => ({ ...user, name, email }));
      setMsg("Profile updated successfully!");
    } catch {
      setMsg("Failed to update profile.");
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    try {
      await updatePassword({ oldPassword, newPassword }, token);
      setMsg("Password updated successfully!");
      setOldPassword("");
      setNewPassword("");
    } catch {
      setMsg("Failed to update password.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-8 p-6 bg-white rounded-2xl shadow-lg">
      <div className="flex items-center space-x-4 mb-8">
        <FaUserCircle className="text-5xl text-blue-500" />
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Profile Settings</h1>
          <p className="text-gray-600">Manage your account information</p>
        </div>
      </div>

      {msg && (
        <div className={`mb-6 p-3 rounded-lg ${msg.includes("success") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {msg}
        </div>
      )}

      <div className="space-y-8">
        <form onSubmit={handleProfileUpdate} className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <FaUserEdit className="text-xl" />
            <h2 className="text-xl font-semibold">Personal Information</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                id="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Your email"
                type="email"
              />
            </div>
          </div>
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            type="submit"
          >
            <FaSave />
            <span>Update Profile</span>
          </button>
        </form>

        <form onSubmit={handlePasswordUpdate} className="space-y-4">
          <div className="flex items-center space-x-2 text-blue-600">
            <FaKey className="text-xl" />
            <h2 className="text-xl font-semibold">Change Password</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <input
                id="oldPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="password"
                value={oldPassword}
                onChange={e => setOldPassword(e.target.value)}
                placeholder="Current password"
              />
            </div>
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                id="newPassword"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="New password"
              />
            </div>
          </div>
          <button
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            type="submit"
          >
            <FaSave />
            <span>Update Password</span>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;