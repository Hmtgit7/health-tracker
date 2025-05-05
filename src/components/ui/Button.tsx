// src/components/ui/Button.tsx
import React from "react";
import { motion } from "framer-motion";

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    variant?: "primary" | "secondary" | "outline" | "text";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    icon?: React.ReactNode;
    disabled?: boolean;
    className?: string;
    type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
    children,
    onClick,
    variant = "primary",
    size = "md",
    fullWidth = false,
    icon,
    disabled = false,
    className = "",
    type = "button",
}) => {
    const baseClasses = "flex items-center justify-center rounded-lg font-medium focus:outline-none transition-all duration-200";

    const variantClasses = {
        primary: "bg-green-500 text-white hover:bg-green-600 active:bg-green-700",
        secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300 active:bg-gray-400 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600",
        outline: "border border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-800",
        text: "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800",
    };

    const sizeClasses = {
        sm: "py-1 px-3 text-sm",
        md: "py-2 px-4",
        lg: "py-3 px-6 text-lg",
    };

    const widthClass = fullWidth ? "w-full" : "";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer";

    const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClass} ${className}`;

    return (
        <motion.button
            whileTap={{ scale: disabled ? 1 : 0.97 }}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
            type={type}
        >
            {icon && <span className="mr-2">{icon}</span>}
            {children}
        </motion.button>
    );
};

export default Button;