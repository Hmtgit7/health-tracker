// src/components/dashboard/HabitCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { Habit } from "../../types";
import ProgressBar from "../ui/ProgressBar";

type HabitCardProps = {
    habit: Habit;
    onClick: () => void;
};

const HabitCard: React.FC<HabitCardProps> = ({ habit, onClick }) => {
    const progress = Math.min((habit.current / habit.target) * 100, 100);
    const isComplete = habit.current >= habit.target;

    return (
        <Card className="mb-2" onClick={onClick} interactive>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                    <span className="text-2xl mr-3">{habit.icon}</span>
                    <div>
                        <h3 className="font-medium dark:text-white">{habit.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {habit.current} / {habit.target} {habit.unit}
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    {isComplete && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded dark:bg-green-900 dark:text-green-300"
                        >
                            ✓ Done
                        </motion.div>
                    )}
                    {habit.streak > 0 && (
                        <div className="ml-2 flex items-center justify-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">
                            🔥 {habit.streak}
                        </div>
                    )}
                </div>
            </div>

            <ProgressBar
                progress={progress}
                color={habit.color}
                height={6}
            />
        </Card>
    );
};

export default HabitCard;