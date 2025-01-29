"use client";

import { useEffect } from "react";
import {
  fetchCategories,
  fetchTransactions,
  selectCategories,
  selectExpenses,
  selectIncomes,
  selectBalance,
  selectHistory,
  Transaction,
} from "../../slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";
import ModalTransaction from "../components/modalTransaction";
import { getCategories, getTransactions } from "@/api";
import ModalCategory from "@/components/modalCategory";

interface Category {
  id?: number;
  name: string;
  budget: number;
}

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);
  const balance = useSelector(selectBalance);
  const history = useSelector(selectHistory);

  useEffect(() => {
    async function fetchMyAPI() {
      let response = await getCategories();
      console.log(response);
    }
    fetchMyAPI();

    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  console.log("categories", categories);

  return (
    <div className="bg-yellow-50 p-10 min-h-screen text-black">
      <div className="max-w-full sm:max-w-[30rem] lg:max-w-[50rem] mx-auto">
        <h1 className="bg-lime-300 font-bold text-center p-1 rounded text-lg lg:text-2xl">
          Expense Tracker
        </h1>
        <div className="text-sm font-light flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center py-4 lg:text-2xl">
            Balance:
            <span className="font-bold text-xl lg:text-4xl">
              ${balance.toFixed(2)}
            </span>
          </div>
          <div className="flex space-x-4 justify-center">
            {incomes && (
              <span className="rounded bg-green-300 p-2 lg:text-xl">
                Incomes:
                {incomes.map((income: any) => (
                  <li key={income.id}>${income.amount}</li>
                ))}
              </span>
            )}
            {expenses && (
              <span className="rounded bg-red-300 p-2 lg:text-xl">
                Expenses:
                {expenses.map((expense: any) => (
                  <li key={expense.id}>${expense.amount}</li>
                ))}
              </span>
            )}
          </div>
        </div>
        <div>
          <ModalTransaction />
        </div>
        <div>
          <ModalCategory />
        </div>
        <div>
          <h1 className="bg-amber-300 font-bold text-center p-1 rounded text-lg mt-2 lg:text-2xl">
            History
          </h1>
          <div className="flex flex-col space-y-2 mt-2">
            {history
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((transaction: Transaction, index: number) => (
                <div
                  className="flex flex-col md:flex-row border border-amber-400 rounded text-center items-center p-2 lg:text-xl"
                  key={index}
                >
                  <span className="w-full">{formatDate(transaction.date)}</span>
                  <span className="w-full">{transaction.title}</span>
                  {categories && (
                    <span className="w-full">
                      {!transaction.category_id
                        ? "Income"
                        : categories.find(
                            (category: Category) =>
                              category.id === transaction.category_id
                          )?.name}
                    </span>
                  )}
                  <span
                    className={`w-full ${
                      transaction.type === "expense"
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {transaction.type === "expense"
                      ? `-$${transaction.amount}`
                      : `+$${transaction.amount}`}
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
