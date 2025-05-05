"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import Card from "../ui/Card";
import { useTheme } from "../../context/ThemeContext";
import { useHabits } from "../../context/HabitContext";

const ActivityAnalytics: React.FC = () => {
  const { habits } = useHabits();
  const { darkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "week" | "month" | "year">("week");
  
  // Sample data for step activity
  const stepActivityData = [
    { day: "Mon", steps: 9100, calories: 380 },
    { day: "Tue", steps: 8700, calories: 360 },
    { day: "Wed", steps: 12000, calories: 520 },
    { day: "Thu", steps: 7400, calories: 310 },
    { day: "Fri", steps: 9300, calories: 390 },
    { day: "Sat", steps: 10100, calories: 420 },
    { day: "Sun", steps: 8231, calories: 340 },
  ];
  
  // Sample data for workout types
  const workoutTypeData = [
    { name: "Running", value: 35, color: "#f87171" },
    { name: "Strength", value: 25, color: "#60a5fa" },
    { name: "Cycling", value: 20, color: "#4ade80" },
    { name: "Yoga", value: 15, color: "#a78bfa" },
    { name: "Other", value: 5, color: "#fbbf24" },
  ];
  
  // Sample workout history data
  const workoutHistoryData = [
    { id: 1, type: "Running", duration: "45 min", caloriesBurned: 420, date: "Today, 8:30 AM", icon: "🏃‍♂️" },
    { id: 2, type: "Yoga", duration: "30 min", caloriesBurned: 180, date: "Yesterday, 7:00 PM", icon: "🧘‍♀️" },
    { id: 3, type: "Strength", duration: "60 min", caloriesBurned: 350, date: "May 3, 6:15 PM", icon: "🏋️‍♀️" },
    { id: 4, type: "Cycling", duration: "50 min", caloriesBurned: 380, date: "May 2, 5:30 PM", icon: "🚴‍♂️" },
  ];
  
  // Sample heart rate zones data
  const heartRateZonesData = [
    { name: "Rest (60-70 bpm)", minutes: 1080, color: "#a78bfa" },
    { name: "Fat Burn (71-100 bpm)", minutes: 280, color: "#4ade80" },
    { name: "Cardio (101-140 bpm)", minutes: 65, color: "#fbbf24" },
    { name: "Peak (141+ bpm)", minutes: 15, color: "#f87171" },
  ];
  
  // Weekly stats
  const weeklyStats = {
    totalSteps: 64831,
    totalCaloriesBurned: 2720,
    activeMinutes: 360,
    distance: 51.2,
    averageHeartRate: 72,
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Activity Dashboard</h1>
        <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex shadow-sm border border-gray-200 dark:border-gray-700">
          {["day", "week", "month", "year"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedPeriod === period
                  ? "bg-green-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Total Steps</span>
              <h3 className="text-2xl font-bold dark:text-white">{weeklyStats.totalSteps.toLocaleString()}</h3>
            </div>
            <div className="h-10 w-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
              <span className="text-xl">👣</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              ↑ 12% vs last week
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Calories Burned</span>
              <h3 className="text-2xl font-bold dark:text-white">{weeklyStats.totalCaloriesBurned.toLocaleString()}</h3>
            </div>
            <div className="h-10 w-10 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-xl">🔥</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
              ↑ 8% vs last week
            </span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <span className="text-xs text-gray-500 dark:text-gray-400">Active Minutes</span>
              <h3 className="text-2xl font-bold dark:text-white">{weeklyStats.activeMinutes}</h3>
            </div>
            <div className="h-10 w-10 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
              <span className="text-xl">⏱️</span>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-xs text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-1 rounded-full">
              ↓ 3% vs last week
            </span>
          </div>
        </motion.div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="md:col-span-2">
          <Card className="h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Step Activity</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Target: 10,000 steps/day</div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={stepActivityData}
                  margin={{ top: 5, right: 5, bottom: 5, left: 5 }}
                >
                  <defs>
                    <linearGradient id="stepGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid 
                    strokeDasharray="3 3" 
                    vertical={false} 
                    stroke={darkMode ? "#374151" : "#e5e7eb"} 
                  />
                  <XAxis 
                    dataKey="day" 
                    tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                  />
                  <YAxis 
                    tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: darkMode ? "#1f2937" : "white", 
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "white" : "black" 
                    }}
                    itemStyle={{
                      color: darkMode ? "#d1d5db" : "#4b5563",
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="steps" 
                    stroke="#10b981" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#stepGradient)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div>
          <Card className="h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Workout Types</h3>
              <div className="text-xs text-gray-500 dark:text-gray-400">This Week</div>
            </div>
            
            <div className="h-64 flex flex-col">
              <div className="flex-1">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={workoutTypeData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {workoutTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: darkMode ? "#1f2937" : "white", 
                        borderColor: darkMode ? "#374151" : "#e5e7eb",
                        color: darkMode ? "white" : "black" 
                      }}
                      formatter={(value) => [`${value}%`, "Percentage"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-2 gap-2 mt-2">
                {workoutTypeData.map((type) => (
                  <div key={type.name} className="flex items-center">
                    <div
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-300">
                      {type.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7">
          <Card>
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Recent Workouts</h3>
            <div className="space-y-4">
              {workoutHistoryData.map((workout) => (
                <motion.div
                  key={workout.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.01 }}
                  className="flex items-center p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg cursor-pointer"
                >
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl mr-4">
                    {workout.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium dark:text-white">{workout.type}</h4>
                    <div className="flex text-sm text-gray-500 dark:text-gray-400 space-x-4">
                      <span>{workout.duration}</span>
                      <span>{workout.caloriesBurned} kcal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">{workout.date}</span>
                    <button className="block text-green-600 dark:text-green-400 text-sm hover:underline mt-1">
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-green-600 dark:text-green-400 hover:underline">
                View All Workouts
              </button>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-5">
          <Card className="h-full">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Heart Rate Zones</h3>
            <div className="space-y-4">
              {heartRateZonesData.map((zone) => (
                <div key={zone.name} className="space-y-1">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium dark:text-white">{zone.name}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {Math.floor(zone.minutes / 60)}h {zone.minutes % 60}m
                    </span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ 
                        width: `${(zone.minutes / (24 * 60)) * 100}%`, 
                        backgroundColor: zone.color 
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2 dark:text-white">Today's Summary</h4>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Resting Heart Rate</span>
                  <span className="font-medium dark:text-white">68 bpm</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Highest Heart Rate</span>
                  <span className="font-medium dark:text-white">142 bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Average Heart Rate</span>
                  <span className="font-medium dark:text-white">72 bpm</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="mt-6">
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Weekly Overview</h3>
            <button className="text-sm text-green-600 dark:text-green-400 hover:underline">
              Download Report
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">👣</span>
              </div>
              <h4 className="text-lg font-bold dark:text-white">
                {weeklyStats.totalSteps.toLocaleString()}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Total Steps</p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🔥</span>
              </div>
              <h4 className="text-lg font-bold dark:text-white">
                {weeklyStats.totalCaloriesBurned.toLocaleString()}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Calories Burned</p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">⏱️</span>
              </div>
              <h4 className="text-lg font-bold dark:text-white">
                {weeklyStats.activeMinutes}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Active Minutes</p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">🗺️</span>
              </div>
              <h4 className="text-lg font-bold dark:text-white">
                {weeklyStats.distance}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Distance (km)</p>
            </div>
            
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
              <div className="h-10 w-10 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mx-auto mb-2">
                <span className="text-lg">❤️</span>
              </div>
              <h4 className="text-lg font-bold dark:text-white">
                {weeklyStats.averageHeartRate}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400">Avg Heart Rate</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivityAnalytics;