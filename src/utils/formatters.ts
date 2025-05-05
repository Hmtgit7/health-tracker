// src/utils/formatters.ts
export const formatNumber = (value: number): string => {
    return value.toLocaleString();
};

export const formatPercentage = (value: number): string => {
    return `${Math.round(value)}%`;
};

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return `${text.slice(0, maxLength)}...`;
};

export const generateUniqueId = (): string => {
    return Math.random().toString(36).substring(2) + Date.now().toString(36);
};