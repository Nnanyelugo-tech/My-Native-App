import { chartColors } from "@/src/constants/chartColors";

const categoryColorMap: Record<string, string> = {};

export function getCategoryColor(category: string, index: number): string {
  if (!categoryColorMap[category]) {
    categoryColorMap[category] = chartColors[index % chartColors.length];
  }
  return categoryColorMap[category];
}