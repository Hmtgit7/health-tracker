"use client";

import React from "react";
import { motion } from "framer-motion";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  interactive?: boolean;
  glass?: boolean;
  hoverEffect?: "raise" | "glow" | "scale" | "border" | "none";
  animation?: "fadeIn" | "slideIn" | "popIn" | "none";
  delay?: number;
};

const Card: React.FC<CardProps> = ({ 
  children, 
  className = "", 
  onClick,
  interactive = false,
  glass = false,
  hoverEffect = "none",
  animation = "none",
  delay = 0
}) => {
  const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4";
  const glassClasses = glass ? "glass" : "";
  const interactiveClasses = interactive ? "cursor-pointer" : "";
  
  const getHoverAnimation = () => {
    switch (hoverEffect) {
      case "raise":
        return { y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" };
      case "glow":
        return { boxShadow: "0 0 15px rgba(16, 185, 129, 0.5)" };
      case "scale":
        return { scale: 1.02 };
      case "border":
        return { borderColor: "rgba(16, 185, 129, 0.7)" };
      default:
        return {};
    }
  };
  
  const getEntryAnimation = () => {
    switch (animation) {
      case "fadeIn":
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.5, delay }
        };
      case "slideIn":
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { type: "spring", stiffness: 300, damping: 30, delay }
        };
      case "popIn":
        return {
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          transition: { type: "spring", stiffness: 300, damping: 30, delay }
        };
      default:
        return {
          initial: {},
          animate: {},
          transition: {}
        };
    }
  };
  
  const cardClasses = `${baseClasses} ${glassClasses} ${interactiveClasses} ${className}`;
  const { initial, animate, transition } = getEntryAnimation();
  
  return interactive ? (
    <motion.div 
      className={cardClasses}
      onClick={onClick}
      whileHover={getHoverAnimation()}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  ) : (
    <motion.div 
      className={cardClasses}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default Card;