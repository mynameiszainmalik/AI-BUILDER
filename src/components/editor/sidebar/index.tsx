// src/components/editor/sidebar/index.tsx
import { useEditorStore } from "@/lib/store/editor-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsGeneral } from "./settings-general"
import { NoSelection } from "./no-selection"
import { SettingsStyle } from "./settings-style"
import { SettingsAdvanced } from "./settings-advanced"

export function EditorSidebar() {
  const selectedComponent = useEditorStore((state) => {
    const selected = state.state.selectedComponent
    if (!selected) return null
    return state.state.components.find(c => c.id === selected)
  })

  if (!selectedComponent) {
    return <NoSelection />
  }

  return (
    <div className="w-80 border-l bg-background overflow-y-auto">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {selectedComponent.type.charAt(0).toUpperCase() + selectedComponent.type.slice(1)} Settings
        </h2>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="w-full justify-start px-4 py-2 border-b">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="style">Style</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>
        <div className="p-4">
          <TabsContent value="general">
            <SettingsGeneral component={selectedComponent} />
          </TabsContent>
          <TabsContent value="style">
            <SettingsStyle component={selectedComponent} />
          </TabsContent>
          <TabsContent value="advanced">
            <SettingsAdvanced component={selectedComponent} />
          </TabsContent>
        </div>
      </Tabs>

      {/* Reserved space for AI Prompt Interface */}
      <div className="p-4 border-t">
        {/* 
          TODO: AI Prompt Integration
          - Add chat-like interface for natural language modifications
          - Implement real-time AI suggestions
          - Add prompt templates for common modifications
        */}
        <div className="text-sm text-muted-foreground">
          AI customization coming soon...
        </div>
      </div>
    </div>
  )
}