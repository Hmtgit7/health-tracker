// src/data/meals.ts
import { Meal } from "../types";

export const mealData: Meal[] = [
    {
        id: "1",
        name: "Breakfast",
        time: "07:00 am",
        calories: 380,
        protein: 22,
        carbs: 45,
        fat: 12,
        image: "https://images.unsplash.com/photo-1533089860892-a9b9ac6cd6e4?q=80&w=100&auto=format",
    },
    {
        id: "2",
        name: "Lunch",
        time: "12:30 pm",
        calories: 520,
        protein: 35,
        carbs: 60,
        fat: 18,
        image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=100&auto=format",
    },
    {
        id: "3",
        name: "Dinner",
        time: "07:00 pm",
        calories: 420,
        protein: 30,
        carbs: 40,
        fat: 15,
        image: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?q=80&w=100&auto=format",
    },
];

