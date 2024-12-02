// src/components/editor/canvas/render-component.tsx
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEditorStore } from "@/lib/store/editor-store"
import { cn } from "@/lib/utils"
import type { Component } from "@/lib/store/types"
import { componentRegistry } from "./component-registry"


interface RenderComponentProps {
  component: Component
}

export function RenderComponent({ component }: RenderComponentProps) {
  const selectedId = useEditorStore((state) => state.state.selectedComponent)
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

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const ComponentToRender = componentRegistry[component.type]

  if (!ComponentToRender) {
    return null
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
        selectedId === component.id && "ring-2 ring-primary"
      )}
      onClick={() => selectComponent(component.id)}
    >
      <ComponentToRender {...component.props}>
        {component.children?.map((child) => (
          <RenderComponent
            key={child.id}
            component={child}
          />
        ))}
      </ComponentToRender>
    </div>
  )
}