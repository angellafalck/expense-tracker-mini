import { Category, Transaction } from "../slices/transactionSlice";

export const getCategories = async () => {
    const response = await fetch("/api/categories");
  
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
  
    return response.json();
  };
  
export const getTransactions = async () => {
    const response = await fetch("/api/transactions");
  
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.statusText}`);
    }
  
    return response.json();
  };


  export const setTransaction = async (body: Transaction) => {
    const response = await fetch("/api/transactions", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to add transaction: ${response.statusText}`);
    }
  
    return response.json();
  };
  


  export const setCategory = async (body: Category) => {
    const response = await fetch("/api/categories", {
      method: "POST", 
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body), 
    });
  
    if (!response.ok) {
      throw new Error(`Failed to add category: ${response.statusText}`);
    }
  
    return response.json();
  };
  