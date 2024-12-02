// src/components/store/product-grid.tsx
import { type HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image?: string
  description?: string
}

interface ProductGridProps extends HTMLAttributes<HTMLElement> {
  title?: string
  products?: Product[]
  columns?: 2 | 3 | 4
}

const defaultProducts: Product[] = [
  {
    id: '1',
    name: 'Sample Product 1',
    price: 99.99,
    description: 'High-quality product with amazing features'
  },
  {
    id: '2',
    name: 'Sample Product 2',
    price: 149.99,
    description: 'Premium product for discerning customers'
  },
  // Add more sample products as needed
]

export function ProductGrid({
  className,
  title = "Our Products",
  products = defaultProducts,
  columns = 3,
  ...props
}: ProductGridProps) {
  return (
    <section
      className={cn(
        "w-full px-6 py-16 bg-background",
        className
      )}
      {...props}
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">{title}</h2>
        <div className={cn(
          "grid gap-6",
          columns === 2 && "grid-cols-1 md:grid-cols-2",
          columns === 3 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
          columns === 4 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        )}>
          {products.map((product) => (
            <div
              key={product.id}
              className="group relative bg-card rounded-lg overflow-hidden border"
            >
              <div className="aspect-square bg-muted">
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold">
                    ${product.price.toFixed(2)}
                  </span>
                  <Button size="sm">Add to Cart</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}