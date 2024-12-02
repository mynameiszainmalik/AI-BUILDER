// src/components/store/header.tsx
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface HeaderProps extends HTMLAttributes<HTMLElement> {
  logo?: string
  navigation?: Array<{ label: string; href: string }>
}

export function Header({ 
  className,
  logo = "Store Logo",
  navigation = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" }
  ],
  ...props 
}: HeaderProps) {
  return (
    <header
      className={cn(
        "w-full py-4 px-6 flex items-center justify-between",
        className
      )}
      {...props}
    >
      <div className="font-bold text-xl">{logo}</div>

      <nav>
        <ul className="flex items-center gap-4">
          {navigation.map((item, index) => (
            <li key={`nav-item-${index}-${item.href}`}>
              <a 
                href={item.href}
                className="text-sm hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}