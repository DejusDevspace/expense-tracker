import React, { useState } from "react";

const History = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [expenses, setExpenses] = useState([]);

  const filteredExpenses = expenses.filter((expense) => {
    if (filter === "all") return true;
    return expense.category.toLowerCase() === filter.toLowerCase();
  });

  const sortedExpenses = [...filteredExpenses].sort((a, b) => {
    if (sortBy === "date")
      return new Date(b.date || b.createdAt) - new Date(a.date || a.createdAt);
    if (sortBy === "amount") return b.amount - a.amount;
    return a[sortBy]?.localeCompare(b[sortBy]) || 0;
  });

  const categories = ["all", ...new Set(expenses.map((e) => e.category))];

  return (
    <div className="ml-64 p-8">
      <h2 className="text-3xl font-bold mb-8">Expense History</h2>

      {/* Filters */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <div className="flex flex-wrap gap-4 items-center">
          <div>
            <label className="block text-gray-300 text-sm mb-1">
              Filter by Category
            </label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm mb-1">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1 bg-gray-700 border border-gray-600 rounded text-white focus:outline-none focus:border-blue-500"
            >
              <option value="date">Date</option>
              <option value="amount">Amount</option>
              <option value="category">Category</option>
            </select>
          </div>
        </div>
      </div>

      {/* Expenses List */}
      <div className="bg-gray-800 rounded-lg overflow-hidden">
        {sortedExpenses.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Importance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {sortedExpenses.map((expense) => (
                  <tr key={expense.id} className="hover:bg-gray-700">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {expense.date ||
                        new Date(expense.createdAt).toISOString().split("T")[0]}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span className="px-2 py-1 bg-blue-600 rounded-full text-xs">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          expense.importance === "Necessary"
                            ? "bg-green-600"
                            : expense.importance === "Important"
                            ? "bg-yellow-600"
                            : expense.importance === "Optional"
                            ? "bg-blue-600"
                            : "bg-red-600"
                        }`}
                      >
                        {expense.importance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-red-400">
                      ${expense.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-400">
            {expenses.length === 0 ? (
              <div>
                <p className="mb-4">No expenses yet.</p>
                <p className="text-sm">
                  Start tracking your expenses by adding your first one!
                </p>
              </div>
            ) : (
              "No expenses found for the selected filter."
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
