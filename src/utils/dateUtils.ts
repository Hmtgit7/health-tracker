// src/utils/dateUtils.ts
export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    }).format(date);
};

export const formatTime = (time: string): string => {
    return time;
};

export const getWeekDates = (): Date[] => {
    const dates: Date[] = [];
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Get Sunday of current week
    const sunday = new Date(today);
    sunday.setDate(today.getDate() - dayOfWeek);

    // Get all days of the week
    for (let i = 0; i < 7; i++) {
        const date = new Date(sunday);
        date.setDate(sunday.getDate() + i);
        dates.push(date);
    }

    return dates;
};

export const getDayName = (date: Date): string => {
    return new Intl.DateTimeFormat("en-US", { weekday: "short" }).format(date);
};