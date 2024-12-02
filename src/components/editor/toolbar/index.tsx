// src/components/editor/toolbar/index.tsx
import { Save, Undo, Redo, Eye, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEditorStore } from "@/lib/store/editor-store"
import { DevicePreview } from "./device-preview"
import { PreviewModeToggle } from "./preview-mode-toggle"


interface EditorToolbarProps {
  templateId: string
}

export function EditorToolbar({ templateId }: EditorToolbarProps) {
  const { canUndo, canRedo, undo, redo } = useEditorStore((state) => ({
    canUndo: state.state.history.past.length > 0,
    canRedo: state.state.history.future.length > 0,
    undo: state.actions.undo,
    redo: state.actions.redo
  }))

  return (
    
    <div className="h-14 border-b bg-background px-4">
      <div className="h-full flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2">
          {/* Logo/Back Button could go here */}
          <h1 className="font-semibold">Store Editor</h1>
        </div>

        {/* Center Section */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 border-r pr-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={undo}
              disabled={!canUndo}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={redo}
              disabled={!canRedo}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
            </Button>
          </div>

          <DevicePreview />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <PreviewModeToggle />
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Handle save functionality
              console.log('Saving template...')
            }}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          <Button variant="default" size="sm">
            Publish
          </Button>
        </div>
      </div>
    </div>
  )
}