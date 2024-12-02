// src/providers/editor-provider.tsx
import { type ReactNode } from "react"

interface EditorProviderProps {
  children: ReactNode
}

export function EditorProvider({ children }: EditorProviderProps) {
  return (
    <div className="h-full flex flex-col">
      {children}
    </div>
  )
}