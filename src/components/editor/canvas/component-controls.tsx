// src/components/editor/canvas/component-controls.tsx
import { Eye, EyeOff, Trash } from "lucide-react"
import { useEditorStore } from "@/lib/store/editor-store"
import { Button } from "@/components/ui/button"
import type { Component } from "@/lib/store/types"

interface ComponentControlsProps {
  component: Component
}

export function ComponentControls({ component }: ComponentControlsProps) {
  const { toggleVisibility, removeComponent } = useEditorStore((state) => ({
    toggleVisibility: state.actions.toggleVisibility,
    removeComponent: state.actions.removeComponent
  }))

  return (
    <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            toggleVisibility(component.id)
          }}
        >
          {component.isHidden ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            removeComponent(component.id)
          }}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}