// src/lib/store/editor-store.ts
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { Component, EditorState } from './types';

interface EditorStore {
  state: EditorState;
  actions: {
    selectComponent: (id: string | null) => void;
    addComponent: (component: Component, parentId?: string) => void;
    removeComponent: (id: string) => void;
    toggleVisibility: (id: string) => void;
    undo: () => void;
    redo: () => void;
    updateComponentPosition: (activeId: string, overId: string) => void;
    setDragging: (isDragging: boolean) => void;
    setComponents: (components: Component[]) => void;
    updateComponent: (id: string, updates: Partial<Component>) => void;
  };
}

const MAX_HISTORY_LENGTH = 50;

export const useEditorStore = create(
  immer<EditorStore>((set, get) => ({
    state: {
     selectedComponent: null,
    components: [],
    isDragging: false,
    history: {
      past: [],
      future: []
    }
  },
    actions: {
      selectComponent: (id: string | null) => 
        set((state) => {
          state.state.selectedComponent = id;
        }),

        setComponents: (components) => {
          set((state) => {
            state.state.components = [...components]
            state.state.selectedComponent = null
            state.state.history = {
              past: [],
              future: []
            }
          })
        },
        updateComponent: (id, updates) => {
          set((state) => {
            const component = state.state.components.find(c => c.id === id)
            if (component) {
              Object.assign(component, updates)
            }
          })
        },

      addComponent: (component: Component, parentId?: string) =>
        set((state) => {
          const addToParent = (components: Component[]): Component[] => {
            return components.map(c => {
              if (c.id === parentId) {
                return {
                  ...c,
                  children: [...(c.children || []), component],
                };
              }
              if (c.children?.length) {
                return {
                  ...c,
                  children: addToParent(c.children),
                };
              }
              return c;
            });
          };

          // Save current state to history
          state.state.history.past.push([...state.state.components]);
          state.state.history.future = [];

          // Add component
          if (parentId) {
            state.state.components = addToParent(state.state.components);
          } else {
            state.state.components.push({
              ...component,
              order: state.state.components.length,
            });
          }
        }),

      removeComponent: (id: string) =>
        set((state) => {
          const removeFromTree = (components: Component[]): Component[] => {
            return components
              .filter(c => c.id !== id)
              .map(c => ({
                ...c,
                children: c.children?.length 
                  ? removeFromTree(c.children)
                  : c.children,
              }));
          };

          // Save current state to history
          state.state.history.past.push([...state.state.components]);
          state.state.history.future = [];

          // Remove component
          state.state.components = removeFromTree(state.state.components);
          
          // Clear selection if removed component was selected
          if (state.state.selectedComponent === id) {
            state.state.selectedComponent = null;
          }
        }),

      toggleVisibility: (id: string) => 
        set((state) => {
          const toggleInTree = (components: Component[]): Component[] => {
            return components.map(c => {
              if (c.id === id) {
                return { ...c, isHidden: !c.isHidden };
              }
              if (c.children?.length) {
                return {
                  ...c,
                  children: toggleInTree(c.children),
                };
              }
              return c;
            });
          };

          state.state.components = toggleInTree(state.state.components);
        }),

        undo: () => {
          const { past, future } = get().state.history;
          const current = [...get().state.components];
    
          if (past.length === 0) return;
    
          const newPast = [...past];
          const previous = newPast.pop();
    
          set((state) => {
            state.state.components = previous || [];
            state.state.history.past = newPast;
            state.state.history.future = [current, ...future];
          });
        },
    
        redo: () => {
          const { past, future } = get().state.history;
          const current = [...get().state.components];
    
          if (future.length === 0) return;
    
          const newFuture = [...future];
          const next = newFuture.shift();
    
          set((state) => {
            state.state.components = next || [];
            state.state.history.past = [...past, current];
            state.state.history.future = newFuture;
          });
        },

      updateComponentPosition: (activeId: string, overId: string) =>
        set((state) => {
          const flattenComponents = (components: Component[]): Component[] => {
            return components.reduce((acc, component) => {
              return [
                ...acc,
                component,
                ...(component.children ? flattenComponents(component.children) : []),
              ];
            }, [] as Component[]);
          };

          const flatComponents = flattenComponents(state.state.components);
          const activeIndex = flatComponents.findIndex(c => c.id === activeId);
          const overIndex = flatComponents.findIndex(c => c.id === overId);

          if (activeIndex !== -1 && overIndex !== -1) {
            // Save current state to history
            state.state.history.past.push([...state.state.components]);
            state.state.history.future = [];

            // Update position
            const [movedComponent] = state.state.components.splice(activeIndex, 1);
            state.state.components.splice(overIndex, 0, movedComponent);

            // Update order
            state.state.components.forEach((c, index) => {
              c.order = index;
            });
          }
        }),

      setDragging: (isDragging: boolean) =>
        set((state) => {
          state.state.isDragging = isDragging;
        }),

        
    },
  }))
);