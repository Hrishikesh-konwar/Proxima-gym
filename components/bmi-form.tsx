'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { RefreshCw } from 'lucide-react'; // <-- using lucide icons (you can also use heroicons if you want)

interface BmiDetails {
    bmi?: number
    idealWeight?: string
    message?: string
}

export default function BmiForm() {
    const { getBmi } = useAuth();
    const [weight, setWeight] = useState("");
    const [age, setAge] = useState("");
    const [height, setHeight] = useState("");
    const [gender, setGender] = useState("Male");
    const [isLoading, setIsLoading] = useState(false);
    const [bmiDetails, setBmiDetails] = useState<BmiDetails | null>(null);
    const [isClient, setIsClient] = useState(false);  // Client-side check

    useEffect(() => {
        setIsClient(true); // Ensures this runs only on the client side
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (!weight || !age || !height || !gender) {
                alert("Please fill in all fields.");
                return;
            }
            const details = await getBmi(Number(weight), Number(age), Number(height), gender);
            setBmiDetails(details)
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setIsLoading(false)
        }
    };

    if (!isClient) return null;

    return (bmiDetails ?
        <div className="relative">
            <div className="space-y-4 pt-6 transition-opacity duration-300 opacity-100">
                <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-semibold text-red-600">Your BMI Result</h2>
                    <button
                        onClick={() => setBmiDetails(null)}
                        className="p-2 rounded-full hover:bg-gray-200 transition"
                    >
                        <RefreshCw className="h-5 w-5 text-gray-600" />
                    </button>
                </div>

                {bmiDetails?.bmi && (
                    <div
                        className={`text-lg font-medium ${bmiDetails.bmi > 30
                                ? 'text-red-600'
                                : bmiDetails.bmi > 25
                                    ? 'text-yellow-500'
                                    : 'text-green-600'
                            }`}
                    >
                        BMI: {bmiDetails.bmi.toFixed(1)}
                    </div>
                )}
                {bmiDetails?.idealWeight && (
                    <div className="text-gray-700">
                        Ideal Weight Range: <strong>{bmiDetails.idealWeight}</strong>
                    </div>
                )}
                {bmiDetails?.message && (
                    <div className="text-sm text-gray-500">{bmiDetails.message}</div>
                )}
            </div>
        </div> :
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="gender">Gender</Label>
                    <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full border border-input bg-background text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ring"
                        required
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="age">Age</Label>
                    <Input
                        id="age"
                        type="text"  // Change this to 'text' or 'number' depending on input type
                        placeholder="25"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input
                        id="weight"
                        type="text"  // Change this to 'text' or 'number'
                        placeholder="70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input
                        id="height"
                        type="text"  // Change this to 'text' or 'number'
                        placeholder="175"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <Button type="submit" className="w-1/5 bg-red-600 hover:bg-red-700" disabled={isLoading}>
                    {isLoading ? "Logging in..." : "Check BMI Data"}
                </Button>
            </div>
        </form>
    );
}
