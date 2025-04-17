// app/api/signup/route.ts

import { NextResponse } from "next/server"

interface RequestBody {
  name: string
  email: string
  password: string
  gymDetails?: {
    name: string
    address: string
  }
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()

  // In real app, you'd interact with a database
  // Here's basic logic for now
  const existingUser = false // Replace with DB check
  if (existingUser) {
    return NextResponse.json({ error: "Email already in use" }, { status: 400 })
  }

  const user = {
    id: "owner-123",
    name: body.name,
    email: body.email,
    role: "owner",
    gymId: body.gymDetails ? "gym-123" : undefined,
  }

  const gym = body.gymDetails
    ? {
        id: "gym-123",
        name: body.gymDetails.name,
        address: body.gymDetails.address,
        ownerId: user.id,
      }
    : null

  return NextResponse.json({ user, gym })
}
