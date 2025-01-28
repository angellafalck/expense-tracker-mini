"use client";

import { useEffect, useState } from "react";
import { getCategory } from "../api";

export default function Home() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategory();
        setCategories(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className=" bg-yellow-50 p-10">
      <h1 className="bg-lime-300 font-bold text-center p-1 rounded text-lg">
        Expense Tracker
      </h1>
      <div className="text-sm font-light flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center py-2">
        Your Balance:
        <span className="font-bold text-xl">$1000</span>
        </div>
        <div className="flex space-x-4 justify-center">
        <span className="rounded bg-green-300 p-2">Income: $1000</span>
        <span className="rounded bg-red-300 p-2">Expense: $1000</span>
        </div>
      </div>
      <div>
        History
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
