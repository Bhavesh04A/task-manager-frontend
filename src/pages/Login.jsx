import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Toast from "../components/toast";

const DEMO_EMAIL = "user@gmail.com";
const DEMO_PASSWORD = "password";

const Login = () => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      setLoading(false);
      return;
    }
    try {
      await signIn(email, password);
      setToast({ show: true, message: "Login successful!", type: "success" });
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch {
      setToast({ show: true, message: "Login failed. Check your credentials.", type: "error" });
    }
    setLoading(false);
  };

  const useDemoAccount = () => {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-blue-700 tracking-tight">Sign In</h2>
        {/* DEMO CREDENTIALS BOX */}
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-center shadow">
          <div className="font-semibold mb-1 text-blue-700">Demo Credentials</div>
          <div className="text-sm text-gray-700">
            <span className="font-medium">Email:</span> <span className="select-all">{DEMO_EMAIL}</span>
          </div>
          <div className="text-sm text-gray-700 mb-2">
            <span className="font-medium">Password:</span> <span className="select-all">{DEMO_PASSWORD}</span>
          </div>
          <button
            type="button"
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded shadow hover:from-blue-600 hover:to-indigo-600 transition font-semibold"
            onClick={useDemoAccount}
          >
            Use Demo Account
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              id="email"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-indigo-600 transition disabled:opacity-60"
            disabled={loading}
            type="submit"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-medium hover:underline">
            Sign Up
          </Link>
        </div>
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ show: false, message: "", type: "info" })}
          />
        )}
      </div>
    </div>
  );
};

export default Login;
