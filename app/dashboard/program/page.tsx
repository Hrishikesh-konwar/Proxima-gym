"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import BmiForm from "@/components/bmi-form"

const workoutPlans = [
  {
    id: "beginner",
    title: "Beginner Plan",
    description: "Perfect for those new to fitness",
    duration: "4 weeks",
    sessions: "3 sessions per week",
    focus: "Building foundational strength and endurance",
    workouts: [
      { day: "Monday", name: "Full Body Basics", duration: "30 min" },
      { day: "Wednesday", name: "Cardio Fundamentals", duration: "25 min" },
      { day: "Friday", name: "Flexibility & Core", duration: "30 min" },
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate Plan",
    description: "For those with some fitness experience",
    duration: "6 weeks",
    sessions: "4 sessions per week",
    focus: "Building muscle and improving cardiovascular health",
    workouts: [
      { day: "Monday", name: "Upper Body Focus", duration: "45 min" },
      { day: "Tuesday", name: "HIIT Cardio", duration: "30 min" },
      { day: "Thursday", name: "Lower Body Power", duration: "45 min" },
      { day: "Saturday", name: "Core & Mobility", duration: "40 min" },
    ],
  },
  {
    id: "advanced",
    title: "Advanced Plan",
    description: "Challenging program for fitness enthusiasts",
    duration: "8 weeks",
    sessions: "5 sessions per week",
    focus: "Muscle hypertrophy, strength, and athletic performance",
    workouts: [
      { day: "Monday", name: "Chest & Triceps", duration: "60 min" },
      { day: "Tuesday", name: "Back & Biceps", duration: "60 min" },
      { day: "Wednesday", name: "HIIT & Conditioning", duration: "45 min" },
      { day: "Thursday", name: "Legs & Shoulders", duration: "60 min" },
      { day: "Saturday", name: "Active Recovery & Core", duration: "45 min" },
    ],
  },
]

export default function TrainingPage() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null)
  // const [bmiDetails, setBmiDetails] = useState(null);

  // const handleSuccess = () => {
  //   setBmiDetails(bmiDetails)
  // }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Training Programs</h1>
        <p className="text-muted-foreground">Choose a training program that matches your fitness level and goals.</p>
      </div>

      <Tabs defaultValue="my-diet" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-diet">Diet</TabsTrigger>
          <TabsTrigger value="programs">Workout</TabsTrigger>
          {/* <TabsTrigger value="history">History</TabsTrigger> */}
        </TabsList>
        <TabsContent value="programs" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {workoutPlans.map((plan) => (
              <Card key={plan.id} className={selectedPlan === plan.id ? "ring-2 ring-red-600" : ""}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Duration:</span>
                      <span className="text-sm">{plan.duration}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Sessions:</span>
                      <span className="text-sm">{plan.sessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Focus:</span>
                      <span className="text-sm">{plan.focus}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-red-600 hover:bg-red-700" onClick={() => setSelectedPlan(plan.id)}>
                    {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {selectedPlan && (
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>{workoutPlans.find((p) => p.id === selectedPlan)?.title} - Weekly Schedule</CardTitle>
                <CardDescription>Your weekly workout schedule based on the selected plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {workoutPlans
                    .find((p) => p.id === selectedPlan)
                    ?.workouts.map((workout, index) => (
                      <div key={index} className="flex items-center justify-between border-b pb-2">
                        <div>
                          <p className="font-medium">{workout.day}</p>
                          <p className="text-sm text-muted-foreground">{workout.name}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{workout.duration}</span>
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700">Start This Program</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="my-diet">
          <Card>
            <CardHeader>
              <CardTitle>Your BMI and Diet</CardTitle>
              <CardDescription>Share us your details</CardDescription>
            </CardHeader>
            <CardContent>
              <BmiForm/>
            </CardContent>
            {/* <CardFooter>
              <Button className="w-full">Create Custom Workout</Button>
            </CardFooter> */}
          </Card>
        </TabsContent>

        {/* <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Workout History</CardTitle>
              <CardDescription>Your recent workout sessions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center h-40 border rounded-md">
                <p className="text-muted-foreground">No workout history available</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent> */}
      </Tabs>
    </div>
  )
}
