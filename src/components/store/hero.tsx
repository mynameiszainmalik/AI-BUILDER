// src/components/store/hero.tsx
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface HeroProps extends HTMLAttributes<HTMLElement> {
  title?: string
  description?: string
  primaryCTA?: string
  secondaryCTA?: string
  backgroundImage?: string
}

export function Hero({
  className,
  title = "Welcome to our store",
  description = "Discover amazing products at great prices",
  primaryCTA = "Shop Now",
  secondaryCTA = "Learn More",
  backgroundImage,
  ...props
}: HeroProps) {
  return (
    <section
      className={cn(
        "relative w-full px-6 py-24 flex flex-col items-center justify-center text-center",
        "bg-gradient-to-b from-background to-muted/50",
        className
      )}
      style={backgroundImage ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
      {...props}
    >
      <h1 className="text-4xl md:text-5xl font-bold mb-4 max-w-2xl">
        {title}
      </h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-xl">
        {description}
      </p>
      <div className="flex gap-4">
        <Button size="lg">
          {primaryCTA}
        </Button>
        <Button variant="outline" size="lg">
          {secondaryCTA}
        </Button>
      </div>
    </section>
  )
}