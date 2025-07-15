export interface Expense {
  id: keyof Expense;
  description: string;
  amount: number;
  date: string;
  category: string;
}
