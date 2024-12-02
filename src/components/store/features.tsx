// src/components/store/features.tsx
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { ShoppingCart, Shield, Truck, Headphones } from "lucide-react"

interface Feature {
  icon: React.ElementType
  title: string
  description: string
}

interface FeaturesProps extends HTMLAttributes<HTMLElement> {
  title?: string
  subtitle?: string
  features?: Feature[]
}

export function Features({
  className,
  title = "Why Choose Us",
  subtitle = "Discover the advantages",
  features = [
    {
      icon: ShoppingCart,
      title: "Easy Shopping",
      description: "Browse through our collection"
    },
    // ... other default features
  ],
  ...props
}: FeaturesProps) {
  return (
    <section
      className={cn(
        "w-full px-6 py-16 bg-background",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6"
            >
              <div className="mb-4 p-3 rounded-full bg-primary/10">
                {feature.icon && <feature.icon className="h-6 w-6 text-primary" />}
              </div>
              <h3 className="text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}