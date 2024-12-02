// src/lib/store/types.ts
export type ComponentType = 'header' | 'hero' | 'features' | 'productGrid' | 'footer';


export interface Component {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children: Component[];
  isHidden?: boolean;
  parentId?: string;
  order?: number;
}

export interface EditorState {
  selectedComponent: string | null
  components: Component[]
  isDragging: boolean
  history: {
    past: Component[][]
    future: Component[][]
  }
}