"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "Home", path: "/" },
  { name: "About Me", path: "/about" },
  { name: "Work", path: "/work" },
  { name: "Personal Projects", path: "/projects" },
  { name: "Contact", path: "/contact" },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex justify-end space-x-4 py-4">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={cn(
            "transition-colors hover:text-foreground/80",
            pathname === item.path ? "text-foreground" : "text-foreground/60",
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}

