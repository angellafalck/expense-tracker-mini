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