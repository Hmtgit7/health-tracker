"use client";

import React from "react";
import { motion } from "framer-motion";

type LoadingScreenProps = {
  isLoading: boolean;
  text?: string;
  type?: "fullscreen" | "overlay" | "inline";
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({
  isLoading,
  text = "Loading...",
  type = "fullscreen",
}) => {
  if (!isLoading) return null;

  const getContainerClasses = () => {
    switch (type) {
      case "fullscreen":
        return "fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-gray-900";
      case "overlay":
        return "absolute inset-0 flex items-center justify-center z-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm";
      case "inline":
        return "flex items-center justify-center py-8";
      default:
        return "fixed inset-0 flex items-center justify-center z-50 bg-white dark:bg-gray-900";
    }
  };

  const containerClasses = getContainerClasses();

  // Logo animation variants
  const logoVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        delay: 0.3,
        duration: 0.5 
      }
    }
  };

  // Circle animation
  const circleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (custom: number) => ({
      opacity: [0, 1, 0],
      scale: [0.8, 1, 0.8],
      transition: {
        delay: custom * 0.2,
        repeat: Infinity,
        duration: 1.5
      }
    })
  };

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={logoVariants}
          className="relative mb-8"
        >
          {/* Logo or brand icon */}
          <div className="h-16 w-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-3xl font-bold">
            N
          </div>
          
          {/* Animated circles */}
          <motion.div
            className="absolute inset-0 border-4 border-green-200 dark:border-green-800 rounded-xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ 
              opacity: [0, 0.5, 0],
              scale: [0.8, 1.5, 0.8]
            }}
            transition={{ 
              repeat: Infinity,
              duration: 2
            }}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-green-500 rounded-full"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={circleVariants}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-emerald-500 rounded-full"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={circleVariants}
          />
          
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-2 w-2 bg-blue-500 rounded-full"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={circleVariants}
          />
        </motion.div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={textVariants}
          className="text-center"
        >
          <p className="text-gray-700 dark:text-gray-300 font-medium">{text}</p>
          <div className="mt-3 flex space-x-2 justify-center">
            <motion.div 
              className="h-2 w-2 bg-green-500 rounded-full"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: 0
              }}
            />
            <motion.div 
              className="h-2 w-2 bg-green-500 rounded-full"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: 0.2
              }}
            />
            <motion.div 
              className="h-2 w-2 bg-green-500 rounded-full"
              animate={{ 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                repeat: Infinity,
                duration: 1,
                delay: 0.4
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;