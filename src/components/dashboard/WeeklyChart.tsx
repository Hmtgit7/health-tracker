// src/components/dashboard/WeeklyChart.tsx
"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Card from "../ui/Card";
import { useTheme } from "../../context/ThemeContext";
import { habitData } from "../../data/habits";

type WeeklyChartProps = {
    habitId?: string;
};

const WeeklyChart: React.FC<WeeklyChartProps> = ({ habitId = "1" }) => {
    const { darkMode } = useTheme();
    const habit = habitData.find((h) => h.id === habitId) || habitData[0];

    return (
        <Card className="mb-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold dark:text-white">Weekly Progress</h3>
                <div className="flex items-center">
                    <span className="text-xl mr-2">{habit.icon}</span>
                    <span className="font-medium dark:text-white">{habit.name}</span>
                </div>
            </div>

            <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={habit.history}
                        margin={{ top: 5, right: 5, bottom: 15, left: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#e5e7eb"} />
                        <XAxis
                            dataKey="date"
                            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                        />
                        <YAxis
                            domain={[0, habit.target * 1.2]}
                            tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                        />
                        <Tooltip
                            contentStyle={{
                                backgroundColor: darkMode ? "#1f2937" : "white",
                                borderColor: darkMode ? "#374151" : "#e5e7eb",
                                color: darkMode ? "white" : "black",
                            }}
                            labelStyle={{
                                color: darkMode ? "#d1d5db" : "#4b5563",
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke={habit.color}
                            strokeWidth={3}
                            dot={{
                                r: 4,
                                strokeWidth: 2,
                                fill: darkMode ? "#1f2937" : "white",
                                stroke: habit.color,
                            }}
                            activeDot={{
                                r: 6,
                                strokeWidth: 2,
                                fill: darkMode ? "#1f2937" : "white",
                                stroke: habit.color,
                            }}
                        />
                        <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default WeeklyChart;