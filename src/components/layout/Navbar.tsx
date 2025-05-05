// src/components/layout/Navbar.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

import { formatDate } from "../../utils/dateUtils";

type NavbarProps = {
    selectedDate: Date;
    setSelectedDate: (date: Date) => void;
};

const Navbar: React.FC<NavbarProps> = ({ selectedDate, setSelectedDate }) => {
    // Generate dates for week view
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(selectedDate);
        date.setDate(selectedDate.getDate() - selectedDate.getDay() + i);
        return date;
    });

    // Go to previous week
    const goToPreviousWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 7);
        setSelectedDate(newDate);
    };

    // Go to next week
    const goToNextWeek = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 7);
        setSelectedDate(newDate);
    };

    return (
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <h2 className="text-lg font-semibold dark:text-white">My Daily Target</h2>

            <div className="flex items-center">
                <button
                    onClick={goToPreviousWeek}
                    className="p-1 mr-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                </button>

                <div className="hidden md:flex space-x-1">
                    {weekDates.map((date) => {
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isSelected = date.toDateString() === selectedDate.toDateString();

                        return (
                            <motion.button
                                key={date.toISOString()}
                                onClick={() => setSelectedDate(date)}
                                whileTap={{ scale: 0.95 }}
                                className={`relative px-2 py-1 rounded-md text-sm ${isSelected
                                        ? "text-white"
                                        : isToday
                                            ? "text-green-600 dark:text-green-400"
                                            : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                {isSelected && (
                                    <motion.div
                                        layoutId="selectedDate"
                                        className="absolute inset-0 bg-green-500 rounded-md -z-10"
                                        initial={false}
                                    />
                                )}
                                {date.getDate()}
                            </motion.button>
                        );
                    })}
                </div>

                <div className="md:hidden">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        {formatDate(selectedDate)}
                    </span>
                </div>

                <button
                    onClick={goToNextWeek}
                    className="p-1 ml-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-600 dark:text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default Navbar;