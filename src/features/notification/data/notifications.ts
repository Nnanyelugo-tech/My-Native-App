import type { Notification } from "../types";

export const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "income",
    title: "Salary Received",
    subtitle: "Your salary has been credited",
    time: "2m ago",
    read: false,
  },
  {
    id: "2",
    type: "expense",
    title: "Expense Alert",
    subtitle: "₦15,000 spent",
    time: "1h ago",
    read: false,
  },
  {
    id: "3",
    type: "warning",
    title: "Budget Warning",
    subtitle: "You have used 90% of your monthly fun budget",
    time: "3h ago",
    read: true,
  },
  {
    id: "4",
    type: "security",
    title: "New Sign-in Detected",
    subtitle: "A new device signed in to your account",
    time: "Yesterday",
    read: true,
  },
];
