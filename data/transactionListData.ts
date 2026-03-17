export type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
  icon: any;
  iconBg: string;
  iconColor: string;
};

export const TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    title: "Bolt Ride",
    category: "Transport",
    date: "Today, 08:30 AM",
    amount: 3500,
    type: "expense",
    icon: "car.fill",
    iconBg: "#E8F5E9",
    iconColor: "#00E676",
  },
  {
    id: "2",
    title: "Lunch",
    category: "Food",
    date: "Today, 01:20 PM",
    amount: 2000,
    type: "expense",
    icon: "cup.and.saucer.fill",
    iconBg: "#FFF3E0",
    iconColor: "#FF9800",
  },
  {
    id: "3",
    title: "Salary Payment",
    category: "Income",
    date: "Yesterday, 09:00 AM",
    amount: 250000,
    type: "income",
    icon: "briefcase.fill",
    iconBg: "#EDE7F6",
    iconColor: "#1A237E",
  },
  {
    id: "4",
    title: "Data Purchase",
    category: "Data & Airtime",
    date: "Yesterday, 10:15 AM",
    amount: 1500,
    type: "expense",
    icon: "wifi",
    iconBg: "#E3F2FD",
    iconColor: "#42A5F5",
  },
];