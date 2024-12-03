// src/components/editor/toolbar/device-preview.tsx
import { Monitor, Smartphone, Tablet } from "lucide-react"
import { useEditorStore } from "@/lib/store/editor-store"
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group"
import type { DeviceType } from "@/lib/store/editor-store"

const devices: { value: DeviceType; icon: React.ReactNode; label: string }[] = [
  {
    value: 'mobile',
    icon: <Smartphone className="h-4 w-4" />,
    label: 'Mobile'
  },
  {
    value: 'tablet',
    icon: <Tablet className="h-4 w-4" />,
    label: 'Tablet'
  },
  {
    value: 'desktop',
    icon: <Monitor className="h-4 w-4" />,
    label: 'Desktop'
  }
]

export function DevicePreview() {
  const devicePreview = useEditorStore((state) => state.state.devicePreview)
  const setDevicePreview = useEditorStore((state) => state.actions.setDevicePreview)

  return (
    <div className="flex items-center gap-2">
      <ToggleGroup 
        type="single" 
        value={devicePreview} 
        onValueChange={(value: DeviceType) => {
          if (value) setDevicePreview(value)
        }}
      >
        {devices.map(({ value, icon, label }) => (
          <ToggleGroupItem 
            key={value} 
            value={value}
            className="data-[state=on]:bg-primary/10"
            aria-label={`${label} Preview`}
          >
            {icon}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}