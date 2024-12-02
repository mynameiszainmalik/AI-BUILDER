// src/components/editor/canvas/component-renderer.tsx
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEditorStore } from "@/lib/store/editor-store"
import { cn } from "@/lib/utils"
import { componentRegistry } from "./component-registry"
import type { Component } from "@/lib/store/types"

interface ComponentRendererProps {
  component: Component
}

export function ComponentRenderer({ component }: ComponentRendererProps) {
  const selectedComponent = useEditorStore((state) => state.state.selectedComponent)
  const selectComponent = useEditorStore((state) => state.actions.selectComponent)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: component.id,
  })

  const ComponentToRender = componentRegistry[component.type]

  if (!ComponentToRender) {
    console.warn(`No component found for type: ${component.type}`)
    return null
  }

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
        "relative group",
        isDragging && "opacity-50",
        component.isHidden && "hidden",
        selectedComponent === component.id && "ring-2 ring-primary"
      )}
      onClick={() => selectComponent(component.id)}
    >
      <ComponentToRender {...component.props} />
    </div>
  )
}