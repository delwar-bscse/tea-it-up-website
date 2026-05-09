'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { Bell, ChevronDown, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { MainLogo } from '@/asset/asset'
import useLoginUser from '@/hooks/useUser'

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'Explore Clubs', href: '/explore-clubs' },
  { name: 'View Bookings', href: '/bookings' },
  { name: 'About Us', href: '/about' },
]

const Header = () => {
  const router = useRouter();
  const pathname = usePathname()
  const { isLogin, logout } = useLoginUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="w-full bg-[#ECF6F1] px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 z-50">
        <div className="relative w-32 h-10 flex items-center">
          <Image
            src={MainLogo}
            alt="Tee It Up Logo"
            fill
            className="object-contain object-left mix-blend-multiply"
            unoptimized
          />
        </div>
      </Link>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8 lg:gap-12">
        {navLinks.map((link) => {
          // Determine if active. Fallback to matching exactly or assuming 'Explore Clubs' is active for demo if path is /explore
          const isActive = pathname === link.href || (pathname === '/' && link.name === 'Home')

          return (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-[15px] font-medium transition-colors hover:text-[#1b8a5a]",
                isActive
                  ? "text-[#1b8a5a] underline underline-offset-8 decoration-2"
                  : "text-gray-800"
              )}
            >
              {link.name}
            </Link>
          )
        })}
      </nav>

      {/* Right Actions */}
      <div className="hidden md:flex items-center gap-6">
        {isLogin ? (
          <div className="flex items-center gap-5">
            <button className="text-gray-800 hover:text-[#1b8a5a] transition-colors relative">
              <Bell className="w-[22px] h-[22px]" />
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 outline-none cursor-pointer">
                  <Avatar className="w-10 h-10 border-2 border-[#0A3A20] rounded-lg shadow-sm overflow-hidden">
                    <Image
                      src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="User Avatar"
                      fill
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg">US</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="w-4 h-4 text-gray-800 stroke-[3px]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/profile')}>Profile</DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push('/my-bookings')}>My Bookings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="bg-[#0A3A20] hover:bg-[#072a17] text-white rounded-xl px-7 py-2 text-[15px] font-medium h-auto shadow-sm"
          >
            Sign In
          </Link>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden p-2 text-gray-800 z-50"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg py-6 px-6 flex flex-col gap-6 md:hidden border-t border-gray-100 z-50">
          <nav className="flex flex-col gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (pathname === '/' && link.name === 'Home')
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-lg font-medium",
                    isActive ? "text-[#1b8a5a]" : "text-gray-800"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            })}
          </nav>

          <div className="mt-2 pt-6 border-t border-gray-100 flex items-center justify-between">
            {isLogin ? (
              <div className="flex items-center gap-4 w-full">
                <Avatar className="w-12 h-12 border-2 border-[#0A3A20] rounded-lg overflow-hidden">
                  <AvatarImage
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100"
                    className="object-cover"
                  />
                  <AvatarFallback className="rounded-lg">US</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Link href="/profile" className="font-semibold text-gray-900">Profile</Link>
                  <Link href="/my-bookings" className="text-sm text-gray-500">My Bookings</Link>
                </div>
                <button className="text-gray-800 p-2 bg-gray-50 rounded-full hover:bg-gray-100">
                  <Bell className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                href="/sign-in"
                className="w-full bg-[#0A3A20] hover:bg-[#072a17] text-white py-2 rounded-xl text-lg font-medium"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header