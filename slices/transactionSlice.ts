import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Transaction {
  id: number;
  type: "income" | "expense";
  category: string;
  amount: string;
  date: string;
}

interface Category {
    id: number;
    name: string;
    budget: number;
 }  

interface TransactionsState {
  categories: Category[];
  expenses: Transaction[];
  incomes: Transaction[];
  history: Transaction[];
  balance: number;
}

const initialState: TransactionsState = {
  categories: [],
  expenses: [],
  incomes: [],
  history: [],
  balance: 0,
};

export const fetchCategories = createAsyncThunk("transactions/fetchCategories", async () => {
  const response = await fetch("/api/categories");
  return response.json();
});

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async () => {
  const response = await fetch("/api/transactions");
  return response.json();
});


const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      if (action.payload.type === "income") {
        state.incomes.push(action.payload);
        state.balance += parseFloat(action.payload.amount);
      } else {
        state.expenses.push(action.payload);
        state.balance -= parseFloat(action.payload.amount);
      }
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    updateBalance: (state) => {
      state.balance =
        state.incomes.reduce((sum, t) => sum + parseFloat(t.amount), 0) -
        state.expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTransactions.fulfilled, (state, action) => {
      state.expenses = action.payload.filter((t: Transaction) => t.type === "expense");
      state.incomes = action.payload.filter((t: Transaction) => t.type === "income");
      state.history = action.payload;

      state.balance =
        state.incomes.reduce((sum, t) => sum + parseFloat(t.amount), 0) -
        state.expenses.reduce((sum, t) => sum + parseFloat(t.amount), 0);
    })
    .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
    });
  },
});

export const { addTransaction, setCategories, updateBalance } = transactionsSlice.actions;

export const selectCategories = (state: RootState) => state.transactions.categories;
export const selectHistory = (state: RootState) => state.transactions.history;
export const selectExpenses = (state: RootState) => state.transactions.expenses;
export const selectIncomes = (state: RootState) => state.transactions.incomes;
export const selectBalance = (state: RootState) => state.transactions.balance;

export default transactionsSlice.reducer;
