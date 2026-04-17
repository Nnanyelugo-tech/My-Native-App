import { fetchTransactions } from "../../Transaction/services/transactionService";
import { DashboardData } from "../types/dashboard.types";
import { getIncomeVsExpense } from "../../Transaction/utils/getIncomeVsExpense";
import { getCategoryColor } from "../../Transaction/utils/getCategoryColor";
import { isSameDay, getStartOfWeek } from "@/src/utils/date";

// This is the brain of the dashboard
export const fetchDashboardData = async (userId: string): Promise<DashboardData> => {
  const transactions = await fetchTransactions(userId);

  const now = new Date();
  const startOfWeek = getStartOfWeek(now);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  
  const { income, expense } = getIncomeVsExpense(transactions);
  
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  const currentMonthTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate.getMonth() === now.getMonth() && tDate.getFullYear() === now.getFullYear();
  });

  const categories: Record<string, number> = {};
  let monthlyExpenses = 0;

  currentMonthTransactions.forEach(t => {
    if (t.type !== "expense") return;
    monthlyExpenses += t.amount;
    categories[t.category] = (categories[t.category] ?? 0) + t.amount;
  });

  const expenseBreakdown = Object.entries(categories)
    .map(([label, value]) => ({ label, value }))
    .sort((a, b) => b.value - a.value)
    .map((item, index) => ({
      label: item.label,
      value: item.value,
      color: getCategoryColor(item.label, index),
      percentage: monthlyExpenses > 0 
        ? (item.value / monthlyExpenses) * 100
        : 0,
    }));
  const todayTransactions = transactions.filter(t => isSameDay(new Date(t.date), now));
  const weekTransactions = transactions.filter(t => {
    const tDate = new Date(t.date);
    return tDate >= startOfWeek && tDate < endOfWeek;
  });

  const todayStats = getIncomeVsExpense(todayTransactions);
  const weekStats = getIncomeVsExpense(weekTransactions);
  const monthStats = getIncomeVsExpense(currentMonthTransactions);

  return {
    summary: {
      totalIncome: income,
      totalExpenses: expense,
      totalBalance: income - expense,
    },
    recentTransactions,
    expenseBreakdown,
    trends: {
      today: { income: todayStats.income, expense: todayStats.expense },
      week: { income: weekStats.income, expense: weekStats.expense },
      month: { income: monthStats.income, expense: monthStats.expense },
    }
  };
};
