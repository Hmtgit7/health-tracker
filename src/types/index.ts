// Type definitions for our application

export type Habit = {
    id: string;
    name: string;
    icon: string;
    target: number;
    unit: string;
    current: number;
    streak: number;
    history: { date: string; value: number }[];
    color: string;
};

export type Meal = {
    id: string;
    name: string;
    time: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    image: string;
};

export type User = {
    id: string;
    name: string;
    avatar: string;
    weight: number;
    height: number;
    bmi: number;
    targetCalories: number;
    targetWater: number;
    targetSteps: number;
};

export type ModalType = "settings" | "addHabit" | "habitDetail" | "mealDetail" | "profile" | null;

export type NutritionData = {
    name: string;
    value: number;
    color: string;
};