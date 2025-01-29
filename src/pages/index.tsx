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
} from "../../slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

interface Category {
  id: number;
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

  return (
    <div className=" bg-yellow-50 p-10">
      <div className="container m-auto">
        <h1 className="bg-lime-300 font-bold text-center p-1 rounded text-lg">
          Expense Tracker
        </h1>
        <div className="text-sm font-light flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center py-4">
            Balance:
            <span className="font-bold text-xl">${balance.toFixed(2)}</span>
          </div>
          <div className="flex space-x-4 justify-center">
            {incomes && (
              <span className="rounded bg-green-300 p-2">
                Incomes:
                {incomes.map((income: any) => (
                  <li key={income.id}>${income.amount}</li>
                ))}
              </span>
            )}
            {expenses && (
              <span className="rounded bg-red-300 p-2">
                Expenses:
                {expenses.map((expense: any) => (
                  <li key={expense.id}>${expense.amount}</li>
                ))}
              </span>
            )}
          </div>
        </div>
        <div>
          <h1 className="bg-amber-300 font-bold text-center p-1 rounded text-lg mt-10">
            History
          </h1>
          <div className="flex flex-col">
            {history
              .slice()
              .sort(
                (a, b) =>
                  new Date(b.date).getTime() - new Date(a.date).getTime()
              )
              .map((transaction: any, index: number) => (
                <div className="flex flex-col md:flex-row" key={index}>
                  <span className="w-full">{transaction.title}</span>
                  <span className="w-full">${transaction.amount}</span>
                  <span className="w-full">
                    {!transaction.category_id
                      ? "Income"
                      : categories.find(
                          (category: Category) =>
                            category.id === transaction.category_id
                        )?.name}
                  </span>

                  <span className="w-full">{formatDate(transaction.date)}</span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
