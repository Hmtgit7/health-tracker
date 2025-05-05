// src/components/modals/ProfileModal.tsx
"use client";

import React from "react";
import Modal from "./Modal";
import Button from "../ui/Button";
import { userData } from "../../data/user";

type ProfileModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-md w-full">
                <div className="flex flex-col items-center mb-6">
                    <div className="h-24 w-24 rounded-full overflow-hidden mb-4 border-4 border-green-500">
                        <img
                            src={userData.avatar}
                            alt={userData.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <h2 className="text-xl font-bold text-center dark:text-white">{userData.name}</h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Premium Member</p>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="dark:text-white">Weight</span>
                        <span className="font-medium dark:text-white">{userData.weight} kg</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="dark:text-white">Height</span>
                        <span className="font-medium dark:text-white">{userData.height} cm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="dark:text-white">BMI</span>
                        <span className="font-medium dark:text-white">{userData.bmi}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                        <span className="dark:text-white">Daily Target</span>
                        <span className="font-medium dark:text-white">{userData.targetCalories} kcal</span>
                    </div>
                </div>

                <div className="pt-2">
                    <Button onClick={onClose} fullWidth>
                        Close
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ProfileModal;