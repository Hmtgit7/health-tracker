// src/components/layout/Header.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import ThemeToggle from "./ThemeToggle";
import { userData } from "../../data/user";

type HeaderProps = {
  setShowModal: (modal: "settings" | "profile" | null) => void;
  notificationCount: number;
};

const Header: React.FC<HeaderProps> = ({ setShowModal, notificationCount }) => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full overflow-hidden mr-4">
          <img
            src={userData.avatar}
            alt={userData.name}
            className="h-full w-full object-cover"
            onClick={() => setShowModal("profile")}
          />
        </div>
        <h1 className="text-xl font-bold hidden sm:block dark:text-white">
          {userData.name}
        </h1>
      </div>
      <div className="flex items-center">
        <ThemeToggle />
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="relative mx-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => {}}
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
          {notificationCount > 0 && (
            <span className="absolute top-0 right-0 h-5 w-5 flex items-center justify-center text-xs text-white bg-red-500 rounded-full">
              {notificationCount}
            </span>
          )}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setShowModal("settings")}
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
        </motion.button>
      </div>
    </header>
  );
};

export default Header;

