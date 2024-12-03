// src/components/editor/canvas/index.tsx
import { DndContext } from "@dnd-kit/core"
import { useEditorStore } from "@/lib/store/editor-store"
import { PreviewFrame } from "./preview-frame"
import { CanvasDropZone } from "./canvas-drop-zone"
import { ComponentRenderer } from "./component-renderer"
import { SectionDivider } from "./section-divider"
import React from "react"

export function EditorCanvas() {
  const components = useEditorStore((state) => state.state.components)
  const isDragging = useEditorStore((state) => state.state.isDragging)

  return (
    <div className="flex-1 overflow-auto bg-grid-pattern">
      <DndContext>
        <PreviewFrame>
          <CanvasDropZone>
            {components.map((component, index) => (
              <React.Fragment key={component.id}>
                {index > 0 && (
                  <SectionDivider beforeComponentId={component.id} />
                )}
                <ComponentRenderer 
                  component={component}
                />
              </React.Fragment>
            ))}
            {/* Add a final divider at the bottom */}
            {components.length > 0 && (
              <SectionDivider 
                beforeComponentId={components[components.length - 1].id} 
              />
            )}
          </CanvasDropZone>
        </PreviewFrame>
      </DndContext>
    </div>
  )
}