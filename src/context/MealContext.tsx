"use client";

import React, { createContext, useState, useContext } from "react";
import { Meal } from "../types";
import { mealData } from "../data/meals";

type MealContextType = {
    meals: Meal[];
    selectedMeal: Meal | null;
    setSelectedMeal: (meal: Meal | null) => void;
    calculateTotalCalories: () => number;
    addMeal: (meal: Omit<Meal, "id">) => void;
    updateMeal: (id: string, updatedMeal: Partial<Meal>) => void;
};

const MealContext = createContext<MealContextType | undefined>(undefined);

export const MealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [meals, setMeals] = useState<Meal[]>(mealData);
    const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

    // Calculate total calories
    const calculateTotalCalories = () => {
        return meals.reduce((total, meal) => total + meal.calories, 0);
    };

    // Add new meal
    const addMeal = (meal: Omit<Meal, "id">) => {
        const id = (meals.length + 1).toString();
        const newMeal: Meal = {
            ...meal,
            id,
        };
        setMeals((prev) => [...prev, newMeal]);
    };

    // Update meal
    const updateMeal = (id: string, updatedMeal: Partial<Meal>) => {
        setMeals((prev) =>
            prev.map((meal) => {
                if (meal.id === id) {
                    return {
                        ...meal,
                        ...updatedMeal,
                    };
                }
                return meal;
            })
        );
    };

    return (
        <MealContext.Provider
            value={{
                meals,
                selectedMeal,
                setSelectedMeal,
                calculateTotalCalories,
                addMeal,
                updateMeal,
            }}
        >
            {children}
        </MealContext.Provider>
    );
};

export const useMeals = (): MealContextType => {
    const context = useContext(MealContext);
    if (!context) {
        throw new Error("useMeals must be used within a MealProvider");
    }
    return context;
};