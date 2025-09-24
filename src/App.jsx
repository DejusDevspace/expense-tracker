import React, { useState, useEffect } from "react";
import useAuth from "./hooks/useAuth";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import { Loader } from "lucide-react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./routes/AppRoutes";
import SideBar from "./components/SideBar";

const AppContent = () => {
  const { loading, logout, user } = useAuth();

  return (
    <>
      {loading ? (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
          <div className="flex items-center space-x-3 text-white">
            <Loader className="animate-spin" size={24} />
            <span>Loading...</span>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-900 text-white">
          {user && <SideBar />}
          <AppRoutes />
        </div>
      )}
    </>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

// Dashboard component

// Expense component

// History component
