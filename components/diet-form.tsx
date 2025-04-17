'use client';

import { useState } from "react";
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react";

interface BmiDetails {
    bmi?: number
    idealWeight?: string
    message?: string
}

interface mealItem {
    foodItem: string,
    quantity: string
}

interface DietDetails {
    breakfast?: [mealItem]
    lunch?: [mealItem]
    evening?: [mealItem]
    dinner?: [mealItem]
}

export default function DietForm() {
    const { getDiet } = useAuth();
    const [goal, setGoal] = useState("");
    const [activityLevel, setActivityLevel] = useState("");
    const [dietPreference, setDietPreference] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [dietPlan, setDietPlan] = useState<DietDetails | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        if (!goal || !activityLevel || !dietPreference) {
            alert("Please fill in all fields.");
            return;
        }
        try {
            const details = await getDiet(goal, activityLevel, dietPreference);
            console.log("details", details)
            setDietPlan(details)
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false)
        }
    };

    return (dietPlan ?
        <div className="relative">
            <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-semibold text-red-600">Your Diet Plan</h2>
                <button
                    onClick={() => setDietPlan(null)}
                    className="p-2 rounded-full hover:bg-gray-200 transition"
                >
                    <RefreshCw className="h-5 w-5 text-gray-600" />
                </button>
            </div>
            {Object.entries(dietPlan).map(([mealType, items]) => (
                <div key={mealType} className="mb-8">
                    <h2 className="text-xl font-bold text-red-600 capitalize mb-4">{mealType.replace(/([A-Z])/g, ' $1')}</h2>
                    <div className="space-y-4">

                        {items.map((item: any, index: number) => (
                            <div key={index} className="border p-4 rounded-lg shadow-sm">
                                <h1 className="text-xl font-bold text-red-600 capitalize mb-4"> Option {index + 1} </h1>
                                <p className="text-lg font-semibold">{item.foodItem}</p>
                                <p>Calories: {item.calories} kcal</p>
                                <p>Weight: {item.weight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div> :
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="goal">Goal</Label>
                    <select
                        id="goal"
                        value={goal}
                        onChange={(e) => setGoal(e.target.value)}
                        className="w-full border border-input bg-background text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="">Select goal</option>
                        <option>Weight Loss</option>
                        <option>Muscle Gain</option>
                        <option>Maintenance</option>
                        <option>Improving Endurance</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gender">Activity Level</Label>
                    <select
                        id="activityLevel"
                        value={activityLevel}
                        onChange={(e) => setActivityLevel(e.target.value)}
                        className="w-full border border-input bg-background text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="">Select activity level</option>
                        <option>Sedentary(No Workout)</option>
                        <option>Lightly Active (1-2 days Workout)</option>
                        <option>Intermediat (3-4 days Workout)</option>
                        <option>Very Active (5-6 days Workout)</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="dietPreference">Diet Preferences</Label>
                    <select
                        id="dietPreference"
                        value={dietPreference}
                        onChange={(e) => setDietPreference(e.target.value)}
                        className="w-full border border-input bg-background text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="">Select preference</option>
                        <option>Normal</option>
                        <option>Vegetarian</option>
                        <option>Vegan</option>
                        <option>Keto / Low-Carb</option>
                        <option>Carnivour</option>
                        <option>Intermittent Fasting</option>
                    </select>

                </div>
            </div>
            <div className="flex justify-center">
                <Button type="submit" className="w-1/5 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Get Diet Plan"}
                </Button>
            </div>
        </form>

    );
}
