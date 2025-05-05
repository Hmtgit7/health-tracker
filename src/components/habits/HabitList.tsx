// src/components/habits/HabitList.tsx
"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import HabitCard from "../dashboard/HabitCard";
import Button from "../ui/Button";
import { useHabits } from "../../context/HabitContext";

type HabitListProps = {
    onOpenAddHabit: () => void;
    onSelectHabit: (habitId: string) => void;
};

const HabitList: React.FC<HabitListProps> = ({ onOpenAddHabit, onSelectHabit }) => {
    const { habits, setSelectedHabit } = useHabits();

    const handleHabitClick = (habitId: string) => {
        const habit = habits.find((h) => h.id === habitId);
        if (habit) {
            setSelectedHabit(habit);
            onSelectHabit(habitId);
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold dark:text-white">Your Habits</h2>
                <Button
                    onClick={onOpenAddHabit}
                    variant="primary"
                    size="sm"
                    icon={
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
                    }
                >
                    Add Habit
                </Button>
            </div>

            <div className="space-y-2">
                <AnimatePresence>
                    {habits.map((habit) => (
                        <motion.div
                            key={habit.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.2 }}
                        >
                            <HabitCard
                                habit={habit}
                                onClick={() => handleHabitClick(habit.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                {habits.length === 0 && (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                            You don't have any habits yet.
                        </p>
                        <Button onClick={onOpenAddHabit}>Add Your First Habit</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HabitList;