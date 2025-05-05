// src/components/dashboard/Dashboard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import WelcomeCard from "./WelcomeCard";
import DailyProgress from "./DailyProgress";
import HabitCard from "./HabitCard";
import MealCard from "./MealCard";
import WeeklyChart from "./WeeklyChart";
import HabitDetail from "../habits/HabitDetail";
import MealDetail from "../meals/MealDetail";
import AddHabitModal from "../modals/AddHabitModal";
import { useHabits } from "../../context/HabitContext";
import { useMeals } from "../../context/MealContext";
import { userData, nutritionData } from "../../data/user";

type DashboardProps = {
    onTabChange?: (tab: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({ onTabChange }) => {
    const { habits, setSelectedHabit } = useHabits();
    const { meals, setSelectedMeal, calculateTotalCalories } = useMeals();
    const [showHabitDetail, setShowHabitDetail] = useState(false);
    const [showMealDetail, setShowMealDetail] = useState(false);
    const [showAddHabit, setShowAddHabit] = useState(false);

    const handleHabitClick = (habitId: string) => {
        const habit = habits.find((h) => h.id === habitId);
        if (habit) {
            setSelectedHabit(habit);
            setShowHabitDetail(true);
        }
    };

    const handleMealClick = (mealId: string) => {
        const meal = meals.find((m) => m.id === mealId);
        if (meal) {
            setSelectedMeal(meal);
            setShowMealDetail(true);
        }
    };

    const totalCalories = calculateTotalCalories();
    const totalWaterIntake = habits.find((h) => h.name === "Water")?.current || 0;
    const targetWater = userData.targetWater;
    const totalSteps = habits.find((h) => h.name === "Steps")?.current || 0;
    const targetSteps = userData.targetSteps;

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <WelcomeCard />

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-2xl mr-2">🔥</span>
                                <h3 className="font-medium dark:text-white">Calories</h3>
                            </div>
                            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {totalCalories} <span className="text-sm font-normal">/ {userData.targetCalories} kcal</span>
                            </p>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                                <div
                                    className="h-2 rounded-full bg-red-500"
                                    style={{ width: `${Math.min((totalCalories / userData.targetCalories) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-2xl mr-2">💧</span>
                                <h3 className="font-medium dark:text-white">Water</h3>
                            </div>
                            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {totalWaterIntake} <span className="text-sm font-normal">/ {targetWater} ml</span>
                            </p>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                                <div
                                    className="h-2 rounded-full bg-blue-500"
                                    style={{ width: `${Math.min((totalWaterIntake / targetWater) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
                        >
                            <div className="flex items-center mb-2">
                                <span className="text-2xl mr-2">👣</span>
                                <h3 className="font-medium dark:text-white">Steps</h3>
                            </div>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                {totalSteps} <span className="text-sm font-normal">/ {targetSteps}</span>
                            </p>
                            <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mt-2">
                                <div
                                    className="h-2 rounded-full bg-emerald-500"
                                    style={{ width: `${Math.min((totalSteps / targetSteps) * 100, 100)}%` }}
                                ></div>
                            </div>
                        </motion.div>
                    </div>

                    <DailyProgress />
                    <WeeklyChart />
                </div>

                <div>
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4 mb-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold dark:text-white">Today's Habits</h3>
                            <button
                                onClick={() => setShowAddHabit(true)}
                                className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
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
                            </button>
                        </div>

                        <div className="space-y-2">
                            {habits.slice(0, 3).map((habit) => (
                                <HabitCard
                                    key={habit.id}
                                    habit={habit}
                                    onClick={() => handleHabitClick(habit.id)}
                                />
                            ))}

                            {habits.length > 3 && (
                                <button
                                    onClick={() => onTabChange && onTabChange("habits")}
                                    className="w-full text-center text-sm text-gray-600 hover:text-gray-900 py-2 dark:text-gray-400 dark:hover:text-white"
                                >
                                    View All Habits
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
                        <h3 className="text-lg font-semibold mb-4 dark:text-white">Today's Meals</h3>

                        {meals.map((meal) => (
                            <MealCard
                                key={meal.id}
                                meal={meal}
                                onClick={() => handleMealClick(meal.id)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <HabitDetail
                isOpen={showHabitDetail}
                onClose={() => setShowHabitDetail(false)}
            />

            <MealDetail
                isOpen={showMealDetail}
                onClose={() => setShowMealDetail(false)}
            />

            <AddHabitModal
                isOpen={showAddHabit}
                onClose={() => setShowAddHabit(false)}
            />
        </div>
    );
};

export default Dashboard;