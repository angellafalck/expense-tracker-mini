import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { getCategories, getTransactions, setCategory, setTransaction } from "@/api";

export interface Transaction {

  type: "income" | "expense";
  category_id?: number;
  title: string;
  amount: string;
  date: string;
}

export interface Category {
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
  const response = await getCategories();
  return response;
});

export const fetchTransactions = createAsyncThunk("transactions/fetchTransactions", async () => {
  const response = await getTransactions();
    return response;
});

export const setTransactions = createAsyncThunk(
  "transactions/setTransactions",
  async (body: Transaction) => {
    const response = await setTransaction(body);
      return response;
  }
);

export const setCategories = createAsyncThunk(
  "transactions/setCategories",
  async (body: Category) => {
    const response = await setCategory(body);
    return response;
  }
);


const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
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
    })
    .addCase(setTransactions.fulfilled, (state, action:PayloadAction<Transaction>) => {
      const transaction = action.payload;
      if (action.payload.type === "income") {
        state.incomes.push(action.payload);
        state.balance += parseFloat(action.payload.amount);
      } else {
        state.expenses.push(action.payload);
        state.balance -= parseFloat(action.payload.amount);
      }
      state.history.push(transaction);
    })
    .addCase(setCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const { updateBalance } = transactionsSlice.actions;

export const selectCategories = (state: RootState) => state.transactions.categories;
export const selectHistory = (state: RootState) => state.transactions.history;
export const selectExpenses = (state: RootState) => state.transactions.expenses;
export const selectIncomes = (state: RootState) => state.transactions.incomes;
export const selectBalance = (state: RootState) => state.transactions.balance;

export default transactionsSlice.reducer;
