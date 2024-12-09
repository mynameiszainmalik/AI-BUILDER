// src/components/editor/sidebar/sections/header/header-settings.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppearanceSettings } from "./tabs/appearance-settings"
import { LayoutSettings } from "./tabs/layout-settings"
import { SpacingSettings } from "./tabs/spacing-settings"
import { NavigationSettings } from "./tabs/navigation-settings"
import { DeviceSelector } from "./device-selector"
import { type Component } from "@/lib/store/types"
import { useState } from "react"

interface HeaderSettingsProps {
  component: Component;
}

type DeviceView = 'desktop' | 'mobile';

export function HeaderSettings({ component }: HeaderSettingsProps) {
  const [deviceView, setDeviceView] = useState<DeviceView>('desktop');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Header Settings</h2>
        <DeviceSelector
          value={deviceView}
          onChange={(value) => setDeviceView(value as DeviceView)}
        />
      </div>

      <Tabs defaultValue="layout" className="w-full">
        <TabsList className="w-full grid grid-cols-4">
          <TabsTrigger value="layout">Layout</TabsTrigger>
          <TabsTrigger value="spacing">Spacing</TabsTrigger>
          <TabsTrigger value="appearance">Style</TabsTrigger>
          <TabsTrigger value="navigation">Content</TabsTrigger>
        </TabsList>
        <div className="mt-4 space-y-4">
          <TabsContent value="layout">
            <LayoutSettings 
              component={component} 
              device={deviceView}
            />
          </TabsContent>
          <TabsContent value="spacing">
            <SpacingSettings 
              component={component}
              device={deviceView}
            />
          </TabsContent>
          <TabsContent value="appearance">
            <AppearanceSettings 
              component={component}
              device={deviceView}
            />
          </TabsContent>
          <TabsContent value="navigation">
            <NavigationSettings 
              component={component}
              device={deviceView}
            />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}