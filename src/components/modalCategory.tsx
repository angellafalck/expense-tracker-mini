import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Category, setCategories } from "../../slices/transactionSlice";
import { AppDispatch } from "../../store";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalCategory = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [budget, setBudget] = useState(0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body: Category = {
      name,
      budget,
    };

    const result = await dispatch(setCategories(body));

    if (setCategories.fulfilled.match(result)) {
      toast.success("Transaction added successfully! 🎉");
    } else {
      toast.error("Failed to add transaction.");
    }

    setIsOpen(false);

    setName("");
    setBudget(0);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-black rounded hover:bg-blue-600 mt-10"
      >
        Add Category
      </button>

      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm text-black"
      >
        <DialogPanel className="max-w-lg w-full rounded-lg bg-white p-6 shadow-lg">
          <DialogTitle className="text-lg font-bold">Add Category</DialogTitle>
          <Description className="text-gray-500">
            Fill in the details of your new category below.
          </Description>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Category Name
              </label>
              <input
                type="text"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-1 p-2 border rounded focus:outline-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget ($)
              </label>
              <input
                type="number"
                placeholder="Enter amount"
                value={budget}
                step="0.01"
                onChange={(e) => setBudget(parseInt(e.target.value))}
                min="0"
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
                Add Category
              </button>
            </div>
          </form>
        </DialogPanel>
      </Dialog>
    </>
  );
};

export default ModalCategory;
