import { useState, useEffect } from "react";
import { Meal } from "../types";
import { mealData } from "../data/meals";

export const useMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const loadMeals = () => {
      // In a real app, this would be an API call
      setMeals(mealData);
      setIsLoading(false);
    };

    // Simulate loading delay
    const timer = setTimeout(() => {
      loadMeals();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Calculate total calories
  const calculateTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0);
  };

  // Calculate total protein
  const calculateTotalProtein = () => {
    return meals.reduce((total, meal) => total + meal.protein, 0);
  };

  // Calculate total carbs
  const calculateTotalCarbs = () => {
    return meals.reduce((total, meal) => total + meal.carbs, 0);
  };

  // Calculate total fat
  const calculateTotalFat = () => {
    return meals.reduce((total, meal) => total + meal.fat, 0);
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

    // If we're updating the selected meal, update it too
    if (selectedMeal && selectedMeal.id === id) {
      setSelectedMeal((prev) => {
        if (!prev) return null;
        return { ...prev, ...updatedMeal };
      });
    }
  };

  // Delete meal
  const deleteMeal = (id: string) => {
    setMeals((prev) => prev.filter((meal) => meal.id !== id));
    if (selectedMeal && selectedMeal.id === id) {
      setSelectedMeal(null);
    }
  };

  return {
    meals,
    selectedMeal,
    setSelectedMeal,
    isLoading,
    calculateTotalCalories,
    calculateTotalProtein,
    calculateTotalCarbs,
    calculateTotalFat,
    addMeal,
    updateMeal,
    deleteMeal,
  };
};
