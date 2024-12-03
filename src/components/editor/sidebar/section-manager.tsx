// src/components/editor/sidebar/section-manager.tsx
'use client'
import { useEditorStore } from "@/lib/store/editor-store"
import { Button } from "@/components/ui/button"
import { ArrowUp, ArrowDown, Grip, Eye, EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface SortableItemProps {
  id: string
  index: number
  type: string
  isHidden?: boolean
  isSelected?: boolean
  onMoveUp: () => void
  onMoveDown: () => void
  onToggleVisibility: () => void
}

function SortableItem({
  id,
  index,
  type,
  isHidden,
  isSelected,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,

}: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg border p-3",
        "hover:bg-muted/50 transition-colors",
        isSelected && "bg-muted",
        isDragging && "opacity-50 cursor-grabbing border-primary/50 bg-muted/50",
        !isDragging && "cursor-default"
      )}
    >
      <div 
        className="flex items-center gap-2 flex-1"
        {...attributes}
      >
        <div
          {...listeners}
          className={cn(
            "h-8 w-8 flex items-center justify-center",
            "cursor-grab active:cursor-grabbing rounded-md",
            "hover:bg-muted/80 transition-colors"
          )}
        >
          <Grip className="h-4 w-4 text-muted-foreground/50" />
        </div>
        <span className="text-sm font-medium">
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 opacity-0 group-hover:opacity-100",
            "transition-opacity"
          )}
          onClick={onToggleVisibility}
        >
          {isHidden ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 opacity-0 group-hover:opacity-100",
            "transition-opacity"
          )}
          onClick={onMoveUp}
          disabled={index === 0}
        >
          <ArrowUp className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "h-8 w-8 p-0 opacity-0 group-hover:opacity-100",
            "transition-opacity"
          )}
          onClick={onMoveDown}
          // disabled={index === components.length - 1}
        >
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export function SectionManager() {
  const components = useEditorStore((state) => state.state.components)
  const selectedId = useEditorStore((state) => state.state.selectedComponent)
  const { 
    moveComponentUp, 
    moveComponentDown, 
    toggleVisibility,
    reorderComponents 
  } = useEditorStore((state) => state.actions)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    })
  )

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      const oldIndex = components.findIndex((c) => c.id === active.id)
      const newIndex = components.findIndex((c) => c.id === over.id)
      reorderComponents(oldIndex, newIndex)
      
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">Page Sections</h3>
          <p className="text-sm text-muted-foreground">
            Manage and reorder your page sections
          </p>
        </div>
        <Button variant="outline" size="sm">
          Add Section
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={components.map(c => c.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-2">
            {components.map((component, index) => (
              <SortableItem
                key={component.id}
                id={component.id}
                index={index}
               
                type={component.type}
                isHidden={component.isHidden}
                isSelected={selectedId === component.id}
                onMoveUp={() => moveComponentUp(component.id)}
                onMoveDown={() => moveComponentDown(component.id)}
                onToggleVisibility={() => toggleVisibility(component.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  )
}