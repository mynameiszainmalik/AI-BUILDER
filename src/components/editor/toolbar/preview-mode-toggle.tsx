'use client'
import { Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function PreviewModeToggle() {
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setIsPreviewMode(!isPreviewMode)}
      className={isPreviewMode ? "bg-primary/10" : ""}
    >
      <Eye className="h-4 w-4 mr-2" />
      Preview
    </Button>
  )
}