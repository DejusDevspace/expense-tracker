import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Loader } from "lucide-react";

const Login = () => {
  const { login, register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginForm.email, loginForm.password);
      setLoginForm({ email: "", password: "" });
      setLoading(false);
    } catch (err) {
      console.error("Login Failed:", err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Expense Tracker
        </h2>

        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-gray-300 text-sm font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
                placeholder="Enter your password"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-2 px-4 rounded transition duration-200 flex items-center justify-center"
            >
              {loading ? (
                <>
                  <Loader className="animate-spin mr-2" size={16} />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
