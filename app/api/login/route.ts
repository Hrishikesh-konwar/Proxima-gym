// app/api/signup/route.ts

import { NextResponse } from "next/server"

interface RequestBody {
    email: string
    password: string
}

export async function POST(req: Request) {
    const body: RequestBody = await req.json()
    const { email, password } = body;

    const existingUser = false
    if (existingUser) {
        return NextResponse.json({ error: "Email already in use" }, { status: 400 })
    }

    const userDetails = {
        id: "123",
        name: "Hrishikesh Konwar",
        email: "hrishikesh.konwar1995@gmail.com",
        role: "member",
        gymId: "gym-123",
    }

    return NextResponse.json(
        {
            message: "Signup successful",
            user: userDetails,
        },
        { status: 201 }
    )

}
