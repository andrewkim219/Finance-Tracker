import { useState, type FormEvent } from "react";
import { useAddTransactionApi } from "../api/transactionApi";
import type { CategoryType } from "../types/CategoryType";
import { TransactionTypeEnum } from "../types/TransactiontypeEnum";

type TransactionModalProps = {
  onClose: () => void;
  accountId?: number; // Optional accountId that can be passed in
  categories: CategoryType[]; // Categories passed from parent component
};

function TransactionModal({ onClose, accountId, categories }: TransactionModalProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [type, setType] = useState<TransactionTypeEnum>(TransactionTypeEnum.EXPENSE);
  const [selectedAccountId, setSelectedAccountId] = useState<number | undefined>(accountId);
  const [categoryId, setCategoryId] = useState<number | undefined>(
    categories.length > 0 ? categories[0].id : undefined
  );

  const { addTransaction, isLoading } = useAddTransactionApi();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!selectedAccountId || !categoryId) {
      console.error("Account or category not selected");
      return;
    }

    try {
      await addTransaction({
        description,
        amount: parseFloat(amount),
        date,
        type,
        account: selectedAccountId,
        category: categoryId,
      });
      onClose(); // Close modal after successful creation
    } catch (error) {
      console.error("Failed to add transaction:", error);
      // Optional: show error message to the user
    }
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Add New Transaction</h2>

      <form onSubmit={handleSubmit}>
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <input
            type="number"
            step="0.01"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Date */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/* Transaction Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Transaction Type
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as TransactionTypeEnum)}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={TransactionTypeEnum.EXPENSE}>Expense</option>
            <option value={TransactionTypeEnum.INCOME}>Income</option>
          </select>
        </div>

        {/* Account ID */}
        {!accountId && (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Account ID
            </label>
            <input
              type="number"
              value={selectedAccountId || ""}
              onChange={(e) => setSelectedAccountId(parseInt(e.target.value))}
              className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter the account ID for this transaction</p>
          </div>
        )}

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
            className="w-full p-2 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            {categories.length > 0 ? (
              categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            ) : (
              <option disabled value="">
                No categories available
              </option>
            )}
          </select>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600"
            disabled={isLoading}
          >
            {isLoading ? "Adding..." : "Add Transaction"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default TransactionModal;
