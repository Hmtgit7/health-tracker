// src/components/dashboard/MealCard.tsx
"use client";

import React from "react";
import Card from "../ui/Card";
import { Meal } from "../../types";

type MealCardProps = {
    meal: Meal;
    onClick: () => void;
};

const MealCard: React.FC<MealCardProps> = ({ meal, onClick }) => {
    return (
        <Card className="mb-4" onClick={onClick} interactive>
            <div className="flex items-center">
                <div className="h-14 w-14 rounded-full overflow-hidden mr-3">
                    <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-full w-full object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex justify-between">
                        <div>
                            <h3 className="font-medium dark:text-white">{meal.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{meal.time}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-bold text-green-600 dark:text-green-400">{meal.calories} kcal</p>
                            <div className="flex justify-end text-xs text-gray-500 dark:text-gray-400 space-x-1">
                                <span>{meal.protein}g</span>
                                <span>•</span>
                                <span>{meal.carbs}g</span>
                                <span>•</span>
                                <span>{meal.fat}g</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default MealCard;