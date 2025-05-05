// src/components/modals/SettingsModal.tsx
"use client";

import React from "react";
import Modal from "./Modal";
import Button from "../ui/Button";
import { useTheme } from "../../context/ThemeContext";

type SettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    const { darkMode, toggleDarkMode } = useTheme();
    const [notifications, setNotifications] = React.useState(true);
    const [weeklyReports, setWeeklyReports] = React.useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Settings</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Dark Mode</span>
                        <button
                            onClick={toggleDarkMode}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${darkMode ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${darkMode ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Notifications</span>
                        <button
                            onClick={() => setNotifications(!notifications)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${notifications ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Weekly Reports</span>
                        <button
                            onClick={() => setWeeklyReports(!weeklyReports)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${weeklyReports ? "bg-green-500" : "bg-gray-300"
                                }`}
                        >
                            <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${weeklyReports ? "translate-x-6" : "translate-x-1"
                                    }`}
                            />
                        </button>
                    </div>
                    <div className="pt-4">
                        <Button onClick={onClose} fullWidth>
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default SettingsModal;