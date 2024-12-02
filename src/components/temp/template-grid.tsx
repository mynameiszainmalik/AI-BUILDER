// src/components/templates/template-grid.tsx
'use client'
import { useTemplateStore } from "@/lib/store/template-store"
import { TemplateCard } from "./template-card"

export function TemplateGrid() {
  const templates = useTemplateStore(state => state.templates)

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {templates.map((template) => (
        <TemplateCard 
          key={template.id} 
          template={template}
        />
      ))}
    </div>
  )
}