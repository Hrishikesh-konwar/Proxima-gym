"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Dumbbell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import LoginForm from "@/components/login-form"
import SignupForm from "@/components/signup-form"
import { useAuth } from "@/lib/auth-context"

export default function Header() {
  const router = useRouter()
  const { user, logout } = useAuth()
  const [loginOpen, setLoginOpen] = useState(false)
  const [signupOpen, setSignupOpen] = useState(false)

  const handleLoginSuccess = () => {
    setLoginOpen(false)
    router.push("/dashboard")
  }

  const handleSignupSuccess = () => {
    setSignupOpen(false)
    router.push("/dashboard")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-red-600" />
          <span className="text-xl font-bold">FitZone</span>
        </Link>

        {/* <div className="ml-auto flex items-center gap-4">
          {user ? (
            <>
              <Button variant="ghost" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
              <Button variant="outline" onClick={logout}>
                Logout
              </Button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button  className="bg-red-600 hover:bg-red-700">Login</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Login to your account</DialogTitle>
                    <DialogDescription>Enter your credentials to access your account.</DialogDescription>
                  </DialogHeader>
                  <LoginForm onSuccess={handleLoginSuccess} />
                </DialogContent>
              </Dialog>

              <Dialog open={signupOpen} onOpenChange={setSignupOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-red-600 hover:bg-red-700">Sign Up</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create an account</DialogTitle>
                    <DialogDescription>Fill in your details to create a new account.</DialogDescription>
                  </DialogHeader>
                  <SignupForm onSuccess={handleSignupSuccess} />
                </DialogContent>
              </Dialog>
            </div>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col gap-6 pt-6">
                <Link href="/" className="flex items-center gap-2">
                  <Dumbbell className="h-6 w-6 text-red-600" />
                  <span className="text-xl font-bold">FitZone</span>
                </Link>
                <div className="flex flex-col gap-2">
                  {user ? (
                    <>
                      <Button variant="outline" onClick={() => router.push("/dashboard")}>
                        Dashboard
                      </Button>
                      <Button variant="outline" onClick={logout}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button className="bg-red-600 hover:bg-red-700" onClick={() => setLoginOpen(true)}>
                        Login
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700" onClick={() => setSignupOpen(true)}>
                      Login
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div> */}
      </div>
    </header>

  )
}
