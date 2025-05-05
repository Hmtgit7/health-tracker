// src/data/user.ts
import { User } from "../types";

export const userData: User = {
    id: "1",
    name: "Jenny Wilson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    weight: 62,
    height: 168,
    bmi: 22.1,
    targetCalories: 2100,
    targetWater: 2300,
    targetSteps: 10000,
};

export const nutritionData = [
    { name: "Protein", value: 73.1, color: "#3b82f6" },
    { name: "Carbs", value: 43.5, color: "#f59e0b" },
    { name: "Fat", value: 27.5, color: "#ef4444" },
    { name: "Fiber", value: 52.5, color: "#10b981" },
];