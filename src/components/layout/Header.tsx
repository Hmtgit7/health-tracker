"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { useNotifications } from "../../context/NotificationContext";
import ThemeToggle from "./ThemeToggle";
import NotificationPanel from "../notifications/NotificationPanel";
import AchievementToast from "../notifications/AchievementToast";
import { userData } from "../../data/user";

type HeaderProps = {
  setShowModal: (modal: "settings" | "profile" | null) => void;
};

const Header: React.FC<HeaderProps> = ({ setShowModal }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const { darkMode } = useTheme();
  const { unreadCount, currentAchievement, dismissAchievement } = useNotifications();
  
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 relative">
      <div className="flex items-center">
        <div 
          className="h-10 w-10 rounded-full overflow-hidden mr-4 cursor-pointer border-2 border-transparent hover:border-green-500 transition-all"
          onClick={() => setShowModal("profile")}
        >
          <img
            src={userData.avatar}
            alt={userData.name}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold dark:text-white">
            {userData.name}
          </h1>
          <div className="flex items-center">
            <span className="text-xs text-gray-500 dark:text-gray-400 mr-2">
              Premium Member
            </span>
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
              PRO
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mr-3 hidden md:flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full"
        >
          <span className="text-xs font-medium text-gray-800 dark:text-gray-200">
            🔆 Daily Goal: {Math.round(calculateProgress())}% Complete
          </span>
          <div className="ml-2 h-1.5 w-16 bg-gray-300 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
              style={{ width: `${Math.min(calculateProgress(), 100)}%` }}
            ></div>
          </div>
        </motion.div>
        
        <ThemeToggle />
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative mx-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setShowNotifications(!showNotifications)}
          aria-label="Notifications"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full"
            >
              {unreadCount}
            </motion.span>
          )}
        </motion.button>
        
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 relative"
          onClick={() => setShowModal("settings")}
          aria-label="Settings"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-700 dark:text-gray-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          
          {darkMode ? (
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -top-1 -right-1 h-3 w-3 bg-purple-500 rounded-full border border-white dark:border-gray-900"
            />
          ) : null}
        </motion.button>
      </div>
      
      <NotificationPanel 
        isOpen={showNotifications} 
        onClose={() => setShowNotifications(false)} 
      />
      
      <AchievementToast
        achievement={currentAchievement}
        onClose={dismissAchievement}
      />
    </header>
  );
};

// Function to calculate overall progress
function calculateProgress() {
  // In a real app, this would pull from context/state
  // For demo purposes, we're returning a fixed value
  return 65;
}

export default Header;