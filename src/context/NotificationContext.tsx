"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { useHabits } from "./HabitContext";

// Define notification types
export type Notification = {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info" | "alert";
  icon: string;
  time: string;
  isRead: boolean;
};

export type Achievement = {
  id: string;
  title: string;
  description: string;
  icon: string;
  type: "bronze" | "silver" | "gold" | "platinum";
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  currentAchievement: Achievement | null;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAllNotifications: () => void;
  dismissAchievement: () => void;
};

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const { habits } = useHabits();

  // Generate notifications based on user data
  useEffect(() => {
    if (!habits.length) return;
    
    const generatedNotifications: Notification[] = [];
    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, "0")}:${now
      .getMinutes()
      .toString()
      .padStart(2, "0")}`;

    // Check water intake
    const waterHabit = habits.find((h) => h.name === "Water");
    if (waterHabit && waterHabit.current < waterHabit.target * 0.5) {
      generatedNotifications.push({
        id: "water-reminder",
        title: "Stay Hydrated!",
        message: `You've only had ${waterHabit.current}ml of water today. Try to reach your goal of ${waterHabit.target}ml.`,
        type: "warning",
        icon: "💧",
        time: timeString,
        isRead: false,
      });
    }

    // Check steps
    const stepsHabit = habits.find((h) => h.name === "Steps");
    if (stepsHabit && stepsHabit.current >= stepsHabit.target) {
      generatedNotifications.push({
        id: "steps-complete",
        title: "Goal Achieved!",
        message: `Congratulations! You've reached your daily step goal of ${stepsHabit.target} steps.`,
        type: "success",
        icon: "👣",
        time: timeString,
        isRead: false,
      });
      
      // Show achievement when step goal is reached
      if (!currentAchievement && stepsHabit.current >= stepsHabit.target) {
        setCurrentAchievement({
          id: "active-stepper",
          title: "Active Stepper",
          description: "You've reached your daily step goal. Keep up the healthy lifestyle!",
          icon: "🏆",
          type: "gold",
        });
      }
    }

    // Check sleep
    const sleepHabit = habits.find((h) => h.name === "Sleep");
    if (sleepHabit && sleepHabit.current < 7) {
      generatedNotifications.push({
        id: "sleep-warning",
        title: "Sleep Health",
        message: `You slept ${sleepHabit.current} hours last night. Aim for 7-8 hours for optimal health.`,
        type: "info",
        icon: "😴",
        time: timeString,
        isRead: false,
      });
    }

    // Streaks achievements
    habits.forEach((habit) => {
      if (habit.streak === 7) {
        generatedNotifications.push({
          id: `streak-${habit.id}`,
          title: "7-Day Streak!",
          message: `You've maintained your ${habit.name} habit for a full week! Keep it up!`,
          type: "success",
          icon: "🔥",
          time: timeString,
          isRead: false,
        });
      }
    });

    // Upcoming meal reminder
    const currentHour = now.getHours();
    if (currentHour === 11) {
      generatedNotifications.push({
        id: "lunch-reminder",
        title: "Lunch Time Soon",
        message: "Don't forget to have a balanced lunch in about an hour!",
        type: "info",
        icon: "🍽️",
        time: timeString,
        isRead: false,
      });
    }

    // App announcement
    generatedNotifications.push({
      id: "new-feature",
      title: "New Feature Available!",
      message: "Try our new workout planner in the Activities section!",
      type: "alert",
      icon: "🎉",
      time: "09:30",
      isRead: false,
    });
    
    // Weekly summary
    if (now.getDay() === 0) { // Sunday
      generatedNotifications.push({
        id: "weekly-summary",
        title: "Your Weekly Summary",
        message: "Check out how you performed this week compared to your goals!",
        type: "info",
        icon: "📊",
        time: "08:00",
        isRead: false,
      });
    }

    setNotifications(generatedNotifications);
    updateUnreadCount(generatedNotifications);
  }, [habits]);

  const updateUnreadCount = (notifs: Notification[]) => {
    const count = notifs.filter((notif) => !notif.isRead).length;
    setUnreadCount(count);
  };

  const markAsRead = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.map((notif) =>
        notif.id === id ? { ...notif, isRead: !notif.isRead } : notif
      );
      updateUnreadCount(updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications((prev) => {
      const updated = prev.map((notif) => ({ ...notif, isRead: true }));
      updateUnreadCount(updated);
      return updated;
    });
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => {
      const updated = prev.filter((notif) => notif.id !== id);
      updateUnreadCount(updated);
      return updated;
    });
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const dismissAchievement = () => {
    setCurrentAchievement(null);
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        currentAchievement,
        markAsRead,
        markAllAsRead,
        deleteNotification,
        clearAllNotifications,
        dismissAchievement,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider"
    );
  }
  return context;
};