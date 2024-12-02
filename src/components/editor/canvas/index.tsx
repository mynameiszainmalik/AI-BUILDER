// src/components/editor/canvas/index.tsx
import { DndContext } from "@dnd-kit/core"
import { useEditorStore } from "@/lib/store/editor-store"
import { PreviewFrame } from "./preview-frame"
import { CanvasDropZone } from "./canvas-drop-zone"
import { ComponentRenderer } from "./component-renderer"

export function EditorCanvas() {
  // Use specific selectors instead of whole state objects
  const components = useEditorStore((state) => state.state.components)
  const isDragging = useEditorStore((state) => state.state.isDragging)

  return (
    <div className="flex-1 overflow-auto bg-grid-pattern">
      <DndContext>
        <PreviewFrame>
          <CanvasDropZone>
            {components.map((component) => (
              <ComponentRenderer 
                key={component.id}
                component={component}
              />
            ))}
          </CanvasDropZone>
        </PreviewFrame>
      </DndContext>
    </div>
  )
}