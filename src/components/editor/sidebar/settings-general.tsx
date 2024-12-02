// src/components/editor/sidebar/settings-general.tsx
'use client'
import { type Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface SettingsGeneralProps {
  component: Component
}

export function SettingsGeneral({ component }: SettingsGeneralProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent)

  // Define fields based on component type
  const getFieldsForComponent = (type: string) => {
    switch (type) {
      case 'header':
        return [
          { key: 'logo', label: 'Logo Text', type: 'text' },
          { key: 'navigation', label: 'Navigation Links', type: 'textarea' }
        ]
      case 'hero':
        return [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'description', label: 'Description', type: 'textarea' },
          { key: 'primaryCTA', label: 'Primary Button Text', type: 'text' },
          { key: 'secondaryCTA', label: 'Secondary Button Text', type: 'text' }
        ]
      case 'features':
        return [
          { key: 'title', label: 'Title', type: 'text' },
          { key: 'subtitle', label: 'Subtitle', type: 'text' },
          { key: 'features', label: 'Features', type: 'textarea' }
        ]
      case 'footer':
        return [
          { key: 'companyName', label: 'Company Name', type: 'text' },
          { key: 'links', label: 'Links', type: 'textarea' },
          { key: 'socialLinks', label: 'Social Links', type: 'textarea' }
        ]
      default:
        return []
    }
  }

  const fields = getFieldsForComponent(component.type)

  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.key} className="space-y-2">
          <Label htmlFor={field.key}>{field.label}</Label>
          {field.type === 'text' ? (
            <Input
              id={field.key}
              value={component.props[field.key] || ''}
              onChange={(e) => {
                updateComponent(component.id, {
                  props: {
                    ...component.props,
                    [field.key]: e.target.value
                  }
                })
              }}
            />
          ) : (
            <Textarea
              id={field.key}
              value={component.props[field.key] || ''}
              onChange={(e) => {
                updateComponent(component.id, {
                  props: {
                    ...component.props,
                    [field.key]: e.target.value
                  }
                })
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}