// src/components/editor/canvas/add-section-button.tsx
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/lib/store/editor-store"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import React from "react"
import { ProductGrid } from "@/components/store/product-grid"

interface AddSectionButtonProps {
  position: 'top' | 'bottom'
}

const SECTION_CATEGORIES = {
  'Layout': [
    { type: 'header', label: 'Header' },
    { type: 'footer', label: 'Footer' },
  ],
  'Hero': [
    { type: 'hero', label: 'Hero Banner' },
    { type: 'slideshow', label: 'Slideshow' },
  ],
  'Content': [
    { type: 'features', label: 'Features Grid' },
    { type: 'testimonials', label: 'Testimonials' },
    { type: 'faq', label: 'FAQ Section' },
    { type: 'cta', label: 'Call to Action' },
  ],
  'Products': [
    { type: 'productGrid', label: 'Product Grid' },
    { type: 'featuredProduct', label: 'Featured Product' },
    { type: 'productCarousel', label: 'Product Carousel' },
  ]
}

// Default props for each section type
const DEFAULT_SECTION_PROPS = {
  header: {
    logo: 'Your Logo',
    navigation: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'About', href: '/about' },
    ]
  },
  hero: {
    title: 'Welcome to our store',
    description: 'Discover amazing products at great prices',
    primaryCTA: 'Shop Now',
    secondaryCTA: 'Learn More'
  },
  features: {
    title: 'Why Choose Us',
    subtitle: 'Discover our unique features',
    features: [
      { title: 'Quality', description: 'Best quality products' },
      { title: 'Service', description: '24/7 customer support' },
    ]
  },
  footer: {
    companyName: 'Your Company',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products' },
      { label: 'About', href: '/about' },
    ],
    socialLinks: [
      { label: 'Facebook', href: 'https://www.facebook.com' },
      { label: 'Twitter', href: 'https://www.twitter.com' },
      { label: 'Instagram', href: 'https://www.instagram.com' },
  ],
  },

  ProductGrid: {
    title: 'Our Products',
    products: [
      { id: '1', name: 'Product 1', description: 'Description 1', image: 'https://via.placeholder.com/150' },
      { id: '2', name: 'Product 2', description: 'Description 2', image: 'https://via.placeholder.com/150' },
    {id:'3',name:'Product 3',description:'Description 3',image:'https://via.placeholder.com/150'}
    ]
  }
}

export function AddSectionButton({ position }: AddSectionButtonProps) {
  const addComponent = useEditorStore((state) => state.actions.addComponent)
  const selectedComponent = useEditorStore((state) => state.state.selectedComponent)

  const handleAddSection = (type: string) => {
    const newComponent = {
      id: crypto.randomUUID(),
      type: type as any, // You might want to improve type safety here
      props: DEFAULT_SECTION_PROPS[type as unknown as keyof typeof DEFAULT_SECTION_PROPS] || {},
      children: [],
    }

    // If we're adding after a selected component, pass its ID
    addComponent(newComponent, position === 'bottom' ? selectedComponent as string : undefined)
  }

  return (
    <div className={cn(
      "absolute left-1/2 -translate-x-1/2 z-10",
      position === 'top' ? '-top-3' : '-bottom-3',
      "opacity-0 group-hover:opacity-100 transition-opacity"
    )}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="h-6 w-6 rounded-full p-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Add Section</DropdownMenuLabel>
          {Object.entries(SECTION_CATEGORIES).map(([category, sections]) => (
            <React.Fragment key={category}>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  {category}
                </DropdownMenuLabel>
                {sections.map((section) => (
                  <DropdownMenuItem
                    key={section.type}
                    onClick={() => handleAddSection(section.type)}
                  >
                    {section.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuGroup>
            </React.Fragment>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}