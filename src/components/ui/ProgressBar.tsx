"use client";

import React from "react";
import { motion } from "framer-motion";

type ProgressBarProps = {
  progress: number;
  color?: string;
  height?: number;
  showPercentage?: boolean;
  className?: string;
  animated?: boolean;
  striped?: boolean;
  rounded?: boolean;
  label?: string;
  showValue?: boolean;
  min?: number;
  max?: number;
  unit?: string;
  variant?: "default" | "gradient" | "glass";
};

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color = "#10b981",
  height = 8,
  showPercentage = false,
  className = "",
  animated = true,
  striped = false,
  rounded = true,
  label,
  showValue = false,
  min = 0,
  max = 100,
  unit = "%",
  variant = "default",
}) => {
  // Ensure progress is between min and max
  const clampedProgress = Math.min(Math.max(progress, min), max);
  
  // Calculate percentage for display
  const percentage = ((clampedProgress - min) / (max - min)) * 100;
  
  // Get value to display
  const displayValue = showValue ? clampedProgress : percentage;
  const displayUnit = showValue ? unit : "%";
  
  // Get background styles based on variant
  const getBackgroundStyle = () => {
    switch (variant) {
      case "gradient":
        return {
          background: `linear-gradient(to right, ${color}, ${getLighterColor(color)})`,
        };
      case "glass":
        return {
          background: `${color}90`, // Add 90 for 56% opacity
          backdropFilter: "blur(4px)",
        };
      default:
        return {
          backgroundColor: color,
        };
    }
  };
  
  // Function to get a lighter shade of the given color
  const getLighterColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = parseInt(hexColor.slice(1, 3), 16);
    const g = parseInt(hexColor.slice(3, 5), 16);
    const b = parseInt(hexColor.slice(5, 7), 16);
    
    // Make it lighter
    const lighterR = Math.min(255, r + 40);
    const lighterG = Math.min(255, g + 40);
    const lighterB = Math.min(255, b + 40);
    
    // Convert back to hex
    return `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`;
  };
  
  const stripedBackground = striped ? {
    backgroundImage: `linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)`,
    backgroundSize: `1rem ${height}px`,
  } : {};
  
  return (
    <div className={`w-full ${className}`}>
      {(label || showPercentage) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {label}
            </span>
          )}
          {showPercentage && (
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {Math.round(displayValue)}{displayUnit}
            </span>
          )}
        </div>
      )}
      
      <div 
        className={`w-full bg-gray-200 dark:bg-gray-700 overflow-hidden ${rounded ? 'rounded-full' : ''}`}
        style={{ height: `${height}px` }}
      >
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={animated ? { duration: 0.8, ease: "easeOut" } : { duration: 0 }}
          className={`h-full ${rounded ? 'rounded-full' : ''} ${animated && striped ? 'animate-[progress-bar-stripes_1s_linear_infinite]' : ''}`}
          style={{ 
            ...getBackgroundStyle(),
            ...stripedBackground,
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;