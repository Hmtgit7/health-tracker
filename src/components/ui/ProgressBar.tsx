// src/components/ui/ProgressBar.tsx
import React from "react";
import { motion } from "framer-motion";

type ProgressBarProps = {
    progress: number;
    color?: string;
    height?: number;
    showPercentage?: boolean;
    className?: string;
};

const ProgressBar: React.FC<ProgressBarProps> = ({
    progress,
    color = "#10b981",
    height = 8,
    showPercentage = false,
    className = "",
}) => {
    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    return (
        <div className={`w-full ${className}`}>
            <div className="flex justify-between items-center mb-1">
                {showPercentage && (
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {Math.round(clampedProgress)}%
                    </span>
                )}
            </div>

            <div
                className="w-full bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700"
                style={{ height: `${height}px` }}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${clampedProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: color }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;