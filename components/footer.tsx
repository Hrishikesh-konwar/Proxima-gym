import Link from "next/link"
import { Dumbbell } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-900 text-white py-12">
      {/* <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-4">
        <div className="space-y-4">
          <Link href="/" className="flex items-center gap-2">
            <Dumbbell className="h-6 w-6 text-red-500" />
            <span className="text-xl font-bold">FitZone</span>
          </Link>
          <p className="text-sm text-gray-300">
            Transforming lives through fitness since 2010. Our mission is to help you achieve your fitness goals in a
            supportive environment.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Classes
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Trainers
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-white">
                Membership
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>123 Fitness Street, Gym City</li>
            <li>Email: info@fitzone.com</li>
            <li>Phone: (123) 456-7890</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Hours</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>Monday - Friday: 5AM - 11PM</li>
            <li>Saturday: 7AM - 9PM</li>
            <li>Sunday: 8AM - 8PM</li>
          </ul>
        </div>
      </div> */}
      <div className="container mt-8 border-t border-gray-800 pt-8 px-4 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-gray-300">© 2023 FitZone. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="text-gray-300 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-300 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
