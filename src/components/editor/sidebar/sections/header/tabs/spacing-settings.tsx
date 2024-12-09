// src/components/editor/sidebar/sections/header/tabs/spacing-settings.tsx
import { Component } from "@/lib/store/types"
import { useEditorStore } from "@/lib/store/editor-store"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { HeaderConfig } from "@/lib/TYPES/Header/type"
import { useState } from "react"
import { Lock, Unlock } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SpacingSettingsProps {
  component: Component;
  device: 'desktop' | 'mobile';
}

interface SpacingControlProps {
  label: string;
  values: {
    top: string;
    right: string;
    bottom: string;
    left: string;
  };
  onChange: (values: { [key: string]: string }) => void;
}

function SpacingControl({ label, values, onChange }: SpacingControlProps) {
  const [isLinked, setIsLinked] = useState(true);

  const handleChange = (side: string, value: string) => {
    if (isLinked) {
      onChange({
        top: value,
        right: value,
        bottom: value,
        left: value,
      });
    } else {
      onChange({
        ...values,
        [side]: value,
      });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>{label}</Label>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsLinked(!isLinked)}
          className="h-8 w-8 p-0"
        >
          {isLinked ? (
            <Lock className="h-4 w-4" />
          ) : (
            <Unlock className="h-4 w-4" />
          )}
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label className="text-xs">Top</Label>
          <Input
            type="text"
            value={values.top}
            onChange={(e) => handleChange('top', e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Right</Label>
          <Input
            type="text"
            value={values.right}
            onChange={(e) => handleChange('right', e.target.value)}
            className="h-8"
            disabled={isLinked}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Bottom</Label>
          <Input
            type="text"
            value={values.bottom}
            onChange={(e) => handleChange('bottom', e.target.value)}
            className="h-8"
            disabled={isLinked}
          />
        </div>
        <div className="space-y-2">
          <Label className="text-xs">Left</Label>
          <Input
            type="text"
            value={values.left}
            onChange={(e) => handleChange('left', e.target.value)}
            className="h-8"
            disabled={isLinked}
          />
        </div>
      </div>
    </div>
  );
}

export function SpacingSettings({ component, device }: SpacingSettingsProps) {
  const updateComponent = useEditorStore((state) => state.actions.updateComponent);

  const handlePaddingChange = (values: { [key: string]: string }) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          spacing: {
            ...component.props.header?.spacing,
            padding: {
              ...component.props.header?.spacing?.padding,
              [device]: values,
            },
          },
        } as HeaderConfig,
      },
    });
  };

  const handleMarginChange = (values: { [key: string]: string }) => {
    updateComponent(component.id, {
      props: {
        header: {
          ...component.props.header,
          spacing: {
            ...component.props.header?.spacing,
            margin: {
              ...component.props.header?.spacing?.margin,
              [device]: values,
            },
          },
        } as HeaderConfig,
      },
    });
  };

  return (
    <div className="space-y-6">
      <SpacingControl
        label="Padding"
        values={component.props.header?.spacing?.padding?.[device] as any || {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        }}
        onChange={handlePaddingChange}
      />
      <Separator />
      <SpacingControl
        label="Margin"
        values={component.props.header?.spacing?.margin?.[device] as any || {
          top: '0',
          right: '0',
          bottom: '0',
          left: '0',
        }}
        onChange={handleMarginChange}
      />
    </div>
  );
}