// src/components/meals/MealPlan.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import Card from "../ui/Card";
import MealCard from "../dashboard/MealCard";
import MealDetail from "./MealDetail";
import { useMeals } from "../../context/MealContext";
import { userData } from "../../data/user";
import { nutritionData } from "../../data/user";

const MealPlan: React.FC = () => {
    const { meals, calculateTotalCalories, setSelectedMeal } = useMeals();
    const [showMealDetail, setShowMealDetail] = useState(false);

    const totalCalories = calculateTotalCalories();
    const remainingCalories = userData.targetCalories - totalCalories;

    const handleMealClick = (mealId: string) => {
        const meal = meals.find((m) => m.id === mealId);
        if (meal) {
            setSelectedMeal(meal);
            setShowMealDetail(true);
        }
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-6 dark:text-white">My Meal Plan</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <Card className="mb-6">
                        <h2 className="text-lg font-semibold mb-4 dark:text-white">Today's Meals</h2>
                        {meals.map((meal) => (
                            <MealCard
                                key={meal.id}
                                meal={meal}
                                onClick={() => handleMealClick(meal.id)}
                            />
                        ))}

                        <div className="flex justify-center mt-4">
                            <button className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 mr-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                    />
                                </svg>
                                Add Meal
                            </button>
                        </div>
                    </Card>
                </div>

                <div>
                    <Card className="mb-6">
                        <h3 className="text-lg font-semibold mb-4 dark:text-white">Calories Analysis</h3>

                        <div className="text-center mb-4">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-600 dark:text-gray-400">Consumed</span>
                                <span className="text-gray-600 dark:text-gray-400">Target</span>
                            </div>

                            <div className="relative h-7 bg-gray-200 rounded-full dark:bg-gray-700 mb-1">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min((totalCalories / userData.targetCalories) * 100, 100)}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-green-500 rounded-full"
                                />
                                <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-white">
                                    {totalCalories} / {userData.targetCalories} kcal
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                {remainingCalories > 0
                                    ? `${remainingCalories} kcal remaining`
                                    : "Daily target reached"}
                            </p>
                        </div>

                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={nutritionData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, value }) => `${name}: ${value}%`}
                                        labelLine={false}
                                    >
                                        {nutritionData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>

                    <Card>
                        <h3 className="text-lg font-semibold mb-4 dark:text-white">Nutrition Tips</h3>
                        <div className="space-y-3">
                            <div className="flex items-start">
                                <span className="text-xl mr-2">💧</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Drink at least 8 glasses of water daily for optimal hydration.
                                </p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-xl mr-2">🥗</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Include at least 5 servings of fruits and vegetables daily.
                                </p>
                            </div>
                            <div className="flex items-start">
                                <span className="text-xl mr-2">⏰</span>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                    Try to eat your meals at consistent times each day.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            <MealDetail isOpen={showMealDetail} onClose={() => setShowMealDetail(false)} />
        </div>
    );
};

export default MealPlan;