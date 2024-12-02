// src/components/templates/template-card.tsx
'use client'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useTemplateStore, type Template } from "@/lib/store/template-store"

interface TemplateCardProps {
  template: Template
}

export function TemplateCard({ template }: TemplateCardProps) {
  const router = useRouter()
  const loadTemplate = useTemplateStore(state => state.loadTemplate)

  const handleUseTemplate = () => {
    try {
      loadTemplate(template.id)
      router.push(`/editor/${template.id}`)
    } catch (error) {
      console.error('Failed to load template:', error)
    }
  }

  return (
    <Card className="group overflow-hidden">
      <div className="relative aspect-video">
        <img 
          src={template.thumbnail}
          alt={template.name}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Button 
            variant="secondary" 
            onClick={handleUseTemplate}
          >
            Use Template
          </Button>
        </div>
      </div>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{template.name}</h3>
            <p className="text-sm text-muted-foreground">
              {template.description}
            </p>
          </div>
          <Badge>{template.category}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}