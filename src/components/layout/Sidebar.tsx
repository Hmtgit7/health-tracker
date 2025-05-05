"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabits } from "../../context/HabitContext";
import { useNotifications } from "../../context/NotificationContext";

type SidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onAddNewClick: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onAddNewClick }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { habits } = useHabits();
  const { unreadCount } = useNotifications();
  
  const completedHabits = habits.filter(h => h.current >= h.target).length;
  
  const tabs = [
    { id: "dashboard", icon: "🏠", label: "Dashboard", alert: false },
    { id: "habits", icon: "📊", label: "Habits", alert: false, count: completedHabits },
    { id: "meals", icon: "🍽️", label: "Meals", alert: false },
    { id: "activity", icon: "🏃‍♂️", label: "Activity", alert: false },
    { id: "sleep", icon: "😴", label: "Sleep", alert: true },
  ];

  // Animation variants
  const sidebarVariants = {
    expanded: { width: "240px" },
    collapsed: { width: "80px" }
  };
  
  const labelVariants = {
    expanded: { opacity: 1, display: "block" },
    collapsed: { opacity: 0, display: "none", transition: { duration: 0.2 } }
  };
  
  return (
    <motion.aside 
      className="h-screen bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col"
      initial="expanded"
      animate={isCollapsed ? "collapsed" : "expanded"}
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-4 flex items-center justify-between">
        <motion.div className="flex items-center" layout>
          <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
            N
          </div>
          <motion.h1 
            className="text-xl font-bold ml-2 dark:text-white"
            variants={labelVariants}
          >
            NEWME
          </motion.h1>
        </motion.div>
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400"
        >
          {isCollapsed ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      
      <nav className="flex-1 pt-6 overflow-y-auto scrollbar-thin">
        <ul className="space-y-1 px-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <li key={tab.id}>
                <motion.button
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors relative ${
                    isActive 
                      ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 font-medium" 
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-xl">{tab.icon}</span>
                  <motion.span 
                    className="ml-3"
                    variants={labelVariants}
                  >
                    {tab.label}
                  </motion.span>
                  
                  {tab.count && tab.count > 0 && (
                    <motion.div 
                      variants={labelVariants}
                      className="ml-auto bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs font-medium px-2 py-0.5 rounded-full"
                    >
                      {tab.count}
                    </motion.div>
                  )}
                  
                  {tab.alert && (
                    <motion.div 
                      className="absolute right-4 top-1/2 -translate-y-1/2 h-2 w-2 bg-red-500 rounded-full"
                      animate={{ 
                        scale: [1, 1.2, 1], 
                        opacity: [1, 0.8, 1] 
                      }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 2 
                      }}
                    />
                  )}
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-r-md"
                    />
                  )}
                </motion.button>
              </li>
            );
          })}
        </ul>
        
        <div className="px-3 pt-6">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-4 mb-2">
            {!isCollapsed && "Shortcuts"}
          </div>
          <ul className="space-y-1">
            <li>
              <motion.button
                className="w-full flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">📝</span>
                <motion.span className="ml-3" variants={labelVariants}>
                  Notes
                </motion.span>
              </motion.button>
            </li>
            <li>
              <motion.button
                className="w-full flex items-center px-4 py-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="text-lg">🏆</span>
                <motion.span className="ml-3" variants={labelVariants}>
                  Achievements
                </motion.span>
              </motion.button>
            </li>
          </ul>
        </div>
      </nav>
      
      <div className="p-4 mt-auto border-t border-gray-200 dark:border-gray-700">
        <motion.button 
          onClick={onAddNewClick}
          className="w-full rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white py-2 flex items-center justify-center hover:opacity-90 transition-opacity"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <motion.span className="ml-2" variants={labelVariants}>
            Add New
          </motion.span>
        </motion.button>
        
        {!isCollapsed && (
          <motion.div 
            className="mt-4 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 dark:from-purple-900/20 dark:to-indigo-900/20 rounded-lg p-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center">
              <div className="text-lg">💎</div>
              <div className="ml-2">
                <div className="text-sm font-medium dark:text-white">Premium Plan</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Valid until Jun 2025</div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </motion.aside>
  );
};

export default Sidebar;