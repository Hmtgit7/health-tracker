"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import AddNewModal from "../components/modals/AddNewModal";
import LoadingScreen from "../components/ui/LoadingScreen";
import { useHabits } from "../context/HabitContext";
import { useMeals } from "../context/MealContext";

export default function Home() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showModal, setShowModal] = useState<"settings" | "profile" | null>(null);
  const [showAddNewModal, setShowAddNewModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleAddItem = (type: string, data: any) => {
    console.log(`Adding new ${type}:`, data);
    
    // Here you would integrate with your context functions
    // to actually add the new item
    switch (type) {
      case "habit":
        // Call the addHabit function from your HabitContext
        break;
      case "meal":
        // Call the addMeal function from your MealContext
        break;
      // Handle other item types
    }
  };
  
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
  
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };
  
  return (
    <ThemeProvider>
      <HabitProvider>
        <MealProvider>
          <NotificationProvider>
            {isLoading ? (
              <LoadingScreen isLoading={isLoading} text="Loading your health data..." />
            ) : (
              <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
                <Sidebar 
                  activeTab={activeTab} 
                  setActiveTab={setActiveTab} 
                  onAddNewClick={() => setShowAddNewModal(true)}
                />
                
                <div className="flex-1 flex flex-col overflow-hidden">
                  <Header setShowModal={setShowModal} />
                  
                  <main className="flex-1 overflow-y-auto scrollbar-thin">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        variants={pageVariants}
                        className="h-full"
                      >
                        {renderContent()}
                      </motion.div>
                    </AnimatePresence>
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
                
                <AddNewModal
                  isOpen={showAddNewModal}
                  onClose={() => setShowAddNewModal(false)}
                  onAddItem={handleAddItem}
                />
              </div>
            )}
          </NotificationProvider>
        </MealProvider>
      </HabitProvider>
    </ThemeProvider>
  );
}