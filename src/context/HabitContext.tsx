"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { Habit } from "../types";
import { habitData } from "../data/habits";

type HabitContextType = {
    habits: Habit[];
    selectedHabit: Habit | null;
    setSelectedHabit: (habit: Habit | null) => void;
    updateHabit: (id: string, value: number) => void;
    addHabit: (newHabit: Omit<Habit, "id" | "streak" | "history">) => void;
    resetAllHabits: () => void;
    calculateDailyProgress: () => number;
};

const HabitContext = createContext<HabitContextType | undefined>(undefined);

export const HabitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [habits, setHabits] = useState<Habit[]>(habitData);
    const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);

    // Update habit value
    const updateHabit = (id: string, value: number) => {
        setHabits((prev) =>
            prev.map((habit) => {
                if (habit.id === id) {
                    const isComplete = value >= habit.target;
                    const wasComplete = habit.current >= habit.target;
                    let newStreak = habit.streak;

                    if (isComplete && !wasComplete) {
                        newStreak += 1;
                    } else if (!isComplete && wasComplete) {
                        newStreak = 0;
                    }

                    // Update history for today
                    const updatedHistory = [...habit.history];
                    updatedHistory[updatedHistory.length - 1] = {
                        ...updatedHistory[updatedHistory.length - 1],
                        value,
                    };

                    return {
                        ...habit,
                        current: value,
                        streak: newStreak,
                        history: updatedHistory,
                    };
                }
                return habit;
            })
        );
    };

    // Add new habit
    const addHabit = (newHabit: Omit<Habit, "id" | "streak" | "history">) => {
        const id = (habits.length + 1).toString();
        const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

        const newHabitComplete: Habit = {
            ...newHabit,
            id,
            streak: 0,
            history: weekDays.map((day) => ({ date: day, value: 0 })),
        };

        setHabits((prev) => [...prev, newHabitComplete]);
    };

    // Reset all habit values to 0
    const resetAllHabits = () => {
        setHabits((prev) =>
            prev.map((habit) => ({
                ...habit,
                current: 0,
            }))
        );
    };

    // Calculate total daily progress
    const calculateDailyProgress = () => {
        const completed = habits.filter((habit) => habit.current >= habit.target).length;
        return habits.length > 0 ? (completed / habits.length) * 100 : 0;
    };

    return (
        <HabitContext.Provider
            value={{
                habits,
                selectedHabit,
                setSelectedHabit,
                updateHabit,
                addHabit,
                resetAllHabits,
                calculateDailyProgress,
            }}
        >
            {children}
        </HabitContext.Provider>
    );
};

export const useHabits = (): HabitContextType => {
    const context = useContext(HabitContext);
    if (!context) {
        throw new Error("useHabits must be used within a HabitProvider");
    }
    return context;
};