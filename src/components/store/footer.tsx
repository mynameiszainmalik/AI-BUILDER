// src/components/store/footer.tsx
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface FooterProps extends HTMLAttributes<HTMLElement> {
  companyName?: string
  links?: Array<{ label: string; href: string }>
  socialLinks?: Array<{ label: string; href: string }>
}

export function Footer({
  className,
  companyName = "Your Store Name",
  links = [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
  socialLinks = [
    { label: "Twitter", href: "/social/twitter" },
    { label: "Facebook", href: "/social/facebook" },
    { label: "Instagram", href: "/social/instagram" },
  ],
  ...props
}: FooterProps) {
  return (
    <footer
      className={cn(
        "w-full px-6 py-12 bg-muted/50",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">{companyName}</h3>
            
            <p className="text-sm text-muted-foreground">
              Creating amazing shopping experiences since 2024
            </p>
            <ul className="flex flex-col gap-2">
              {links.map((link, index) => (
                <li key={`link-${index}-${link.href}`}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Social</h3>
            <ul className="flex flex-col gap-2">
              {socialLinks.map((link, index) => (
                <li key={`social-${index}-${link.href}`}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}