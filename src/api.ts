export const getCategory = async () => {
    const response = await fetch("/api/categories");
  
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.statusText}`);
    }
  
    return response.json();
  };
  