"use client";

import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline" | "text" | "gradient" | "glass";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  fullWidth?: boolean;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loadingText?: string;
  animation?: "bounce" | "pulse" | "scale" | "shake" | "none";
  rounded?: "full" | "lg" | "md" | "none";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = "primary",
  size = "md",
  fullWidth = false,
  icon,
  rightIcon,
  disabled = false,
  className = "",
  type = "button",
  loading = false,
  loadingText,
  animation = "none",
  rounded = "lg",
}) => {
  // Base classes
  const baseClasses = "flex items-center justify-center font-medium focus:outline-none transition-all duration-200";
  
  // Variant classes
  const variantClasses = {
    primary: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50",
    text: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
    gradient: "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700",
    glass: "glass text-gray-800 dark:text-white hover:bg-white/40 dark:hover:bg-gray-800/40",
  };
  
  // Size classes
  const sizeClasses = {
    xs: "py-1 px-2 text-xs",
    sm: "py-1.5 px-3 text-sm",
    md: "py-2 px-4",
    lg: "py-2.5 px-5 text-lg",
    xl: "py-3 px-6 text-xl",
  };
  
  // Rounded classes
  const roundedClasses = {
    none: "rounded-none",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
  };
  
  // Width class
  const widthClass = fullWidth ? "w-full" : "";
  
  // Disabled class
  const disabledClass = disabled || loading ? "opacity-60 cursor-not-allowed" : "cursor-pointer";
  
  // Animation variants
  const getAnimationVariant = () => {
    switch (animation) {
      case "bounce":
        return {
          whileTap: { scale: 0.95 },
          whileHover: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 1 } }
        };
      case "pulse":
        return {
          whileTap: { scale: 0.95 },
          whileHover: { scale: [1, 1.05, 1], transition: { repeat: Infinity, duration: 1 } }
        };
      case "scale":
        return {
          whileTap: { scale: 0.95 },
          whileHover: { scale: 1.05 }
        };
      case "shake":
        return {
          whileTap: { scale: 0.95 },
          whileHover: { x: [0, -2, 2, -2, 2, 0], transition: { repeat: Infinity, duration: 0.5 } }
        };
      default:
        return {
          whileTap: { scale: 0.95 }
        };
    }
  };
  
  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${roundedClasses[rounded]} ${widthClass} ${disabledClass} ${className}`;
  const animationProps = getAnimationVariant();
  
  return (
    <motion.button
      {...animationProps}
      className={buttonClasses}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading ? (
        <>
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          {loadingText || children}
        </>
      ) : (
        <>
          {icon && <span className="mr-2">{icon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;