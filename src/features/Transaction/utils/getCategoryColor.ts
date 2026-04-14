import { chartColors } from "@/src/constants/chartColors";

const CATEGORY_COLOR_MAP: Record<string, string> = {
  // Indigo
  Food: chartColors[0],          
  // Blue
  Transport: chartColors[1],     
  // Amber
  "Rent & Bills": chartColors[2], 
  // Orange
  Shopping: chartColors[3],      
  // Pink
  Entertainment: chartColors[4],  
  // Teal
  Health: chartColors[5],         
  // Purple
  "Data & Airtime": chartColors[6], 
  // Green
  Others: chartColors[7],         
  // Coral
  Income: chartColors[8],         
};

export function getCategoryColor(category: string, fallbackIndex: number): string {
  return CATEGORY_COLOR_MAP[category] ?? chartColors[fallbackIndex % chartColors.length];
}