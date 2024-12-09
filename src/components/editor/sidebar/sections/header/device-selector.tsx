// src/components/editor/sidebar/sections/header/device-selector.tsx
import { Monitor, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DeviceSelectorProps {
  value: 'desktop' | 'mobile';
  onChange: (value: 'desktop' | 'mobile') => void;
}

export function DeviceSelector({ value, onChange }: DeviceSelectorProps) {
  return (
    <div className="flex items-center gap-1 bg-muted p-1 rounded-lg">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-3 h-8",
          value === 'desktop' && "bg-background shadow-sm"
        )}
        onClick={() => onChange('desktop')}
      >
        <Monitor className="h-4 w-4 mr-2" />
        Desktop
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "px-3 h-8",
          value === 'mobile' && "bg-background shadow-sm"
        )}
        onClick={() => onChange('mobile')}
      >
        <Smartphone className="h-4 w-4 mr-2" />
        Mobile
      </Button>
    </div>
  )
}