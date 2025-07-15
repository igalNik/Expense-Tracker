import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { Expense } from "../../types/Expense";
import * as api from "../../api/expenseApi";

export type ExpenseAction =
  | { type: "addExpense"; payload: Expense }
  | { type: "removeExpense"; payload: string }
  | { type: "setLoading"; payload: boolean }
  | { type: "setError"; payload: string | null };

export interface ExpenseState {
  expenses: Expense[];
  loading: boolean;
  error: string | null;
}
export const initialExpenseState: ExpenseState = {
  expenses: [],
  loading: false,
  error: null,
};

export const expenseSlice = createSlice({
  name: "expense",
  initialState: initialExpenseState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // get all expenses
      .addCase(getAllExpenses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getAllExpenses.fulfilled,
        (state, action: PayloadAction<Expense[]>) => {
          state.expenses = action.payload;
          state.loading = false;
        }
      )
      .addCase(getAllExpenses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // add expense
      .addCase(addExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        addExpense.fulfilled,
        (state, action: PayloadAction<Expense>) => {
          state.expenses.push(action.payload);
          state.loading = false;
        }
      )
      .addCase(addExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // remove expense
      .addCase(removeExpense.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        removeExpense.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.expenses = state.expenses.filter(
            (expense) => expense.id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(removeExpense.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const getAllExpenses = createAsyncThunk<
  Expense[],
  void,
  { rejectValue: string }
>("expense/getAllExpenses", async (_, { rejectWithValue }) => {
  try {
    return await api.fetchAllExpenses();
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const addExpense = createAsyncThunk<
  Expense,
  Expense,
  { rejectValue: string }
>("expense/addExpense", async (expense, { rejectWithValue }) => {
  try {
    return await api.addExpense(expense);
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

export const removeExpense = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("expense/removeExpense", async (id, { rejectWithValue }) => {
  try {
    await api.removeExpense(id);
    return id;
  } catch (err) {
    const error = err as Error;
    return rejectWithValue(error.message);
  }
});

// prettier-ignore
export const { setLoading, setError } = expenseSlice.actions;

export default expenseSlice.reducer;
