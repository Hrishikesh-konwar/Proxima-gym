import { NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET as string // make sure this is in your .env file

interface RequestBody {
  name: string
  email: string
  password: string
  userType: string
  gymDetails?: {
    name: string
    address: string
  }
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()
  const { name, email, password, gymDetails, userType } = body

  try {
    // Check if user exists
    // const existingUser = await prisma.user.findUnique({ where: { email } })

    // if (existingUser) {
    //   return NextResponse.json(
    //     { error: "Email already in use" },
    //     { status: 400 }
    //   )
    // }

    // Hash password
    // const hashedPassword = await bcrypt.hash(password, 10)

    // Create gym first if needed
    // let gymId: string | undefined
    // if (gymDetails) {
    //   const gym = await prisma.gym.create({
    //     data: {
    //       name: gymDetails.name,
    //       address: gymDetails.address,
    //     },
    //   })
    //   gymId = gym.id
    // }

    // Create user
    // const user = await prisma.user.create({
    //   data: {
    //     name,
    //     email,
    //     password: hashedPassword,
    //     role: userType,
    //     gymId,
    //   },
    // })

    // // Sign JWT token
    // const token = jwt.sign(
    //   { userId: user.id, email: user.email, role: user.role },
    //   JWT_SECRET,
    //   { expiresIn: "7d" }
    // )

    // Return user without password
    // const { password: _, ...userWithoutPassword } = user

    return NextResponse.json(
      {
        message: "Signup successful",
        // user: userWithoutPassword,
        // token,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("Signup error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )
  }
}
