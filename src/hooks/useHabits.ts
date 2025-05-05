import { useState, useEffect } from "react";
import { Habit } from "../types";
import { habitData } from "../data/habits";

export const useHabits = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate fetching data
  useEffect(() => {
    const loadHabits = () => {
      // In a real app, this would be an API call
      setHabits(habitData);
      setIsLoading(false);
    };

    // Simulate loading delay
    const timer = setTimeout(() => {
      loadHabits();
    }, 500);

    return () => clearTimeout(timer);
  }, []);

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

    // If we're updating the selected habit, update it too
    if (selectedHabit && selectedHabit.id === id) {
      setSelectedHabit((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          current: value,
          streak: value >= prev.target ? prev.streak + 1 : 0,
        };
      });
    }
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

  // Delete a habit
  const deleteHabit = (id: string) => {
    setHabits((prev) => prev.filter((habit) => habit.id !== id));
    if (selectedHabit && selectedHabit.id === id) {
      setSelectedHabit(null);
    }
  };

  // Calculate total daily progress
  const calculateDailyProgress = () => {
    if (habits.length === 0) return 0;
    const completed = habits.filter(
      (habit) => habit.current >= habit.target
    ).length;
    return (completed / habits.length) * 100;
  };

  return {
    habits,
    selectedHabit,
    setSelectedHabit,
    isLoading,
    updateHabit,
    addHabit,
    resetAllHabits,
    deleteHabit,
    calculateDailyProgress,
  };
};
