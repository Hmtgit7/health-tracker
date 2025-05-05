// src/components/dashboard/WelcomeCard.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import Card from "../ui/Card";
import { userData } from "../../data/user";
import { formatDate } from "../../utils/dateUtils";

const WelcomeCard: React.FC = () => {
  const today = new Date();
  
  return (
    <Card className="mb-4">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1 dark:text-white">
            Good morning, {userData.name.split(" ")[0]}!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{formatDate(today)}</p>
        </div>
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", damping: 10, stiffness: 100 }}
        >
          <span className="text-4xl">👋</span>
        </motion.div>
      </div>
      
      <div className="mt-4">
        <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">You've gained</p>
            <p className="text-lg font-bold text-green-600 dark:text-green-400">2kg in a month keep it up!</p>
          </div>
          <div className="text-2xl">💪</div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeCard;