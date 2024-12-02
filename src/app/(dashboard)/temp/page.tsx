import { TemplateGrid } from "@/components/temp/template-grid"

export default function TemplatesPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Choose a Template</h1>
          <p className="text-muted-foreground mt-1">
            Select a template to start building your store
          </p>
        </div>
        <TemplateGrid />
      </div>
    </div>
  )
}