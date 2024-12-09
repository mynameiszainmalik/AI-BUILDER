// src/components/editor/sidebar/sections/header/tabs/appearance-settings.tsx
import { Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { HeaderConfig } from "@/lib/TYPES/Header/type"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

interface AppearanceSettingsProps {
  component: Component;
  device: 'desktop' | 'mobile';
}

export function AppearanceSettings({ component, device }: AppearanceSettingsProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent)

  const handleAppearanceUpdate = (path: string, value: any) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          appearance: {
            ...component.props.header?.appearance,
            [path]: value,
          },
        } as HeaderConfig,
      },
    })
  }

  return (
    <div className="space-y-6">
      {/* Colors */}
      <div className="space-y-4">
        <div>
          <Label className="text-base">Colors</Label>
          <p className="text-sm text-muted-foreground">Customize header colors</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Background</Label>
            <div className="space-y-4">
              <Input
                type="color"
                value={component.props.header?.appearance?.background?.color || '#ffffff'}
                onChange={(e) => handleAppearanceUpdate('background', { 
                  ...component.props.header?.appearance?.background,
                  color: e.target.value 
                })}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm">Opacity</Label>
                  <span className="text-sm text-muted-foreground">
                    {component.props.header?.appearance?.background?.opacity || 100}%
                  </span>
                </div>
                <Slider
                  value={[component.props.header?.appearance?.background?.opacity || 100]}
                  min={0}
                  max={100}
                  step={1}
                  onValueChange={([value]) => handleAppearanceUpdate('background', {
                    ...component.props.header?.appearance?.background,
                    opacity: value
                  })}
                />
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Text</Label>
            <Input
              type="color"
              value={component.props.header?.appearance?.text?.color || '#000000'}
              onChange={(e) => handleAppearanceUpdate('text', {
                ...component.props.header?.appearance?.text,
                color: e.target.value
              })}
            />
          </div>
        </div>
      </div>

      <Separator />

      {/* Typography */}
      <div className="space-y-4">
        <div>
          <Label className="text-base">Typography</Label>
          <p className="text-sm text-muted-foreground">Adjust text styling</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Size</Label>
            <Select
              value={component.props.header?.appearance?.text?.size || 'base'}
              onValueChange={(value) => handleAppearanceUpdate('text', {
                ...component.props.header?.appearance?.text,
                size: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sm">Small</SelectItem>
                <SelectItem value="base">Medium</SelectItem>
                <SelectItem value="lg">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Weight</Label>
            <Select
              value={component.props.header?.appearance?.text?.weight || 'normal'}
              onValueChange={(value) => handleAppearanceUpdate('text', {
                ...component.props.header?.appearance?.text,
                weight: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select weight" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="semibold">Semibold</SelectItem>
                <SelectItem value="bold">Bold</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <Separator />

      {/* Border */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Bottom Border</Label>
            <p className="text-sm text-muted-foreground">Add border to bottom of header</p>
          </div>
          <Switch
            checked={component.props.header?.appearance?.border?.show || false}
            onCheckedChange={(checked) => handleAppearanceUpdate('border', {
              ...component.props.header?.appearance?.border,
              show: checked
            })}
          />
        </div>
        {component.props.header?.appearance?.border?.show && (
          <div className="space-y-4 pt-4">
            <Input
              type="color"
              value={component.props.header?.appearance?.border?.color || '#000000'}
              onChange={(e) => handleAppearanceUpdate('border', {
                ...component.props.header?.appearance?.border,
                color: e.target.value
              })}
            />
            <Select
              value={component.props.header?.appearance?.border?.style || 'solid'}
              onValueChange={(value) => handleAppearanceUpdate('border', {
                ...component.props.header?.appearance?.border,
                style: value
              })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="solid">Solid</SelectItem>
                <SelectItem value="dashed">Dashed</SelectItem>
                <SelectItem value="dotted">Dotted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
}