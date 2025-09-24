import React, { useState } from "react";
import useAuth from "../hooks/useAuth";
import { Calendar, DollarSign, TrendingUp } from "lucide-react";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const recentExpenses = expenses.slice(0, 5);
  const COLORS = ["#3B82F6", "#EF4444", "#10B981", "#F59E0B", "#8B5CF6"];

  const categoryData = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const categoryChartData = Object.entries(categoryData).map(
    ([category, amount]) => ({
      category,
      amount,
    })
  );

  const importanceData = expenses.reduce((acc, expense) => {
    acc[expense.importance] = (acc[expense.importance] || 0) + expense.amount;
    return acc;
  }, {});

  const importanceChartData = Object.entries(importanceData).map(
    ([importance, amount]) => ({
      importance,
      amount,
    })
  );

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );
  const avgDaily =
    expenses.length > 0 ? (totalExpenses / expenses.length).toFixed(2) : 0;

  return (
    <div className="ml-64 p-8">
      <h2 className="text-3xl font-bold mb-8">Dashboard</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Expenses</p>
              <p className="text-2xl font-bold">${totalExpenses.toFixed(2)}</p>
            </div>
            <DollarSign className="text-blue-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Average per Transaction</p>
              <p className="text-2xl font-bold">${avgDaily}</p>
            </div>
            <TrendingUp className="text-green-500" size={32} />
          </div>
        </div>
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Transactions</p>
              <p className="text-2xl font-bold">{expenses.length}</p>
            </div>
            <Calendar className="text-purple-500" size={32} />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Expenses by Category</h3>
          {categoryChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="category" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#374151",
                    border: "1px solid #4B5563",
                    color: "#F3F4F6",
                  }}
                />
                <Bar dataKey="amount" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-140 flex items-center justify-center text-gray-400">
              No data available. Add some expenses to see the chart.
            </div>
          )}
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Expenses by Importance</h3>
          {importanceChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie
                  data={importanceChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="amount"
                  label={({ importance, amount }) =>
                    `${importance}: $${amount.toFixed(2)}`
                  }
                >
                  {importanceChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#374151",
                    border: "1px solid #4B5563",
                    color: "#F3F4F6",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-140 flex items-center justify-center text-gray-400">
              No data available. Add some expenses to see the chart.
            </div>
          )}
        </div>
      </div>

      {/* Recent Expenses */}
      <div className="bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Recent Expenses</h3>
          <button
            onClick={() => setCurrentTab("history")}
            className="text-blue-400 hover:text-blue-300 text-sm"
          >
            View All →
          </button>
        </div>
        <div className="space-y-3">
          {recentExpenses.length > 0 ? (
            recentExpenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between p-3 bg-gray-700 rounded-lg"
              >
                <div>
                  <p className="font-medium">{expense.description}</p>
                  <p className="text-sm text-gray-400">
                    {expense.category} • {expense.importance}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-400">
                    -${expense.amount.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-400">{expense.date}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-8">
              <p>No expenses yet.</p>
              <button
                onClick={() => setCurrentTab("add-expense")}
                className="text-blue-400 hover:text-blue-300 mt-2"
              >
                Add your first expense →
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
