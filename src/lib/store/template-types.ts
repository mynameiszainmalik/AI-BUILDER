// src/lib/store/template-types.ts
import { type Component } from "./types"

export interface Template {
  id: string
  name: string
  description: string
  thumbnail: string
  category: 'fashion' | 'electronics' | 'food' | 'general'
  components: Component[]
  metadata: {
    author: string
    version: string
    created: string
    lastUpdated: string
    industry?: string[]
    features?: string[]
    demoUrl?: string
  }
  previewImages: {
    desktop: string
    mobile: string
  }[]
  stats?: {
    downloads: number
    rating: number
    reviews: number
  }
}