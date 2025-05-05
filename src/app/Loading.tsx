"use client";

import React from "react";
import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative mb-8"
      >
        {/* App logo */}
        <div className="h-24 w-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-4xl font-bold">
          N
        </div>
        
        {/* Animated pulse effect */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: [0, 0.5, 0],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 2
          }}
          style={{ 
            border: "4px solid",
            borderColor: "rgba(16, 185, 129, 0.5)" 
          }}
        />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">NEWME</h1>
        <p className="text-gray-600 dark:text-gray-300">Health & Habit Tracker</p>
        
        <div className="mt-6">
          <div className="w-48 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
            <motion.div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2 }}
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}