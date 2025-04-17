"use client"

import { Dumbbell } from "lucide-react"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"
import BmiForm from "@/components/bmi-form"
import DietForm from "@/components/diet-form"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Transform Your Body, Transform Your Life
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl">
                  Join our state-of-the-art fitness program and start your journey to a healthier, stronger you. Expert
                  trainers, premium equipment, and a supportive community await.
                </p>
              </div>
              <div className="mx-auto lg:ml-auto">
                <img
                  alt="Gym Equipment"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                  height="550"
                  src="/gym.jpg?height=550&width=550"
                  width="550"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Curious about your obesity risk?</h2>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-3xl">Find out here.</h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-1 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <Dumbbell className="h-6 w-6" />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-red-600 mt-2">Check Your BMI Details</h1>
                  </div>
                </div>
                <div className="space-y-2">
                  {/* <p className="text-gray-500">Share us your details to calculate.</p> */}
                  <BmiForm />
                </div>
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-red-600 mt-2">Get Diet Plan</h1>
                  </div>
                </div>
                <div className="space-y-2">
                  {/* <p className="text-gray-500">Let us know your goals</p> */}
                  <DietForm />

                </div>
              </div>

            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-red-600 text-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Ready to Transform?</h2>
                <p className="mx-auto max-w-[700px] md:text-xl">
                  Join our community today and start your fitness journey. The first step is always the hardest, but
                  we're here to help.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
