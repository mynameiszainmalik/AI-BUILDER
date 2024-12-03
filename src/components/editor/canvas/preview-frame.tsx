// src/components/editor/canvas/preview-frame.tsx
import { cn } from "@/lib/utils"
import { useEditorStore } from "@/lib/store/editor-store"
import type { DeviceType } from "@/lib/store/editor-store"

const deviceSizes: Record<DeviceType, string> = {
  mobile: 'w-[375px]',
  tablet: 'w-[768px]',
  desktop: 'w-full'
}

interface PreviewFrameProps {
  children: React.ReactNode
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  const devicePreview = useEditorStore((state) => state.state.devicePreview)

  return (
    <div className="w-full h-full overflow-auto flex justify-center p-8">
      <div
        className={cn(
          "min-h-full bg-background transition-all duration-200",
          deviceSizes[devicePreview],
          devicePreview !== 'desktop' && "border rounded-lg shadow-lg"
        )}
      >
        {children}
      </div>
    </div>
  )
}