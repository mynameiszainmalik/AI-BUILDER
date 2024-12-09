// src/components/editor/sidebar/sections/header/tabs/layout-settings.tsx
import { Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { HeaderConfig } from "@/lib/TYPES/Header/type"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"

interface LayoutSettingsProps {
  component: Component;
  device: 'desktop' | 'mobile';
}

export function LayoutSettings({ component, device }: LayoutSettingsProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent)

  const handleLayoutChange = (value: HeaderConfig['layout']['type']) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          layout: {
            ...component.props.header?.layout,
            type: value,
          },
        } as HeaderConfig,
      },
    })
  }

  const handleBehaviorChange = (value: HeaderConfig['layout']['behavior']) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          layout: {
            ...component.props.header?.layout,
            behavior: value,
          },
        } as HeaderConfig,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Layout Type */}
      <div className="space-y-4">
        <div>
          <Label className="text-base">Layout Type</Label>
          <p className="text-sm text-muted-foreground">Choose how your header content is arranged</p>
        </div>
        <RadioGroup
          value={component.props.header?.layout?.type || 'default'}
          onValueChange={handleLayoutChange}
          className="grid grid-cols-2 gap-4"
        >
          <div>
            <RadioGroupItem
              value="default"
              id="default"
              className="peer sr-only"
            />
            <Label
              htmlFor="default"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-sm font-normal">Default</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem
              value="centered"
              id="centered"
              className="peer sr-only"
            />
            <Label
              htmlFor="centered"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <span className="text-sm font-normal">Centered</span>
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Behavior */}
      <div className="space-y-4">
        <div>
          <Label className="text-base">Scroll Behavior</Label>
          <p className="text-sm text-muted-foreground">Control how the header behaves when scrolling</p>
        </div>
        <Select
          value={component.props.header?.layout?.behavior || 'static'}
          onValueChange={handleBehaviorChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select behavior" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="static">Static</SelectItem>
            <SelectItem value="sticky">Sticky</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Container Width */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Full Width</Label>
            <p className="text-sm text-muted-foreground">Extend header to full screen width</p>
          </div>
          <Switch
            checked={component.props.header?.layout?.width === 'full'}
            onCheckedChange={(checked) => {
              updateComponent(component.id, {
                props: {
                  header: {
                    ...component.props.header,
                    layout: {
                      ...component.props.header?.layout,
                      width: checked ? 'full' : 'contained',
                    },
                  } as HeaderConfig,
                },
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}