export const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);

export const formatNumber = (n: number) =>
  new Intl.NumberFormat("en-NG").format(n);

export const cleanAmount = (val: string) => {
  const stripped = val.replace(/[^0-9.]/g, "");
  const [integer, ...decimals] = stripped.split(".");
  return decimals.length > 0 ? `${integer}.${decimals.join("")}` : integer;
};

export const getCurrencySymbol = () => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  })
    .formatToParts(0)
    .find((part) => part.type === "currency")?.value || "₦";
};

export const formatCompactCurrency = (n: number) => {
  if (n >= 1000000) return `₦${(n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1)}M`;
  if (n >= 1000) return `₦${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}K`;
  return formatCurrency(n);
};