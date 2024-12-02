// src/components/editor/canvas/canvas-drop-zone.tsx
import { type ReactNode } from "react"
import { useDroppable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

interface CanvasDropZoneProps {
  children: ReactNode
}

export function CanvasDropZone({ children }: CanvasDropZoneProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas-drop-zone"
  })

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "min-h-full w-full max-w-6xl mx-auto p-8",
        "bg-background transition-colors duration-200",
        isOver && "bg-muted"
      )}
    >
      {children}
    </div>
  )
}