"use client";

import { useEffect, useState } from "react";
import { getCategories } from "../api";
import { getTransactions } from "../api";
import {
  fetchCategories,
  fetchTransactions,
  selectCategories,
  selectExpenses,
  selectIncomes,
  selectBalance,
} from "../../slices/transactionSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const categories = useSelector(selectCategories);
  const expenses = useSelector(selectExpenses);
  const incomes = useSelector(selectIncomes);
  const balance = useSelector(selectBalance);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  return (
    <div className=" bg-yellow-50 p-10">
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
        <span></span>
      </div>
      <h1>Hola</h1>
      <ul>
        {categories.map((category: any) => (
          <li key={category.id}>
            {category.name} - ${category.budget}
          </li>
        ))}
      </ul>
    </div>
  );
}
