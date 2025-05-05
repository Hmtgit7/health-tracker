// src/components/habits/HabitDetail.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Modal from "../modals/Modal";
import Button from "../ui/Button";
import { useHabits } from "../../context/HabitContext";
import { useTheme } from "../../context/ThemeContext";

type HabitDetailProps = {
    isOpen: boolean;
    onClose: () => void;
};

const HabitDetail: React.FC<HabitDetailProps> = ({ isOpen, onClose }) => {
    const { selectedHabit, updateHabit } = useHabits();
    const { darkMode } = useTheme();

    if (!selectedHabit) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-lg w-full">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold dark:text-white">
                        {selectedHabit.icon} {selectedHabit.name}
                    </h2>
                    <div className="flex items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">
                            {selectedHabit.streak} day streak
                        </span>
                        <span className="inline-flex items-center justify-center bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
                            🔥 {selectedHabit.streak}
                        </span>
                    </div>
                </div>

                <div className="mb-6">
                    <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                            Today's Progress
                        </span>
                        <span className="text-sm font-medium dark:text-white">
                            {selectedHabit.current} / {selectedHabit.target} {selectedHabit.unit}
                        </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700">
                        <motion.div
                            initial={{ width: "0%" }}
                            animate={{
                                width: `${Math.min(
                                    (selectedHabit.current / selectedHabit.target) * 100,
                                    100
                                )}%`
                            }}
                            transition={{ duration: 0.5 }}
                            className="h-2 rounded-full"
                            style={{ backgroundColor: selectedHabit.color }}
                        ></motion.div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 dark:text-white">Weekly Progress</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart
                                data={selectedHabit.history}
                                margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                            >
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    vertical={false}
                                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                                />
                                <YAxis
                                    domain={[0, selectedHabit.target * 1.2]}
                                    tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: darkMode ? "#1f2937" : "white",
                                        borderColor: darkMode ? "#374151" : "#e5e7eb",
                                        color: darkMode ? "white" : "black"
                                    }}
                                    labelStyle={{
                                        color: darkMode ? "#d1d5db" : "#4b5563",
                                    }}
                                />
                                <Bar
                                    dataKey="value"
                                    fill={selectedHabit.color}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 dark:text-white">Update Today's Progress</h3>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                if (selectedHabit.current > 0) {
                                    updateHabit(selectedHabit.id, selectedHabit.current - 1);
                                }
                            }}
                            className="h-10 w-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <span className="text-xl dark:text-white">-</span>
                        </button>
                        <input
                            type="range"
                            min="0"
                            max={selectedHabit.target * 2}
                            value={selectedHabit.current}
                            onChange={(e) => {
                                const newValue = parseInt(e.target.value);
                                updateHabit(selectedHabit.id, newValue);
                            }}
                            className="flex-1"
                            style={{ accentColor: selectedHabit.color }}
                        />
                        <button
                            onClick={() => {
                                updateHabit(selectedHabit.id, selectedHabit.current + 1);
                            }}
                            className="h-10 w-10 flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                        >
                            <span className="text-xl dark:text-white">+</span>
                        </button>
                        <div className="w-16 text-center dark:text-white">
                            {selectedHabit.current} {selectedHabit.unit}
                        </div>
                    </div>
                </div>

                <div className="flex space-x-3 pt-2">
                    <Button variant="secondary" onClick={onClose} fullWidth>
                        Close
                    </Button>
                    <Button
                        onClick={() => {
                            updateHabit(selectedHabit.id, selectedHabit.target);
                            onClose();
                        }}
                        fullWidth
                    >
                        Mark Complete
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default HabitDetail;