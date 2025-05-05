"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

type SettingsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<"general" | "notifications" | "privacy" | "account">("general");
  const [notifications, setNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(false);
  const [dataSharing, setDataSharing] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock function to simulate saving settings
  const handleSaveSettings = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1000);
  };
  
  // Tab animation variants
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };
  
  // Settings configuration
  const settingsConfig = {
    general: [
      {
        name: "Dark Mode",
        description: "Switch between light and dark themes",
        value: darkMode,
        onChange: toggleDarkMode,
        icon: "🌙"
      },
      {
        name: "Language",
        description: "Choose your preferred language",
        type: "select",
        options: ["English", "Spanish", "French", "German", "Japanese"],
        value: "English",
        icon: "🌐"
      },
      {
        name: "Units System",
        description: "Choose between metric and imperial units",
        type: "select",
        options: ["Metric (kg, cm)", "Imperial (lb, in)"],
        value: "Metric (kg, cm)",
        icon: "📏"
      }
    ],
    notifications: [
      {
        name: "Push Notifications",
        description: "Receive notifications on your device",
        value: notifications,
        onChange: () => setNotifications(!notifications),
        icon: "🔔"
      },
      {
        name: "Weekly Reports",
        description: "Receive weekly reports and insights",
        value: weeklyReports,
        onChange: () => setWeeklyReports(!weeklyReports),
        icon: "📊"
      },
      {
        name: "Reminders",
        description: "Get reminders for incomplete habits",
        value: true,
        icon: "⏰"
      },
      {
        name: "Updates & News",
        description: "Receive updates about new features",
        value: false,
        icon: "📰"
      }
    ],
    privacy: [
      {
        name: "Data Sharing",
        description: "Share anonymous usage data to improve the app",
        value: dataSharing,
        onChange: () => setDataSharing(!dataSharing),
        icon: "📈"
      },
      {
        name: "Activity Tracking",
        description: "Allow tracking of your in-app activities",
        value: true,
        icon: "👣"
      },
      {
        name: "Cloud Backup",
        description: "Automatically backup your data to the cloud",
        value: true,
        icon: "☁️"
      }
    ],
    account: [
      {
        name: "Email Notifications",
        description: "Receive email updates and newsletters",
        value: true,
        icon: "📧"
      },
      {
        name: "Two-Factor Authentication",
        description: "Enable additional security for your account",
        value: false,
        icon: "🔒"
      }
    ]
  };
  
  // Render setting item based on type
  const renderSettingItem = (setting: any) => {
    if (setting.type === "select") {
      return (
        <select 
          className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          {setting.options.map((option: string) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      );
    }
    
    return (
      <button
        onClick={setting.onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          setting.value ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            setting.value ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    );
  };
  
  // Render the content of active tab
  const renderTabContent = () => {
    const settings = settingsConfig[activeTab];
    
    return (
      <motion.div
        key={activeTab}
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="space-y-6"
      >
        {settings.map((setting: any, index: number) => (
          <div key={setting.name} className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-green-400/20 to-emerald-500/20 dark:from-green-900/30 dark:to-emerald-800/30 text-green-600 dark:text-green-400 mr-3">
                <span>{setting.icon}</span>
              </div>
              <div>
                <h4 className="font-medium dark:text-white">{setting.name}</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">{setting.description}</p>
              </div>
            </div>
            {renderSettingItem(setting)}
          </div>
        ))}
      </motion.div>
    );
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-2xl w-full overflow-hidden">
        {/* Header with glass effect */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-600 opacity-90"></div>
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
          <div className="relative px-6 py-5 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-white font-poppins">Settings</h2>
            <button 
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Settings content */}
        <div className="flex">
          {/* Sidebar navigation */}
          <div className="w-56 bg-gray-50 dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700 min-h-[500px]">
            <nav className="space-y-1">
              {(["general", "notifications", "privacy", "account"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-green-500/10 to-emerald-500/10 text-green-600 dark:text-green-400 font-medium"
                      : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="capitalize">{tab}</span>
                  {tab === "notifications" && (
                    <span className="ml-auto px-1.5 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs rounded-full">
                      New
                    </span>
                  )}
                </button>
              ))}
            </nav>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="bg-gradient-to-br from-gray-100/80 to-white/80 dark:from-gray-800/80 dark:to-gray-900/80 rounded-lg p-4 backdrop-blur-sm glass">
                <div className="flex items-center mb-2">
                  <span className="text-lg mr-2">💎</span>
                  <h3 className="font-medium text-sm dark:text-white">Premium Plan</h3>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Unlock all features and get priority support
                </p>
                <Button 
                  variant="gradient" 
                  size="xs" 
                  fullWidth
                  animation="scale"
                >
                  Upgrade Now
                </Button>
              </div>
            </div>
          </div>
          
          {/* Main content area */}
          <div className="flex-1 p-6">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                onClick={handleSaveSettings}
                loading={isLoading}
                loadingText="Saving..."
                animation="scale"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default SettingsModal;