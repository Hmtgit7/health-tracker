// src/app/page.tsx
"use client";

import React, { useState } from "react";

import Dashboard from "../components/dashboard/Dashboard";
import HabitTracker from "../components/habits/HabitTracker";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import MealPlan from "../components/meals/MealPlan";
import ProfileModal from "../components/modals/ProfileModal";
import SettingsModal from "../components/modals/SettingsModal";
import { HabitProvider } from "../context/HabitContext";
import { MealProvider } from "../context/MealContext";
import { ThemeProvider } from "../context/ThemeContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState<"settings" | "profile" | null>(null);
  const [notificationCount, setNotificationCount] = useState(3);

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "habits":
        return <HabitTracker />;
      case "meals":
        return <MealPlan />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };

  return (
    <ThemeProvider>
      <HabitProvider>
        <MealProvider>
          <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
            <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="flex-1 flex flex-col overflow-hidden">
              <Header
                setShowModal={setShowModal}
                notificationCount={notificationCount}
              />

              <main className="flex-1 overflow-y-auto">
                {renderContent()}
              </main>
            </div>

            <SettingsModal
              isOpen={showModal === "settings"}
              onClose={() => setShowModal(null)}
            />

            <ProfileModal
              isOpen={showModal === "profile"}
              onClose={() => setShowModal(null)}
            />
          </div>
        </MealProvider>
      </HabitProvider>
    </ThemeProvider>
  );
}