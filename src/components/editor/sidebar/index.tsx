// src/components/editor/sidebar/index.tsx
import { useEditorStore } from "@/lib/store/editor-store"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsGeneral } from "./settings-general"
import { NoSelection } from "./no-selection"
import { SettingsStyle } from "./settings-style"
import { SettingsAdvanced } from "./settings-advanced"
import { SectionManager } from "./section-manager"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { PageSettings } from "./page-settings"

export function EditorSidebar() {
  const selectedComponent = useEditorStore((state) => state.state.selectedComponent)
  const component = useEditorStore((state) => 
    state.state.components.find(c => c.id === state.state.selectedComponent)
  )

  return (
    <div className="w-80 border-l bg-background flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">
          {component ? (
            <>
              {component.type.charAt(0).toUpperCase() + component.type.slice(1)} Settings
            </>
          ) : (
            'Page Settings'
          )}
        </h2>
      </div>

      <Tabs defaultValue="general" className="flex-1">
        <div className="border-b">
          <ScrollArea aria-orientation="horizontal">
            <TabsList className="w-full justify-start p-0 h-12">
              <TabsTrigger 
                value="general"
                className={cn(
                  "flex-1 h-full rounded-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary"
                )}
              >
                General
              </TabsTrigger>
              <TabsTrigger 
                value="style"
                className={cn(
                  "flex-1 h-full rounded-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary"
                )}
              >
                Style
              </TabsTrigger>
              <TabsTrigger 
                value="sections"
                className={cn(
                  "flex-1 h-full rounded-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary"
                )}
              >
                Sections
              </TabsTrigger>
              <TabsTrigger 
                value="advanced"
                className={cn(
                  "flex-1 h-full rounded-none border-b-2 border-transparent",
                  "data-[state=active]:border-primary"
                )}
              >
                Advanced
              </TabsTrigger>
            </TabsList>
          </ScrollArea>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-8">
            <TabsContent value="general" className="mt-0">
              {component ? (
                <SettingsGeneral component={component} />
              ) : (
                <PageSettings />
              )}
            </TabsContent>
            <TabsContent value="style" className="mt-0">
              {component && <SettingsStyle component={component} />}
            </TabsContent>
            <TabsContent value="sections" className="mt-0">
              <SectionManager />
            </TabsContent>
            <TabsContent value="advanced" className="mt-0">
              {component && <SettingsAdvanced component={component} />}
            </TabsContent>
          </div>
        </ScrollArea>
      </Tabs>
    </div>
  )
}