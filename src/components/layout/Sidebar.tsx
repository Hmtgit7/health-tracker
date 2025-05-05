// src/components/layout/Sidebar.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

type SidebarProps = {
    activeTab: string;
    setActiveTab: (tab: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    const tabs = [
        { id: "dashboard", icon: "🏠", label: "Dashboard" },
        { id: "habits", icon: "📊", label: "Habits" },
        { id: "meals", icon: "🍽️", label: "Meals" },
        { id: "activity", icon: "🏃‍♂️", label: "Activity" },
        { id: "sleep", icon: "😴", label: "Sleep" },
    ];

    return (
        <aside className="w-16 md:w-64 h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 flex items-center justify-center md:justify-start">
                <div className="h-10 w-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold">
                    N
                </div>
                <h1 className="text-xl font-bold ml-2 hidden md:block dark:text-white">NEWME</h1>
            </div>
            <nav className="flex-1 pt-8">
                <ul className="space-y-2">
                    {tabs.map((tab) => (
                        <li key={tab.id}>
                            <button
                                onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center p-3 md:px-4 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative ${activeTab === tab.id ? "text-green-500 font-medium" : "text-gray-600 dark:text-gray-400"
                                    }`}
                            >
                                <span className="text-xl md:mr-3">{tab.icon}</span>
                                <span className="hidden md:block">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-md"
                                    />
                                )}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="p-4 mt-auto">
                <button className="w-10 h-10 md:w-full rounded-full md:rounded-lg bg-green-100 text-green-600 flex items-center justify-center md:justify-start hover:bg-green-200 transition-colors">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
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
                    <span className="ml-2 hidden md:block">Add New</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;