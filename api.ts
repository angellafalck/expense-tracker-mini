export const getCategory = async () => {
    const category = await fetch("http://localhost:3000/categories", {"mode": "no-cors"});
    return category.json();
};