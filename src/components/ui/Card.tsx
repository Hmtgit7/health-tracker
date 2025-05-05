// src/components/ui/Card.tsx
import React from "react";
import { motion } from "framer-motion";

type CardProps = {
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
    interactive?: boolean;
};

const Card: React.FC<CardProps> = ({
    children,
    className = "",
    onClick,
    interactive = false,
}) => {
    const baseClasses = "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4";
    const interactiveClasses = interactive ? "hover:shadow-md transition-shadow cursor-pointer" : "";

    const cardClasses = `${baseClasses} ${interactiveClasses} ${className}`;

    return interactive ? (
        <motion.div
            className={cardClasses}
            onClick={onClick}
            whileHover={{ y: -2 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            {children}
        </motion.div>
    ) : (
        <div className={cardClasses}>
            {children}
        </div>
    );
};

export default Card;