// src/components/meals/MealDetail.tsx
"use client";

import React from "react";
import Modal from "../modals/Modal";
import Button from "../ui/Button";
import { useMeals } from "../../context/MealContext";

type MealDetailProps = {
    isOpen: boolean;
    onClose: () => void;
};

const MealDetail: React.FC<MealDetailProps> = ({ isOpen, onClose }) => {
    const { selectedMeal } = useMeals();

    if (!selectedMeal) return null;

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-md w-full">
                <div className="flex items-center mb-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                        <img
                            src={selectedMeal.image}
                            alt={selectedMeal.name}
                            className="h-full w-full object-cover"
                        />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold dark:text-white">{selectedMeal.name}</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{selectedMeal.time}</p>
                    </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg mb-6">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium dark:text-white">Total Calories</span>
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                            {selectedMeal.calories} kcal
                        </span>
                    </div>
                </div>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Protein</span>
                        <div className="flex items-center">
                            <span className="mr-2 dark:text-white">{selectedMeal.protein}g</span>
                            <div className="h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className="h-2 rounded-full bg-blue-500"
                                    style={{ width: `${(selectedMeal.protein / 50) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Carbs</span>
                        <div className="flex items-center">
                            <span className="mr-2 dark:text-white">{selectedMeal.carbs}g</span>
                            <div className="h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className="h-2 rounded-full bg-yellow-500"
                                    style={{ width: `${(selectedMeal.carbs / 100) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="dark:text-white">Fat</span>
                        <div className="flex items-center">
                            <span className="mr-2 dark:text-white">{selectedMeal.fat}g</span>
                            <div className="h-2 w-24 bg-gray-200 rounded-full dark:bg-gray-700">
                                <div
                                    className="h-2 rounded-full bg-red-500"
                                    style={{ width: `${(selectedMeal.fat / 40) * 100}%` }}
                                ></div>
                            </div>
                        </div>
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

export default MealDetail;