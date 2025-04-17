"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Dumbbell, Home, TrainTrackIcon as Training, ShoppingBag, User, Users, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/lib/auth-context"

export default function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout, currentGym } = useAuth()

  // Base routes for all users
  const baseRoutes = [
    {
      label: "Dashboard",
      icon: Home,
      href: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Program",
      icon: Training,
      href: "/dashboard/program",
      active: pathname === "/dashboard/program",
    },
    {
      label: "Products",
      icon: ShoppingBag,
      href: "/dashboard/products",
      active: pathname === "/dashboard/products",
    },
    {
      label: "Profile",
      icon: User,
      href: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
  ]

  // Owner-specific routes
  const ownerRoutes = [
    {
      label: "Members",
      icon: Users,
      href: "/dashboard/members",
      active: pathname === "/dashboard/members",
    },
    {
      label: "Gym Settings",
      icon: Settings,
      href: "/dashboard/gym-settings",
      active: pathname === "/dashboard/gym-settings",
    },
  ]

  // Combine routes based on user role
  const routes = user?.role === "owner" ? [...baseRoutes, ...ownerRoutes] : baseRoutes

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden absolute left-4 top-4">
            <Dumbbell className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <div className="flex h-full flex-col">
            <div className="flex flex-col gap-1 py-4">
              <div className="flex items-center gap-2">
                <Dumbbell className="h-6 w-6 text-red-600" />
                <span className="text-xl font-bold">FitZone</span>
              </div>
              {currentGym && <p className="text-sm text-muted-foreground pl-8">{currentGym.name}</p>}
            </div>
            <div className="flex-1">
              <nav className="grid gap-2 py-4">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className={cn(
                      "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      route.active ? "bg-red-600 text-white" : "hover:bg-muted",
                    )}
                  >
                    <route.icon className="h-5 w-5" />
                    {route.label}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="border-t py-4">
              <div className="flex items-center gap-2 px-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                  <span className="text-sm font-medium">{user?.name?.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{user?.name}</span>
                  <span className="text-xs text-muted-foreground">{user?.email}</span>
                  <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full mt-2 mx-3 text-red-600 hover:bg-red-50"
                onClick={() => logout()}
              >
                Logout
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div className="hidden border-r bg-gray-100/40 md:block md:w-64">
        <div className="flex h-full flex-col">
          <div className="flex flex-col gap-1 border-b px-6 py-4">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-6 w-6 text-red-600" />
              <span className="text-xl font-bold">FitZone</span>
            </div>
            {currentGym && <p className="text-sm text-muted-foreground pl-8">{currentGym.name}</p>}
          </div>
          <div className="flex-1">
            <nav className="grid gap-1 px-2 py-4">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    route.active ? "bg-red-600 text-white" : "hover:bg-muted",
                  )}
                >
                  <route.icon className="h-5 w-5" />
                  {route.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                <span className="text-sm font-medium">{user?.name?.charAt(0)}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-medium">{user?.name}</span>
                <span className="text-xs text-muted-foreground">{user?.email}</span>
                <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-2 text-red-600 hover:bg-red-50" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
