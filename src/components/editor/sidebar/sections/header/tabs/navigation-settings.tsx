// src/components/editor/sidebar/sections/header/tabs/navigation-settings.tsx
import { Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { HeaderConfig, NavigationItem } from "@/lib/TYPES/Header/type"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
    ArrowRight,
  ExternalLink, 
  Grip, 
  Plus, 
  Trash2, 
  Link as LinkIcon 
} from "lucide-react"
import { cn } from "@/lib/utils"
import {
  
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable"

interface NavigationSettingsProps {
  component: Component;
  device: 'desktop' | 'mobile';
}

interface NavigationItemProps {
  item: NavigationItem;
  onUpdate: (id: string, updates: Partial<NavigationItem>) => void;
  onDelete: (id: string) => void;
}

function NavigationItemEditor({ item, onUpdate, onDelete }: NavigationItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex items-center gap-2 p-2 rounded-md border bg-card",
        isDragging && "opacity-50",
      )}
    >
      <div {...attributes} {...listeners} className="cursor-grab">
        <Grip className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 grid grid-cols-2 gap-2">
        <Input
          placeholder="Label"
          value={item.label}
          onChange={(e) => onUpdate(item.id, { label: e.target.value })}
          className="h-8"
        />
        <Input
          placeholder="URL"
          value={item.href}
          onChange={(e) => onUpdate(item.id, { href: e.target.value })}
          className="h-8"
        />
      </div>
      <Switch
        checked={item.isExternal}
        onCheckedChange={(checked) => onUpdate(item.id, { isExternal: checked })}
        className="mx-2"
      />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(item.id)}
        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  )
}

export function NavigationSettings({ component, device }: NavigationSettingsProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent)

  const handleNavigationUpdate = (navigation: NavigationItem[]) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          navigation,
        } as HeaderConfig,
      },
    })
  }

  const handleFeatureToggle = (feature: keyof HeaderConfig['features']) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          features: {
            ...component.props.header?.features,
            [feature]: !component.props.header?.features?.[feature],
          },
        } as HeaderConfig,
      },
    })
  }

  const addNavigationItem = () => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      label: 'New Link',
      href: '#',
      isExternal: false,
    }

    handleNavigationUpdate([
      ...(component.props.header?.navigation || []),
      newItem,
    ])
  }

  const updateNavigationItem = (id: string, updates: Partial<NavigationItem>) => {
    const navigation = component.props.header?.navigation || []
    const updatedNavigation = navigation.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    )
    handleNavigationUpdate(updatedNavigation)
  }

  const deleteNavigationItem = (id: string) => {
    const navigation = component.props.header?.navigation || []
    handleNavigationUpdate(navigation.filter((item) => item.id !== id))
  }

  const handleDragEnd = (event: any) => {
    const { active, over } = event
    if (over && active.id !== over.id) {
      const navigation = component.props.header?.navigation || []
      const oldIndex = navigation.findIndex((item) => item.id === active.id)
      const newIndex = navigation.findIndex((item) => item.id === over.id)

      const newNavigation = [...navigation]
      const [removed] = newNavigation.splice(oldIndex, 1)
      newNavigation.splice(newIndex, 0, removed)

      handleNavigationUpdate(newNavigation)
    }
  }

  return (
    <div className="space-y-6">
      {/* Navigation Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-base">Navigation Links</Label>
            <p className="text-sm text-muted-foreground">
              Manage header navigation items
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addNavigationItem}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Link
          </Button>
        </div>
        {/* <DndContext onDragEnd={handleDragEnd}> */}
          <SortableContext
            items={component.props.header?.navigation || []}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-2">
              {component.props.header?.navigation?.map((item) => (
                <NavigationItemEditor
                  key={item.id}
                  item={item}
                  onUpdate={updateNavigationItem}
                  onDelete={deleteNavigationItem}
                />
              ))}
            </div>
          </SortableContext>
        {/* </DndContext> */}
      </div>

      <Separator />

      {/* Header Features */}
      <div className="space-y-4">
        <div>
          <Label className="text-base">Header Features</Label>
          <p className="text-sm text-muted-foreground">
            Toggle additional header elements
          </p>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Search</Label>
            <Switch
              checked={component.props.header?.features?.search}
              onCheckedChange={() => handleFeatureToggle('search' as keyof HeaderConfig['features'])}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Shopping Cart</Label>
            <Switch
              checked={component.props.header?.features?.cart}
              onCheckedChange={() => handleFeatureToggle('cart' as keyof HeaderConfig['features'])}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Account</Label>
            <Switch
              checked={component.props.header?.features?.account}
              onCheckedChange={() => handleFeatureToggle('account') as unknown as keyof HeaderConfig['features']}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label>Wishlist</Label>
            <Switch
              checked={component.props.header?.features?.wishlist}
              onCheckedChange={() => handleFeatureToggle('wishlist') as unknown as keyof HeaderConfig['features']}
            />
          </div>
        </div>
      </div>
    </div>
  )
}