"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { BarChart3, Users, CalendarDays, Settings, Home } from "lucide-react"

export default function DashboardNav() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Panel",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Entradas",
      href: "/checkin",
      icon: BarChart3,
    },
    {
      title: "Miembros",
      href: "/members",
      icon: Users,
    },
    {
      title: "Suscripciones",
      href: "/subscriptions",
      icon: CalendarDays,
    },
    {
      title: "Configuración",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
      {navItems.map((item) => {
        const Icon = item.icon
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center text-sm font-medium transition-colors hover:text-primary",
              pathname === item.href ? "text-primary" : "text-muted-foreground",
            )}
          >
            <Icon className="mr-2 h-4 w-4" />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
