"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const products = [
  {
    id: "1",
    name: "Premium Protein Powder",
    description: "High-quality whey protein for muscle recovery",
    price: 49.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "supplements",
  },
  {
    id: "2",
    name: "Fitness Resistance Bands",
    description: "Set of 5 resistance bands for home workouts",
    price: 24.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "equipment",
  },
  {
    id: "3",
    name: "Workout Gloves",
    description: "Premium gloves for weightlifting and training",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "accessories",
  },
  {
    id: "4",
    name: "Pre-Workout Formula",
    description: "Energy boost for intense training sessions",
    price: 39.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "supplements",
  },
  {
    id: "5",
    name: "Adjustable Dumbbell Set",
    description: "Space-saving adjustable weights for home gym",
    price: 299.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "equipment",
  },
  {
    id: "6",
    name: "Fitness Tracker",
    description: "Track your workouts, heart rate, and more",
    price: 129.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "accessories",
  },
]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())

    if (activeTab === "all") return matchesSearch
    return matchesSearch && product.category === activeTab
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Shop Products</h1>
        <p className="text-muted-foreground">Browse our selection of fitness products and supplements.</p>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-sm">
          <Label htmlFor="search" className="sr-only">
            Search products
          </Label>
          <Input
            id="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="supplements">Supplements</TabsTrigger>
            <TabsTrigger value="equipment">Equipment</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square w-full">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-red-600 hover:bg-red-700">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="flex h-[400px] items-center justify-center rounded-md border border-dashed">
          <div className="text-center">
            <h3 className="text-lg font-medium">No products found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
