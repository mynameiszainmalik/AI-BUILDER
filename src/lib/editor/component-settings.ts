// src/lib/editor/component-settings.ts
interface SettingField {
    key: string
    label: string
    type: 'text' | 'textarea' | 'color' | 'select' | 'number'
    options?: string[]
  }
  
  interface ComponentSetting {
    fields: SettingField[]
  }
  
  export const componentSettings: Record<string, ComponentSetting> = {
    header: {
      fields: [
        { key: 'logo', label: 'Logo Text', type: 'text' },
        { key: 'navigation', label: 'Navigation Links', type: 'textarea' }
      ]
    },
    hero: {
      fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
        { key: 'primaryCTA', label: 'Primary Button Text', type: 'text' },
        { key: 'secondaryCTA', label: 'Secondary Button Text', type: 'text' }
      ]
    },
    features: {
      fields: [
        { key: 'title', label: 'Section Title', type: 'text' },
        { key: 'subtitle', label: 'Section Subtitle', type: 'text' }
      ]
    }
  }