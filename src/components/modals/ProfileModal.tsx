"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Button from "../ui/Button";
import { userData } from "../../data/user";
import ProgressBar from "../ui/ProgressBar";

type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "achievements" | "settings">("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: userData.name,
    weight: userData.weight,
    height: userData.height,
    birthDate: "1992-04-15",
    email: "jenny.wilson@example.com",
    gender: "Female",
    fitnessGoal: "Maintain weight",
    activityLevel: "Moderately active"
  });
  
  // Tab animation variants
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };
  
  // Badge item component
  const Badge = ({ text, color = "green" }: { text: string, color?: string }) => {
    const colorClasses = {
      green: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-400",
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-400",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-400",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-400",
      red: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-400",
    };
    
    return (
      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${colorClasses[color as keyof typeof colorClasses]}`}>
        {text}
      </span>
    );
  };
  
  // Mock achievements data
  const achievements = [
    { id: 1, name: "Early Bird", description: "Complete morning routine for 7 days", progress: 85, icon: "🌅" },
    { id: 2, name: "Water Warrior", description: "Reach water goal for 30 days", progress: 100, icon: "💧", completed: true },
    { id: 3, name: "Step Master", description: "Reach 10,000 steps for 14 days", progress: 60, icon: "👣" },
    { id: 4, name: "Meal Planner", description: "Log all meals for 30 days", progress: 100, icon: "🍽️", completed: true },
    { id: 5, name: "Sleep Champion", description: "Maintain sleep schedule for 14 days", progress: 40, icon: "😴" },
  ];
  
  // Mock weekly stats
  const weeklyStats = [
    { name: "Average Steps", value: "8,246", change: "+12%", color: "green" },
    { name: "Water Intake", value: "2.1L", change: "+5%", color: "blue" },
    { name: "Calories", value: "1,843", change: "-3%", color: "purple" },
    { name: "Sleep", value: "7.3h", change: "+8%", color: "green" },
    { name: "Workouts", value: "4", change: "+1", color: "yellow" },
    { name: "Active Minutes", value: "320", change: "+45", color: "green" },
  ];
  
  // Activity feed items
  const activityFeed = [
    { id: 1, type: "habit", text: "Completed water goal", time: "Today, 2:30 PM", icon: "💧" },
    { id: 2, type: "achievement", text: "Earned 'Water Warrior' badge", time: "Today, 2:30 PM", icon: "🏆" },
    { id: 3, type: "steps", text: "Reached 10,000 steps", time: "Yesterday", icon: "👣" },
    { id: 4, type: "workout", text: "Completed 30 min HIIT workout", time: "Yesterday", icon: "🏋️‍♀️" },
    { id: 5, type: "meal", text: "Logged all meals for the day", time: "2 days ago", icon: "🍽️" },
  ];
  
  // Handle input change
  const handleInputChange = (field: string, value: string | number) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Render tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <motion.div
            key="overview"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            {/* User info */}
            <div className="relative">
              {isEditing ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={profileData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Email
                      </label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Weight (kg)
                      </label>
                      <input
                        type="number"
                        value={profileData.weight}
                        onChange={(e) => handleInputChange("weight", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Height (cm)
                      </label>
                      <input
                        type="number"
                        value={profileData.height}
                        onChange={(e) => handleInputChange("height", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Birth Date
                      </label>
                      <input
                        type="date"
                        value={profileData.birthDate}
                        onChange={(e) => handleInputChange("birthDate", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Gender
                      </label>
                      <select
                        value={profileData.gender}
                        onChange={(e) => handleInputChange("gender", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 dark:text-white">
                        Activity Level
                      </label>
                      <select
                        value={profileData.activityLevel}
                        onChange={(e) => handleInputChange("activityLevel", e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      >
                        <option value="Sedentary">Sedentary</option>
                        <option value="Lightly active">Lightly active</option>
                        <option value="Moderately active">Moderately active</option>
                        <option value="Very active">Very active</option>
                        <option value="Extremely active">Extremely active</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 dark:text-white">
                      Fitness Goal
                    </label>
                    <select
                      value={profileData.fitnessGoal}
                      onChange={(e) => handleInputChange("fitnessGoal", e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    >
                      <option value="Lose weight">Lose weight</option>
                      <option value="Maintain weight">Maintain weight</option>
                      <option value="Gain weight">Gain weight</option>
                      <option value="Build muscle">Build muscle</option>
                      <option value="Improve fitness">Improve fitness</option>
                    </select>
                  </div>
                  <div className="flex justify-end space-x-3 pt-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => setIsEditing(false)}
                      animation="scale"
                    >
                      Save Changes
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="absolute top-0 right-0">
                    <Button
                      variant="text"
                      size="sm"
                      onClick={() => setIsEditing(true)}
                      icon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      }
                    >
                      Edit
                    </Button>
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-xl p-6 glass">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-4">
                        <div className="relative">
                          <div className="h-20 w-20 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 ring-2 ring-green-500">
                            <img
                              src={userData.avatar}
                              alt={userData.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="absolute bottom-0 right-0 bg-green-500 text-white h-6 w-6 rounded-full flex items-center justify-center text-xs border-2 border-white dark:border-gray-800">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold dark:text-white">{profileData.name}</h3>
                        <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Khandwa, Madhya Pradesh, IN
                        </div>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge text="Premium" color="purple" />
                          <Badge text="2-month streak" color="green" />
                          <Badge text="5 achievements" color="blue" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Weight</p>
                          <p className="text-2xl font-bold dark:text-white">{profileData.weight}<span className="text-sm font-normal ml-1">kg</span></p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        <span className="font-medium">↓ 1.5kg</span> last month
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Height</p>
                          <p className="text-2xl font-bold dark:text-white">{profileData.height}<span className="text-sm font-normal ml-1">cm</span></p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">BMI</p>
                          <p className="text-2xl font-bold dark:text-white">{userData.bmi}</p></div>
                        <div className="h-8 w-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                        <span className="font-medium">Normal</span> range
                      </p>
                    </div>
                    
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Goal</p>
                          <p className="text-lg font-bold dark:text-white">{profileData.fitnessGoal}</p>
                        </div>
                        <div className="h-8 w-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        <span className="font-medium">{profileData.activityLevel}</span>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            {!isEditing && (
              <>
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 dark:text-white">Recent Activity</h3>
                  <div className="space-y-3">
                    {activityFeed.map((activity) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="flex p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700"
                      >
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 dark:from-green-900/40 dark:to-emerald-800/40 flex items-center justify-center text-xl mr-3">
                          {activity.icon}
                        </div>
                        <div>
                          <p className="font-medium dark:text-white">{activity.text}</p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-3 dark:text-white">Weekly Insights</h3>
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg glass">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {weeklyStats.map((stat, index) => (
                        <div key={index} className="bg-white/60 dark:bg-gray-800/60 p-3 rounded-lg">
                          <p className="text-sm text-gray-500 dark:text-gray-400">{stat.name}</p>
                          <div className="flex items-baseline">
                            <p className="text-xl font-bold dark:text-white">{stat.value}</p>
                            <p className={`ml-2 text-xs ${
                              stat.color === "green" ? "text-green-600 dark:text-green-400" :
                              stat.color === "red" ? "text-red-600 dark:text-red-400" :
                              stat.color === "yellow" ? "text-yellow-600 dark:text-yellow-400" :
                              stat.color === "blue" ? "text-blue-600 dark:text-blue-400" :
                              "text-purple-600 dark:text-purple-400"
                            }`}>
                              {stat.change}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        );
        
      case "stats":
        return (
          <motion.div
            key="stats"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl glass">
                <h3 className="text-lg font-medium mb-2 dark:text-white">Body Metrics</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Last updated: Today</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Weight</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{profileData.weight} kg</span>
                    </div>
                    <ProgressBar
                      progress={75}
                      color="#10b981"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">BMI</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{userData.bmi}</span>
                    </div>
                    <ProgressBar
                      progress={80}
                      color="#3b82f6"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Body Fat</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">24%</span>
                    </div>
                    <ProgressBar
                      progress={65}
                      color="#8b5cf6"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Muscle Mass</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">42%</span>
                    </div>
                    <ProgressBar
                      progress={70}
                      color="#f59e0b"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-6 rounded-xl glass">
                <h3 className="text-lg font-medium mb-2 dark:text-white">Fitness Stats</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Weekly average</p>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Daily Steps</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">8,246 steps</span>
                    </div>
                    <ProgressBar
                      progress={82}
                      color="#3b82f6"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Water Intake</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">2.1L / 2.3L</span>
                    </div>
                    <ProgressBar
                      progress={91}
                      color="#0ea5e9"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Sleep</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">7.3h / 8h</span>
                    </div>
                    <ProgressBar
                      progress={91}
                      color="#8b5cf6"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium dark:text-white">Calories</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">1,843 / 2,100</span>
                    </div>
                    <ProgressBar
                      progress={88}
                      color="#ef4444"
                      height={6}
                      variant="gradient"
                      rounded
                      animated
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Monthly Progress</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium dark:text-white">Active Days</span>
                    <span className="text-green-600 dark:text-green-400">24/30</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded-sm ${
                          i < 24 ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium dark:text-white">Water Goal</span>
                    <span className="text-blue-600 dark:text-blue-400">28/30</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded-sm ${
                          i < 28 ? "bg-blue-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium dark:text-white">Step Goal</span>
                    <span className="text-purple-600 dark:text-purple-400">21/30</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 30 }).map((_, i) => (
                      <div
                        key={i}
                        className={`h-4 rounded-sm ${
                          i < 21 ? "bg-purple-500" : "bg-gray-200 dark:bg-gray-700"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm">
                  View Detailed Stats
                </Button>
              </div>
            </div>
          </motion.div>
        );
        
      case "achievements":
        return (
          <motion.div
            key="achievements"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-xl glass">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 text-white text-2xl mb-3">
                    🏆
                  </div>
                  <h3 className="text-xl font-bold mb-1 dark:text-white">14</h3>
                  <p className="text-gray-600 dark:text-gray-400">Total Achievements</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-6 rounded-xl glass">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 text-white text-2xl mb-3">
                    ⭐
                  </div>
                  <h3 className="text-xl font-bold mb-1 dark:text-white">245</h3>
                  <p className="text-gray-600 dark:text-gray-400">Total Points</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 p-6 rounded-xl glass">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-br from-yellow-500 to-amber-600 text-white text-2xl mb-3">
                    🔥
                  </div>
                  <h3 className="text-xl font-bold mb-1 dark:text-white">62</h3>
                  <p className="text-gray-600 dark:text-gray-400">Day Streak</p>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 dark:text-white">Latest Achievements</h3>
              
              <div className="space-y-4">
                {achievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex items-center">
                      <div className={`h-12 w-12 rounded-lg flex items-center justify-center text-2xl mr-4 ${
                        achievement.completed
                          ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                      }`}>
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium dark:text-white">{achievement.name}</h4>
                          <span className={achievement.completed ? "text-green-600 dark:text-green-400" : "text-gray-500 dark:text-gray-400"}>
                            {achievement.completed ? "Completed" : `${achievement.progress}%`}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{achievement.description}</p>
                        <div className="mt-2">
                          <ProgressBar
                            progress={achievement.progress}
                            color={achievement.completed ? "#10b981" : "#6b7280"}
                            height={4}
                            variant={achievement.completed ? "gradient" : "default"}
                            rounded
                            animated
                          />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <div className="mt-4 text-center">
                <Button variant="primary" size="sm">
                  View All Achievements
                </Button>
              </div>
            </div>
          </motion.div>
        );
        
      case "settings":
        return (
          <motion.div
            key="settings"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Account Settings</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="font-medium dark:text-white">Email Notifications</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Receive email updates about your account</p>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-green-500 transition-colors focus:outline-none"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="font-medium dark:text-white">Two-Factor Authentication</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300 dark:bg-gray-600 transition-colors focus:outline-none"
                  >
                    <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-1" />
                  </button>
                </div>
                
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                  <div>
                    <h4 className="font-medium dark:text-white">Data Privacy</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Manage how your data is used and shared</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                
                <div className="flex justify-between items-center py-3">
                  <div>
                    <h4 className="font-medium dark:text-white">Delete Account</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700">
              <h3 className="text-lg font-medium mb-4 dark:text-white">Connected Apps</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">Fitbit</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Connected • Last synced 2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="text" size="sm">
                    Disconnect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">Google Fit</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Connected • Last synced 1 day ago</p>
                    </div>
                  </div>
                  <Button variant="text" size="sm">
                    Disconnect
                  </Button>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-400 mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium dark:text-white">Connect Another App</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Add more data sources</p>
                    </div>
                  </div>
                  <Button variant="primary" size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      default:
        return null;
    }
  };
  
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="max-w-4xl w-full overflow-hidden">
        {/* Header with gradient */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-indigo-600 opacity-90"></div>
          <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
          <div className="relative px-6 py-5 flex justify-between items-center z-10">
            <h2 className="text-2xl font-bold text-white font-poppins">Profile</h2>
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
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 px-6">
          {(["overview", "stats", "achievements", "settings"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-4 px-4 text-sm font-medium transition-colors capitalize ${
                activeTab === tab
                  ? "border-b-2 border-purple-500 text-purple-600 dark:text-purple-400"
                  : "border-b-2 border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Content area */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {renderTabContent()}
          </AnimatePresence>
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;