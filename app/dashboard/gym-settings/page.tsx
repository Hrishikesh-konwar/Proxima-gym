"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function GymSettingsPage() {
  const { user, currentGym } = useAuth()
  const router = useRouter()
  const [gymName, setGymName] = useState("")
  const [gymAddress, setGymAddress] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  // Redirect if not an owner
  useEffect(() => {
    if (user && user.role !== "owner") {
      router.push("/dashboard")
    }
  }, [user, router])

  // Set initial values
  useEffect(() => {
    if (currentGym) {
      setGymName(currentGym.name)
      setGymAddress(currentGym.address)
    }
  }, [currentGym])

  const handleSaveGymSettings = () => {
    setIsSaving(true)

    // Simulate API call
    setTimeout(() => {
      // In a real app, you would update the gym settings in the database
      setIsSaving(false)
      setIsEditing(false)
    }, 1000)
  }

  if (user?.role !== "owner" || !currentGym) {
    return null
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gym Settings</h1>
        <p className="text-muted-foreground">Manage your gym's information and settings.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Gym Information</CardTitle>
              <CardDescription>Update your gym's basic information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gym-name">Gym Name</Label>
                <Input
                  id="gym-name"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gym-address">Gym Address</Label>
                <Input
                  id="gym-address"
                  value={gymAddress}
                  onChange={(e) => setGymAddress(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="gym-id">Gym ID</Label>
                <Input id="gym-id" value={currentGym.id} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="owner-id">Owner ID</Label>
                <Input id="owner-id" value={currentGym.ownerId} disabled />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              {isEditing ? (
                <>
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button className="bg-red-600 hover:bg-red-700" onClick={handleSaveGymSettings} disabled={isSaving}>
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} className="ml-auto">
                  Edit Information
                </Button>
              )}
            </CardFooter>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Business Hours</CardTitle>
              <CardDescription>Set your gym's operating hours.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium">Monday - Friday</span>
                  <span>5:00 AM - 11:00 PM</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Saturday</span>
                  <span>7:00 AM - 9:00 PM</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>8:00 AM - 8:00 PM</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Edit Hours</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage your gym's billing and payment settings.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Payment Methods</h3>
                <Separator className="my-2" />
                <div className="rounded-md border p-4 mt-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-12 rounded border bg-muted"></div>
                      <div>
                        <p className="font-medium">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">Expires 12/24</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Add Payment Method
                </Button>
              </div>
              <div>
                <h3 className="text-lg font-medium">Subscription Plan</h3>
                <Separator className="my-2" />
                <div className="rounded-md border p-4 mt-2">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium">Business Plan</p>
                      <p className="text-sm text-muted-foreground">$199.00 billed monthly</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Change Plan
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-1">
                    <p className="text-sm">Next billing date: June 15, 2023</p>
                    <p className="text-sm text-muted-foreground">Your plan renews automatically</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure how you receive notifications about your gym.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <Separator className="my-2" />
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>New Member Notifications</Label>
                      <p className="text-sm text-muted-foreground">Receive emails when new members sign up</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Billing Notifications</Label>
                      <p className="text-sm text-muted-foreground">Get notified about billing events</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enabled
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Marketing Updates</Label>
                      <p className="text-sm text-muted-foreground">Receive marketing and promotional emails</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Disabled
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="ml-auto">Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
