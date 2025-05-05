"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

const SleepTracker: React.FC = () => {
  const { darkMode } = useTheme();
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month">("week");
  
  // Sample sleep data
  const sleepData = [
    { date: "May 1", deep: 1.5, light: 4.8, rem: 1.2, awake: 0.5, quality: 82 },
    { date: "May 2", deep: 2.0, light: 4.5, rem: 1.5, awake: 0.3, quality: 88 },
    { date: "May 3", deep: 1.7, light: 4.0, rem: 1.1, awake: 0.8, quality: 75 },
    { date: "May 4", deep: 1.9, light: 4.2, rem: 1.4, awake: 0.4, quality: 85 },
    { date: "May 5", deep: 1.4, light: 3.8, rem: 1.0, awake: 1.0, quality: 70 },
    { date: "May 6", deep: 2.1, light: 4.6, rem: 1.5, awake: 0.3, quality: 90 },
    { date: "May 7", deep: 1.8, light: 4.3, rem: 1.3, awake: 0.6, quality: 80 },
  ];
  
  // Sleep insights
  const sleepInsights = [
    {
      title: "Optimal Sleep Duration",
      description: "Your sleep quality is highest when you sleep between 7-8 hours. Try maintaining this sleep duration.",
      icon: "⏱️",
    },
    {
      title: "Consistent Sleep Schedule",
      description: "Going to bed around 10:30 PM has given you the best sleep quality over the past month.",
      icon: "🌙",
    },
    {
      title: "Deep Sleep Improvement",
      description: "Your deep sleep has increased by 15% this week. Keep up the good work!",
      icon: "📈",
    },
  ];
  
  // Sleep scores
  const sleepScores = {
    duration: 82,
    quality: 75,
    regularity: 88,
    disturbances: 65,
  };
  
  // Last night's sleep summary
  const lastNightSleep = {
    total: "7.2h",
    bedtime: "10:45 PM",
    wakeup: "6:00 AM",
    deep: "1.8h",
    light: "4.3h",
    rem: "1.1h",
    awake: "0.5h",
    quality: 80,
  };
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Sleep Insights</h1>
        <div className="bg-white dark:bg-gray-800 rounded-full p-1 flex shadow-sm border border-gray-200 dark:border-gray-700">
          {["week", "month"].map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period as any)}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                selectedPeriod === period
                  ? "bg-purple-500 text-white"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              {period.charAt(0).toUpperCase() + period.slice(1)}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-6">
        <div className="md:col-span-8">
          <Card className="h-80">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold dark:text-white">Sleep Duration & Quality</h3>
              <div className="text-sm text-gray-500 dark:text-gray-400">Last 7 Days</div>
            </div>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={sleepData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  barGap={0}
                  barCategoryGap="10%"
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={darkMode ? "#374151" : "#e5e7eb"} />
                  <XAxis dataKey="date" tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }} />
                  <YAxis yAxisId="left" orientation="left" tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }} />
                  <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fill: darkMode ? "#9ca3af" : "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: darkMode ? "#1f2937" : "white",
                      borderColor: darkMode ? "#374151" : "#e5e7eb",
                      color: darkMode ? "white" : "black",
                    }}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="deep" name="Deep Sleep" stackId="a" fill="#8b5cf6" />
                  <Bar yAxisId="left" dataKey="light" name="Light Sleep" stackId="a" fill="#a78bfa" />
                  <Bar yAxisId="left" dataKey="rem" name="REM Sleep" stackId="a" fill="#c4b5fd" />
                  <Bar yAxisId="left" dataKey="awake" name="Awake" stackId="a" fill="#e5e7eb" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="quality"
                    name="Sleep Quality"
                    stroke="#f87171"
                    strokeWidth={2}
                    dot={{ r: 4, strokeWidth: 2, fill: darkMode ? "#1f2937" : "white" }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
        
        <div className="md:col-span-4">
          <Card className="h-80">
            <h3 className="text-lg font-semibold mb-4 dark:text-white">Last Night's Sleep</h3>
            
            <div className="flex justify-center mb-4">
              <div className="relative w-32 h-32">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="10"
                    stroke={darkMode ? "#374151" : "#e5e7eb"}
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    strokeWidth="10"
                    stroke="#8b5cf6"
                    strokeDasharray={`${lastNightSleep.quality * 2.83} 283`}
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <text
                    x="50"
                    y="45"
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="bold"
                    fill={darkMode ? "white" : "black"}
                  >
                    {lastNightSleep.quality}
                  </text>
                  <text
                    x="50"
                    y="65"
                    textAnchor="middle"
                    fontSize="12"
                    fill={darkMode ? "#9ca3af" : "#6b7280"}
                  >
                    Quality
                  </text>
                </svg>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Total Sleep:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Bedtime:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.bedtime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Wake Up:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.wakeup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Deep Sleep:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.deep}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">Light Sleep:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.light}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">REM Sleep:</span>
                <span className="font-medium dark:text-white">{lastNightSleep.rem}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sleep Insights</h3>
          <div className="space-y-4">
            {sleepInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
              >
                <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-xl mr-3">
                  {insight.icon}
                </div>
                <div>
                  <h4 className="font-medium dark:text-white">{insight.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {insight.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        
        <Card>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Sleep Scores</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium dark:text-white">Duration</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{sleepScores.duration}/100</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 rounded-full bg-purple-500"
                  style={{ width: `${sleepScores.duration}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium dark:text-white">Quality</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{sleepScores.quality}/100</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 rounded-full bg-blue-500"
                  style={{ width: `${sleepScores.quality}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium dark:text-white">Regularity</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{sleepScores.regularity}/100</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 rounded-full bg-green-500"
                  style={{ width: `${sleepScores.regularity}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium dark:text-white">Disturbances</span>
                <span className="text-sm text-gray-600 dark:text-gray-300">{sleepScores.disturbances}/100</span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                <div
                  className="h-2 rounded-full bg-red-500"
                  style={{ width: `${sleepScores.disturbances}%` }}
                ></div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-3 dark:text-white">Tips to Improve Sleep</h4>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start">
                <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                <span>Try to go to bed and wake up at the same time every day.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                <span>Reduce blue light exposure 1-2 hours before bedtime.</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                <span>Keep your bedroom cool, around 65-68°F (18-20°C).</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-500 dark:text-purple-400 mr-2">•</span>
                <span>Avoid caffeine and alcohol close to bedtime.</span>
              </li>
            </ul>
          </div>
          
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              Get Personalized Sleep Plan
            </Button>
          </div>
        </Card>
      </div>
      
      <div>
        <Card>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold dark:text-white">Sleep Schedule</h3>
            <Button variant="primary" size="sm">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Set Sleep Goal
              </span>
            </Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Day
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Bedtime
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Wake Up
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Quality
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                {sleepData.map((day, index) => (
                  <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                      {day.date}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      10:45 PM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      6:00 AM
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {(day.deep + day.light + day.rem + day.awake).toFixed(1)}h
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-2 w-24 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${day.quality}%`,
                              backgroundColor: 
                                day.quality >= 85 ? "#10b981" :
                                day.quality >= 70 ? "#f59e0b" : "#ef4444",
                            }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                          {day.quality}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <Button variant="text" size="sm">
              <span className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Previous
              </span>
            </Button>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              May 1 - May 7, 2025
            </span>
            <Button variant="text" size="sm">
              <span className="flex items-center">
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </span>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SleepTracker;