// src/components/ui/Tooltip.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TooltipProps = {
    children: React.ReactNode;
    text: string;
    position?: "top" | "bottom" | "left" | "right";
};

const Tooltip: React.FC<TooltipProps> = ({
    children,
    text,
    position = "top"
}) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: "bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1",
        bottom: "top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1",
        left: "right-full top-1/2 transform -translate-x-2 -translate-y-1/2 mr-1",
        right: "left-full top-1/2 transform translate-x-2 -translate-y-1/2 ml-1",
    };

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            <AnimatePresence>
                {isVisible && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-800 rounded shadow-sm whitespace-nowrap ${positionClasses[position]}`}
                    >
                        {text}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Tooltip;