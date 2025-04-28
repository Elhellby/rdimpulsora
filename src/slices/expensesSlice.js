import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchExpenses, deleteExpense, updateExpense } from '../services/api';

// Async Thunks
export const fetchExpensesAsync = createAsyncThunk(
  'expenses/fetchExpenses',
  async () => {
    const response = await fetchExpenses();
    return response;
  }
);

export const deleteExpenseAsync = createAsyncThunk(
  'expenses/deleteExpense',
  async (id) => {
    await deleteExpense(id);
    return id;
  }
);

export const updateExpenseAsync = createAsyncThunk(
  'expenses/updateExpense',
  async ({ id, updatedExpense }) => {
    const response = await updateExpense(id, updatedExpense);
    return { id, updatedExpense: response };
  }
);

// Slice
const expensesSlice = createSlice({
  name: 'expenses',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    addExpense: (state, action) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpensesAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchExpensesAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchExpensesAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(deleteExpenseAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((expense) => expense.id !== action.payload);
      })
      .addCase(updateExpenseAsync.fulfilled, (state, action) => {
        const { id, updatedExpense } = action.payload;
        const index = state.items.findIndex((expense) => expense.id === id);
        if (index !== -1) {
          state.items[index] = { ...state.items[index], ...updatedExpense };
        }
      });
  },
});

export const { addExpense } = expensesSlice.actions;
export default expensesSlice.reducer;