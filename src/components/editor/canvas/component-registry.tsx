// src/components/editor/canvas/component-registry.tsx
import { Header } from "@/components/store/header"
import { Hero } from "@/components/store/hero"
import { Features } from "@/components/store/features"
import { ProductGrid } from "@/components/store/product-grid"
import { Footer } from "@/components/store/footer"
import type { ComponentType } from "@/lib/store/types"

export const componentRegistry: Record<ComponentType, React.ComponentType<any>> = {
  header: Header,
  hero: Hero,
  features: Features,
  productGrid: ProductGrid,
  footer: Footer,
}