'use client'
import { type Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SettingsAdvancedProps {
  component: Component
}

export function SettingsAdvanced({ component }: SettingsAdvancedProps) {
  const toggleVisibility = useEditorStore((state) => state.actions.toggleVisibility)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label htmlFor="visibility">Visible</Label>
        <Switch
          id="visibility"
          checked={!component.isHidden}
          onCheckedChange={() => toggleVisibility(component.id)}
        />
      </div>

      {/* Space for future advanced settings */}
      {/* 
        TODO: Future Advanced Features
        - Component animations
        - Custom CSS
        - Conditional rendering
        - Responsive behavior
      */}
    </div>
  )
}