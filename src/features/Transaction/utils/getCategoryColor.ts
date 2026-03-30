import { chartColors } from "@/src/constants/chartColors";

const CATEGORY_COLOR_MAP: Record<string, string> = {
  Food: chartColors[0],
  Transport: chartColors[1],
  "Rent & Bills": chartColors[2],
  Shopping: chartColors[3],
  Entertainment: chartColors[4],
  Health: chartColors[5],
  "Data & Airtime": chartColors[0],
  Others: chartColors[1],
  Income: chartColors[2],
};

export function getCategoryColor(category: string, fallbackIndex: number): string {
  return CATEGORY_COLOR_MAP[category] ?? chartColors[fallbackIndex % chartColors.length];
}