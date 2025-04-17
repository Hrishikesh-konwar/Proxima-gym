"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { Checkbox } from "@/components/ui/checkbox"

interface SignupFormProps {
  onSuccess: () => void
}

export default function SignupForm({ onSuccess }: SignupFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isGymOwner, setIsGymOwner] = useState(true)
  const [gymName, setGymName] = useState("")
  const [gymAddress, setGymAddress] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const { signup } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    if (isGymOwner && (!gymName || !gymAddress)) {
      setError("Gym name and address are required")
      return
    }

    setIsLoading(true)

    try {
      if (isGymOwner) {
        await signup(name, email, password, { name: gymName, address: gymAddress })
      } else {
        await signup(name, email, password)
      }
      onSuccess()
    } catch (error) {
      console.error("Signup failed:", error)
      setError("Failed to create account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm-password">Confirm Password</Label>
        <Input
          id="confirm-password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is-gym-owner"
          checked={isGymOwner}
          onCheckedChange={(checked) => setIsGymOwner(checked as boolean)}
        />
        <Label htmlFor="is-gym-owner">I am a gym owner/trainer</Label>
      </div>
      <div className="space-y-4 pt-2 border-t">
        <h3 className="font-medium pt-2">Gym Information</h3>
        <div className="space-y-2">
          <Label htmlFor="gym-name">Gym Name</Label>
          <Input
            id="gym-name"
            placeholder="FitZone Gym"
            value={gymName}
            onChange={(e) => setGymName(e.target.value)}
            required={isGymOwner}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="gym-address">Gym Address</Label>
          <Input
            id="gym-address"
            placeholder="123 Fitness Street, Gym City"
            value={gymAddress}
            onChange={(e) => setGymAddress(e.target.value)}
            required={isGymOwner}
          />
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Sign Up"}
      </Button>
    </form>
  )
}
