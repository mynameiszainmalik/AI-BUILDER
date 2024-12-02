// src/components/templates/template-preview.tsx
import { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Monitor, Smartphone, Star } from "lucide-react"
import { type Template } from "@/lib/store/template-types"

interface TemplatePreviewProps {
  template: Template | null
  onClose: () => void
  onSelect: (template: Template) => Promise<void>
}

export function TemplatePreview({ template, onClose, onSelect }: TemplatePreviewProps) {
  const [loading, setLoading] = useState(false)
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  if (!template) return null

  const handleSelect = async () => {
    try {
      setLoading(true)
      await onSelect(template)
      onClose()
    } catch (error) {
      console.error('Failed to select template:', error)
      // Handle error (show toast, etc.)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={!!template} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl h-[90vh]">
        <div className="grid grid-cols-12 gap-6 h-full">
          {/* Preview Section */}
          <div className="col-span-9 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Tabs 
                value={previewDevice} 
                onValueChange={(v) => setPreviewDevice(v as 'desktop' | 'mobile')}
              >
                <TabsList>
                  <TabsTrigger value="desktop">
                    <Monitor className="h-4 w-4 mr-2" />
                    Desktop
                  </TabsTrigger>
                  <TabsTrigger value="mobile">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Mobile
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="relative flex-1 border rounded-lg overflow-hidden">
              <img
                src={template.previewImages[currentImageIndex][previewDevice]}
                alt={`${template.name} preview`}
                className="w-full h-full object-cover"
              />
              
              {/* Thumbnail Navigation */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/50 p-2 rounded-full">
                {template.previewImages.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Info Section */}
          <div className="col-span-3 flex flex-col">
            <div className="flex-1 overflow-y-auto">
              {/* Template Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-semibold">{template.name}</h2>
                  <p className="text-muted-foreground mt-1">
                    {template.description}
                  </p>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="secondary">{template.category}</Badge>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 text-sm">
                        {template.stats?.rating} ({template.stats?.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features Section */}
                {/* Industry Section */}
                {/* Author Info */}
                {/* ... (previous implementation) ... */}
              </div>
            </div>

            <div className="pt-4 border-t mt-4">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleSelect}
                disabled={loading}
              >
                {loading && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Use This Template
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}