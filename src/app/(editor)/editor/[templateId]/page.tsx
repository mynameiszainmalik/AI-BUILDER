// src/app/(editor)/editor/[templateId]/page.tsx
'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { EditorCanvas } from "@/components/editor/canvas"
import { EditorSidebar } from "@/components/editor/sidebar"
import { EditorToolbar } from "@/components/editor/toolbar"
import { useTemplateStore } from "@/lib/store/template-store"
import { useEditorStore } from "@/lib/store/editor-store"

export default function EditorPage({
  params: { templateId }
}: {
  params: { templateId: string }
}) {
  const router = useRouter()

  console.log(templateId)
  const [isInitialized, setIsInitialized] = useState(false)
  const { templates, loadTemplate, selectedTemplate } = useTemplateStore()
  const setComponents = useEditorStore((state) => state.actions.setComponents)

  
  useEffect(() => {
    if (!isInitialized) {
      const template = templates.find(t => t.id === templateId)
      if (!template) {
        router.push('/temp')
        return
      }

      loadTemplate(templateId)
      if (template?.components) {
        setComponents(template?.components)
      }
      setIsInitialized(true)
    }
  }, [templateId, isInitialized])

  if (!isInitialized) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-screen flex flex-col">
      <EditorToolbar templateId={templateId} />
      <div className="flex-1 flex overflow-hidden">
        <EditorCanvas />
        <EditorSidebar />
      </div>
    </div>
  )
}