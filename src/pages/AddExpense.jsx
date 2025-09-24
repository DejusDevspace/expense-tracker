import React, { useState } from "react";

const AddExpense = ({ onAddExpense }) => {
  const [form, setForm] = useState({
    amount: "",
    category: "",
    importance: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Food",
    "Transport",
    "Shopping",
    "Entertainment",
    "Emergencies",
    "Bills",
    "Health",
    "Other",
  ];
  const importanceLevels = ["Necessary", "Important", "Optional", "Reckless"];

  const handleSubmit = async () => {
    if (
      !form.amount ||
      !form.category ||
      !form.importance ||
      !form.description
    ) {
      alert("Please fill all fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await onAddExpense({
        amount: parseFloat(form.amount),
        category: form.category,
        importance: form.importance,
        description: form.description,
      });

      setForm({ amount: "", category: "", importance: "", description: "" });
      alert("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
      alert("Error adding expense. Please try again.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className="ml-64 p-8">
      <h2 className="text-3xl font-bold mb-8">Add New Expense</h2>

      <div className="bg-gray-800 p-8 rounded-lg max-w-2xl">
        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              step="0.01"
              value={form.amount}
              onChange={(e) => setForm({ ...form, amount: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="0.00"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Category
            </label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Importance
            </label>
            <select
              value={form.importance}
              onChange={(e) => setForm({ ...form, importance: e.target.value })}
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              disabled={isSubmitting}
            >
              <option value="">Select Importance</option>
              {importanceLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-bold mb-2">
              Description
            </label>
            <input
              type="text"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500"
              placeholder="What did you spend on?"
              disabled={isSubmitting}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin mr-2" size={16} />
                Adding Expense...
              </>
            ) : (
              "Add Expense"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpense;
