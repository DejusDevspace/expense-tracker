import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Home, Plus, Eye, LogOut } from "lucide-react";

const SideBar = () => {
  const { logout } = useAuth();
  const [currentTab, setCurrentTab] = useState("dashboard");

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 shadow-lg">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Expense Tracker</h1>
        <p className="text-gray-400 text-sm mb-8">Welcome, 'user.email'</p>
        <nav className="space-y-4">
          <button
            onClick={() => setCurrentTab("dashboard")}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              currentTab === "dashboard" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </button>
          <button
            onClick={() => setCurrentTab("add-expense")}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              currentTab === "add-expense" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Plus size={20} />
            <span>Add Expense</span>
          </button>
          <button
            onClick={() => setCurrentTab("history")}
            className={`w-full flex items-center space-x-3 px-4 py-2 rounded-lg transition ${
              currentTab === "history" ? "bg-blue-600" : "hover:bg-gray-700"
            }`}
          >
            <Eye size={20} />
            <span>Expense History</span>
          </button>
        </nav>
      </div>
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;
