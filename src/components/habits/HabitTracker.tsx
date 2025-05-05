// src/components/habits/HabitTracker.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import HabitList from "./HabitList";
import HabitDetail from "./HabitDetail";
import AddHabitModal from "../modals/AddHabitModal";
import DailyProgress from "../dashboard/DailyProgress";
import WeeklyChart from "../dashboard/WeeklyChart";
import { useHabits } from "../../context/HabitContext";

const HabitTracker: React.FC = () => {
    const [showAddHabit, setShowAddHabit] = useState(false);
    const [showHabitDetail, setShowHabitDetail] = useState(false);
    const { habits, resetAllHabits } = useHabits();

    // Reset habits for tomorrow
    const handleResetHabits = () => {
        if (window.confirm("Reset all habits for tomorrow?")) {
            resetAllHabits();
        }
    };

    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold dark:text-white">Habit Tracker</h1>
                <button
                    onClick={handleResetHabits}
                    className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                    Reset for Tomorrow
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                    <DailyProgress />
                    <WeeklyChart />
                </div>
                <div>
                    <HabitList
                        onOpenAddHabit={() => setShowAddHabit(true)}
                        onSelectHabit={() => setShowHabitDetail(true)}
                    />
                </div>
            </div>

            <AddHabitModal isOpen={showAddHabit} onClose={() => setShowAddHabit(false)} />
            <HabitDetail isOpen={showHabitDetail} onClose={() => setShowHabitDetail(false)} />
        </div>
    );
};

export default HabitTracker;