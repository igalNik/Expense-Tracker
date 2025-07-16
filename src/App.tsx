import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import type { Expense } from "./types/Expense";
import { useEffect } from "react";
import { getAllExpenses } from "./store/slices/expenseSlice";

function App() {
  const { expenses } = useSelector((state: RootState) => state.expense);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllExpenses());
  }, [dispatch]);

  console.log("Expenses:", expenses);

  return (
    <div className="text-blue-400">
      {expenses.map((expense: Expense) => (
        <div key={expense.id}>
          {expense.description}: ${expense.amount}
        </div>
      ))}
    </div>
  );
}

export default App;
