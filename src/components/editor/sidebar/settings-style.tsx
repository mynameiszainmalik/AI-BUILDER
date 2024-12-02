// src/components/editor/sidebar/settings-style.tsx
'use client'
import { type Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface SettingsStyleProps {
  component: Component
}

export function SettingsStyle({ component }: SettingsStyleProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent)

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Padding</Label>
        <Select
          value={component.props.padding || 'default'}
          onValueChange={(value) => {
            updateComponent(component.id, {
              props: { ...component.props, padding: value }
            })
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select padding" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="small">Small</SelectItem>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="large">Large</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Add more style options as needed */}
    </div>
  )
}