// src/components/modals/AddHabitModal.tsx
"use client";

import React from "react";
import Modal from "./Modal";
import Button from "../ui/Button";
import { useHabits } from "../../context/HabitContext";

type AddHabitModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

const AddHabitModal: React.FC<AddHabitModalProps> = ({ isOpen, onClose }) => {
    const { addHabit } = useHabits();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem("name") as HTMLInputElement).value;
        const icon = (form.elements.namedItem("icon") as HTMLInputElement).value;
        const target = parseInt((form.elements.namedItem("target") as HTMLInputElement).value);
        const unit = (form.elements.namedItem("unit") as HTMLInputElement).value;
        const color = (form.elements.namedItem("color") as HTMLInputElement).value;

        addHabit({
            name,
            icon,
            target,
            unit,
            current: 0,
            color,
        });

        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="p-6 max-w-md w-full">
                <h2 className="text-xl font-bold mb-4 dark:text-white">Add New Habit</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">
                            Habit Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., Meditation"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">
                            Icon (Emoji)
                        </label>
                        <input
                            type="text"
                            name="icon"
                            required
                            className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            placeholder="e.g., 🧘"
                        />
                    </div>
                    <div className="flex space-x-4">
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 dark:text-white">
                                Target
                            </label>
                            <input
                                type="number"
                                name="target"
                                required
                                min="1"
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="e.g., 20"
                            />
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-1 dark:text-white">
                                Unit
                            </label>
                            <input
                                type="text"
                                name="unit"
                                required
                                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                placeholder="e.g., min"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 dark:text-white">
                            Color
                        </label>
                        <input
                            type="color"
                            name="color"
                            defaultValue="#10b981"
                            className="w-full h-10 border rounded-lg cursor-pointer"
                        />
                    </div>
                    <div className="pt-4 flex space-x-3">
                        <Button
                            variant="secondary"
                            onClick={onClose}
                            fullWidth
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            fullWidth
                        >
                            Add Habit
                        </Button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddHabitModal;