import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectCategories,
  selectExpenses,
  setTransactions,
  Transaction,
} from "../../slices/transactionSlice";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalTransaction = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const expenses = useSelector(selectExpenses);

  const [type, setType] = useState<"expense" | "income">("expense");
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState<number | undefined>(undefined);
  const [date, setDate] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: Transaction = {
      type,
      title,
      amount,
      date,
      ...(type === "expense" && { category_id: category }),
    };

    const result = await dispatch(setTransactions(body));

    if (setTransactions.fulfilled.match(result)) {
      toast.success("Transaction added successfully! 🎉");
      if (type === "expense" && category) {
        const selectedCategory = categories.find((cat) => cat.id === category);
        if (selectedCategory) {
          const totalSpent = expenses
            .filter((exp) => exp.category_id === category)
            .reduce((sum, exp) => sum + parseFloat(exp.amount), 0);

          const newTotal = totalSpent + parseFloat(amount);

          if (newTotal > selectedCategory.budget) {
            toast.warn(
              `⚠️ You are spending too much on ${selectedCategory.name}!`
            );
          }
        }
      }
    } else {
      toast.error("Failed to add transaction.");
    }

    setIsOpen(false);

    setTitle("");
    setAmount("");
    setCategory(undefined);
    setDate("");
    setType("expense");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 mt-10"
      >
        Add Transaction
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm text-black"
      >
        <DialogPanel className="max-w-lg w-full rounded-lg bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-bold">
            Add Transaction
          </DialogTitle>
          <Description className="text-gray-500">
            Fill in the details of your transaction below.
          </Description>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transaction Type
              </label>
              <select
                value={type}
                onChange={(e) =>
                  setType(e.target.value as "expense" | "income")
                }
                className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                required
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Transaction Title
              </label>
              <input
                type="text"
                placeholder="Enter transaction title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Amount ($)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                step="0.01"
                onChange={(e) => setAmount(e.target.value)}
                min="0"
                className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                required
              />
            </div>

            {type === "expense" && (
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category || ""}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                  required
                >
                  <option value="" disabled hidden>
                    Select a Category
                  </option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                required
              />
            </div>

            <div className="mt-4 flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Add Transaction
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default ModalTransaction;
