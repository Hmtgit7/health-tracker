"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotifications, Notification } from "../../context/NotificationContext";

const NotificationPanel: React.FC<{
  isOpen: boolean;
  onClose: () => void;
}> = ({ isOpen, onClose }) => {
  const { 
    notifications, 
    markAsRead, 
    markAllAsRead, 
    deleteNotification, 
    clearAllNotifications 
  } = useNotifications();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((notif) =>
    filter === "unread" ? !notif.isRead : true
  );

  const typeColors = {
    success: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
    info: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
    alert: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
  };

  const NotificationCard = ({ notification }: { notification: Notification }) => (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      layout
      className={`p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
        !notification.isRead ? "bg-blue-50 dark:bg-blue-900/20" : ""
      }`}
    >
      <div className="flex">
        <div className={`w-10 h-10 rounded-full ${typeColors[notification.type]} flex items-center justify-center mr-3 flex-shrink-0`}>
          <span className="text-xl">{notification.icon}</span>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h3 className="font-medium dark:text-white">
              {notification.title}
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
              {notification.time}
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
            {notification.message}
          </p>
          <div className="flex mt-2 justify-end space-x-2">
            <button
              onClick={() => markAsRead(notification.id)}
              className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
            >
              {notification.isRead ? "Mark Unread" : "Mark Read"}
            </button>
            <button
              onClick={() => deleteNotification(notification.id)}
              className="text-xs text-red-600 dark:text-red-400 hover:underline"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute right-0 top-16 w-80 md:w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl z-50 overflow-hidden"
        >
          <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
            <h2 className="text-lg font-semibold dark:text-white">Notifications</h2>
            <div className="flex space-x-2">
              <button
                onClick={() => setFilter(filter === "all" ? "unread" : "all")}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                {filter === "all" ? "Show Unread" : "Show All"}
              </button>
              <button
                onClick={markAllAsRead}
                className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
              >
                Mark All Read
              </button>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <AnimatePresence>
              {filteredNotifications.length > 0 ? (
                <motion.div layout>
                  {filteredNotifications.map((notification) => (
                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 text-center"
                >
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-500 dark:text-gray-400">
                    No {filter === "unread" ? "unread " : ""}notifications
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 flex justify-between">
            <button
              onClick={clearAllNotifications}
              className="text-sm text-red-600 dark:text-red-400 hover:underline"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationPanel;