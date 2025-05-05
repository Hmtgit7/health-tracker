"use client";

import React, { useState } from "react";
import { ThemeProvider } from "../context/ThemeContext";
import { HabitProvider } from "../context/HabitContext";
import { MealProvider } from "../context/MealContext";
import { NotificationProvider } from "../context/NotificationContext";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Dashboard from "../components/dashboard/Dashboard";
import HabitTracker from "../components/habits/HabitTracker";
import MealPlan from "../components/meals/MealPlan";
import ActivityAnalytics from "../components/activity/ActivityAnalytics";
import SleepTracker from "../components/sleep/SleepTracker";
import SettingsModal from "../components/modals/SettingsModal";
import ProfileModal from "../components/modals/ProfileModal";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState<"settings" | "profile" | null>(null);
  
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard onTabChange={setActiveTab} />;
      case "habits":
        return <HabitTracker />;
      case "meals":
        return <MealPlan />;
      case "activity":
        return <ActivityAnalytics />;
      case "sleep":
        return <SleepTracker />;
      default:
        return <Dashboard onTabChange={setActiveTab} />;
    }
  };
  
  return (
    <ThemeProvider>
      <HabitProvider>
        <MealProvider>
          <NotificationProvider>
            <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
              <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
              
              <div className="flex-1 flex flex-col overflow-hidden">
                <Header setShowModal={setShowModal} />
                
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
          </NotificationProvider>
        </MealProvider>
      </HabitProvider>
    </ThemeProvider>
  );
}