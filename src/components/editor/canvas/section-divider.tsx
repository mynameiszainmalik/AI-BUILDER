// src/components/editor/canvas/section-divider.tsx
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEditorStore } from "@/lib/store/editor-store"
import React from "react"

interface SectionDividerProps {
  beforeComponentId: string
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

export function SectionDivider({ beforeComponentId }: SectionDividerProps) {
  const addComponent = useEditorStore((state) => state.actions.addComponent)

  const handleAddSection = (type: string) => {
    const newComponent = {
      id: crypto.randomUUID(),
      type: type as any,
      props: {},
      children: [],
    }
    
    addComponent(newComponent, beforeComponentId)
  }

  return (
    <div className="relative py-2 group">
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-full h-px bg-border group-hover:bg-primary/50 transition-colors" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-full absolute left-1/2 -translate-x-1/2 bg-background shadow-sm border-primary/20"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center" className="w-56">
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
    </div>
  )
}