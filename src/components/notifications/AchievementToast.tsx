"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "platinum";
};

type AchievementToastProps = {
  achievement: Achievement | null;
  onClose: () => void;
};

const AchievementToast: React.FC<AchievementToastProps> = ({
  achievement,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (achievement) {
      setIsVisible(true);
      // Auto-close after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 500); // Wait for exit animation
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  const typeStyles = {
    bronze: "from-amber-500 to-amber-700",
    silver: "from-gray-400 to-gray-600",
    gold: "from-yellow-400 to-yellow-600",
    platinum: "from-indigo-400 to-purple-600",
  };

  if (!achievement) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="fixed bottom-4 right-4 z-50 max-w-sm"
        >
          <div className={`w-full rounded-lg shadow-lg overflow-hidden`}>
            <div
              className={`p-4 bg-gradient-to-r ${
                typeStyles[achievement.type]
              } text-white`}
            >
              <div className="flex items-center">
                <div className="p-2 bg-white/20 rounded-full mr-3 backdrop-blur-sm">
                  <span className="text-2xl">{achievement.icon}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg tracking-tight">
                    Achievement Unlocked!
                  </h3>
                  <p className="text-sm text-white/90">{achievement.title}</p>
                </div>
                <button 
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 500);
                  }}
                  className="p-1 rounded-full hover:bg-white/20"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-4">
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {achievement.description}
              </p>
              <div className="mt-2 flex justify-end">
                <button
                  onClick={() => {
                    setIsVisible(false);
                    setTimeout(onClose, 500);
                  }}
                  className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AchievementToast;