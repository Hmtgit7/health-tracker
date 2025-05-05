"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import Button from "../ui/Button";

type AddNewModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (type: string, data: any) => void;
};

const AddNewModal: React.FC<AddNewModalProps> = ({ isOpen, onClose, onAddItem }) => {
  const [activeTab, setActiveTab] = useState<"habit" | "meal" | "activity" | "note">("habit");

  // Animation variants for tab switching
  const tabVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } }
  };

  // Icons for different item types
  const itemIcons = {
    habit: ["🏃‍♂️", "💧", "📚", "🧘", "💤", "💊", "🥗", "🎯", "🚭", "📱"],
    meal: ["🍳", "🥗", "🍲", "🥪", "🍕", "🍝", "🍱", "🥤", "🍇", "🥑"],
    activity: ["🚶‍♂️", "🏋️‍♀️", "🚴‍♀️", "🧘‍♀️", "🏊‍♀️", "⚽", "🎾", "🏄‍♀️", "🧗‍♀️", "🤸‍♀️"],
    note: ["📝", "📌", "🗒️", "📊", "📈", "🔔", "⚠️", "✅", "❓", "💭"]
  };

  // Form states
  const [formData, setFormData] = useState({
    habit: {
      name: "",
      icon: "🏃‍♂️",
      target: "10",
      unit: "minutes",
      color: "#10b981"
    },
    meal: {
      name: "",
      time: "",
      calories: "0",
      protein: "0",
      carbs: "0",
      fat: "0"
    },
    activity: {
      type: "",
      duration: "30",
      caloriesBurned: "150"
    },
    note: {
      title: "",
      content: "",
      color: "#f3f4f6"
    }
  });

  // Handle form data change
  const handleChange = (
    tab: "habit" | "meal" | "activity" | "note",
    field: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      [tab]: {
        ...formData[tab],
        [field]: value
      }
    });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddItem(activeTab, formData[activeTab]);
    onClose();
  };

  // Render different forms based on active tab
  const renderForm = () => {
    switch (activeTab) {
      case "habit":
        return (
          <motion.div
            key="habit-form"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Habit Name
                </label>
                <input
                  type="text"
                  value={formData.habit.name}
                  onChange={(e) => handleChange("habit", "name", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., Daily Exercise"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {itemIcons.habit.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => handleChange("habit", "icon", icon)}
                      className={`h-10 w-10 flex items-center justify-center text-xl rounded-lg transition-colors ${
                        formData.habit.icon === icon
                          ? "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Target
                  </label>
                  <input
                    type="number"
                    value={formData.habit.target}
                    onChange={(e) => handleChange("habit", "target", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g., 10"
                    min="1"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Unit
                  </label>
                  <input
                    type="text"
                    value={formData.habit.unit}
                    onChange={(e) => handleChange("habit", "unit", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="e.g., minutes"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Color
                </label>
                <input
                  type="color"
                  value={formData.habit.color}
                  onChange={(e) => handleChange("habit", "color", e.target.value)}
                  className="w-full h-10 border rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </motion.div>
        );
        
      case "meal":
        return (
          <motion.div
            key="meal-form"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Meal Name
                </label>
                <input
                  type="text"
                  value={formData.meal.name}
                  onChange={(e) => handleChange("meal", "name", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., Breakfast"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.meal.time}
                  onChange={(e) => handleChange("meal", "time", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Calories
                </label>
                <input
                  type="number"
                  value={formData.meal.calories}
                  onChange={(e) => handleChange("meal", "calories", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., 500"
                  min="0"
                  required
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Protein (g)
                  </label>
                  <input
                    type="number"
                    value={formData.meal.protein}
                    onChange={(e) => handleChange("meal", "protein", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Carbs (g)
                  </label>
                  <input
                    type="number"
                    value={formData.meal.carbs}
                    onChange={(e) => handleChange("meal", "carbs", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 dark:text-white">
                    Fat (g)
                  </label>
                  <input
                    type="number"
                    value={formData.meal.fat}
                    onChange={(e) => handleChange("meal", "fat", e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case "activity":
        return (
          <motion.div
            key="activity-form"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Activity Type
                </label>
                <select
                  value={formData.activity.type}
                  onChange={(e) => handleChange("activity", "type", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                >
                  <option value="">Select an activity</option>
                  <option value="Walking">Walking</option>
                  <option value="Running">Running</option>
                  <option value="Cycling">Cycling</option>
                  <option value="Swimming">Swimming</option>
                  <option value="Yoga">Yoga</option>
                  <option value="Strength Training">Strength Training</option>
                  <option value="HIIT">HIIT</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  value={formData.activity.duration}
                  onChange={(e) => handleChange("activity", "duration", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., 30"
                  min="1"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Calories Burned
                </label>
                <input
                  type="number"value={formData.activity.caloriesBurned}
                  onChange={(e) => handleChange("activity", "caloriesBurned", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., 150"
                  min="0"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Choose Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {itemIcons.activity.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className="h-10 w-10 flex items-center justify-center text-xl rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
        
      case "note":
        return (
          <motion.div
            key="note-form"
            variants={tabVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.note.title}
                  onChange={(e) => handleChange("note", "title", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g., Fitness Goals"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Content
                </label>
                <textarea
                  value={formData.note.content}
                  onChange={(e) => handleChange("note", "content", e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white min-h-[100px]"
                  placeholder="Write your note here..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Color
                </label>
                <div className="flex space-x-2">
                  {["#f3f4f6", "#fee2e2", "#fef3c7", "#d1fae5", "#dbeafe", "#e0e7ff"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => handleChange("note", "color", color)}
                      className={`h-8 w-8 rounded-full border-2 ${
                        formData.note.color === color
                          ? "border-gray-800 dark:border-white"
                          : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1 dark:text-white">
                  Choose Icon
                </label>
                <div className="grid grid-cols-5 gap-2">
                  {itemIcons.note.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      className="h-10 w-10 flex items-center justify-center text-xl rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      {icon}
                    </button>
                  ))}
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
      <div className="p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Item</h2>
        
        {/* Tab navigation */}
        <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
          {(["habit", "meal", "activity", "note"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-4 text-sm font-medium border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-green-500 text-green-600 dark:text-green-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        {/* Form container */}
        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {renderForm()}
          </AnimatePresence>
          
          <div className="flex space-x-3 mt-6">
            <Button
              variant="secondary"
              onClick={onClose}
              fullWidth
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              fullWidth
              animation="scale"
            >
              Add Item
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddNewModal;