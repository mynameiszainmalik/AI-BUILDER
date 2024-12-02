// src/components/editor/toolbar/device-preview.tsx
import { useState } from "react"
import { Monitor, Smartphone, Tablet } from "lucide-react"
import {
  ToggleGroup,
  ToggleGroupItem
} from "@/components/ui/toggle-group"

export function DevicePreview() {
  const [device, setDevice] = useState("desktop")

  return (
    <ToggleGroup 
      type="single" 
      value={device} 
      onValueChange={(value) => {
        if (value) setDevice(value)
      }}
    >
      <ToggleGroupItem value="mobile" aria-label="Mobile Preview">
        <Smartphone className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="tablet" aria-label="Tablet Preview">
        <Tablet className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="desktop" aria-label="Desktop Preview">
        <Monitor className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  )
}