const Base_URL = "http://localhost:3000";

export const fetchAllExpenses = async () => {
  const res = await fetch(`${Base_URL}/expenses`);
  if (!res.ok) {
    throw new Error("Failed to fetch expenses");
  }
  return res.json();
};

export const addExpense = async (expense: {
  title: string;
  amount: number;
}) => {
  const res = await fetch(`${Base_URL}/expenses`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expense),
  });
  if (!res.ok) {
    throw new Error("Failed to add expense");
  }
  return res.json();
};
export const removeExpense = async (id: string) => {
  const res = await fetch(`${Base_URL}/expenses/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("Failed to remove expense");
  }
  return res.json();
};
