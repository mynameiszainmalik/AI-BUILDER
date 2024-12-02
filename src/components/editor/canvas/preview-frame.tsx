// src/components/editor/canvas/preview-frame.tsx
import { type ReactNode } from "react"

interface PreviewFrameProps {
  children: ReactNode
}

export function PreviewFrame({ children }: PreviewFrameProps) {
  return (
    <div className="w-full min-h-screen bg-background">
      <div className="max-w-screen-xl mx-auto">
        {children}
      </div>
    </div>
  )
}