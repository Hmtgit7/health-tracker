// src/components/dashboard/DailyProgress.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import ProgressBar from "../ui/ProgressBar";
import { useHabits } from "../../context/HabitContext";

const DailyProgress: React.FC = () => {
    const { calculateDailyProgress } = useHabits();
    const progress = calculateDailyProgress();

    // Determine color based on progress
    const getProgressColor = () => {
        if (progress >= 75) return "#10b981"; // Green
        if (progress >= 50) return "#f59e0b"; // Yellow
        return "#ef4444"; // Red
    };

    return (
        <Card className="mb-4">
            <h3 className="text-lg font-semibold mb-3 dark:text-white">Daily Progress</h3>

            <div className="flex items-center mb-4">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", damping: 10, stiffness: 100 }}
                    className="relative w-16 h-16 mr-4"
                >
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke="#e5e7eb"
                            strokeWidth="10"
                            className="dark:stroke-gray-700"
                        />
                        <motion.circle
                            cx="50"
                            cy="50"
                            r="45"
                            fill="none"
                            stroke={getProgressColor()}
                            strokeWidth="10"
                            strokeLinecap="round"
                            strokeDasharray={`${progress * 2.83} 283`}
                            strokeDashoffset="0"
                            initial={{ strokeDasharray: "0 283" }}
                            animate={{ strokeDasharray: `${progress * 2.83} 283` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            transform="rotate(-90 50 50)"
                        />
                        <text
                            x="50"
                            y="55"
                            fontSize="20"
                            fontWeight="bold"
                            textAnchor="middle"
                            fill={getProgressColor()}
                            className="dark:fill-white"
                        >
                            {Math.round(progress)}%
                        </text>
                    </svg>
                </motion.div>

                <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today's Habits</p>
                    <p className="text-xl font-bold dark:text-white">
                        {Math.round(progress)}% Completed
                    </p>
                </div>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {progress < 50
                    ? "Keep going! You're making progress."
                    : progress < 75
                        ? "Halfway there! Keep up the good work."
                        : progress < 100
                            ? "Almost done! Just a few more to go."
                            : "Great job! All habits completed for today."}
            </p>
        </Card>
    );
};

export default DailyProgress;