export const isSameDay = (d1: Date, d2: Date) => {
  return (
    d1.getDate() === d2.getDate() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getFullYear() === d2.getFullYear()
  );
};

// Week starts Monday
export const getStartOfWeek = (date: Date) => {
  const d = new Date(date);
  const day = d.getDay();

  // convert Sunday (0) > 6, Monday (1) > 0
  const diff = (day === 0 ? -6 : 1) - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);

  return d;
};

//consistent week comparison
export const isSameWeek = (date: Date, now: Date) => {
  const startOfWeek = getStartOfWeek(now);
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 7);

  return date >= startOfWeek && date < endOfWeek;
};

export const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatDateGroup = (date: string) => {
  const d = new Date(date);
  const now = new Date();

  if (isSameDay(d, now)) return "Today";

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  if (isSameDay(d, yesterday)) return "Yesterday";

  return d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
};