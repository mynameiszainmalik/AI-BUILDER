// src/lib/store/template-store.ts
import { create } from "zustand";
import { type Component } from "./types";

// Define template types
export interface Template {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  category: "fashion" | "electronics" | "general";
  components: Component[];
}

// Sample templates data
const SAMPLE_TEMPLATES: Template[] = [
  {
    id: "modern-store",
    name: "Modern Store",
    description: "A clean, modern e-commerce template with bold typography",
    thumbnail: "/templates/modern-store.jpg", // You'll need to add these images
    category: "general",
    components: [
      {
        id: "header-1",
        type: "header",
        props: {
          logo: "Modern Store",
          navigation: [
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: "About", href: "/about" },
            { label: "Contact", href: "/contact" },
          ],
        },
        children: [],
      },
      {
        id: "hero-1",
        type: "hero",
        props: {
          title: "Welcome to Modern Store",
          description: "Discover our curated collection of premium products",
          primaryCTA: "Shop Now",
          secondaryCTA: "Learn More",
        },
        children: [],
      },
      {
        id: "features-1",
        type: "features",
        props: {
          title: "Why Choose Us",
          subtitle: "Experience shopping reimagined",
          features: [
            {
              title: "Premium Quality",
              description: "Only the finest products",
            },
            {
              title: "Fast Delivery",
              description: "Quick and reliable shipping",
            },
          ],
        },
        children: [],
      },
      {
        id: "footer-1",
        type: "footer",
        props: {
          companyName: "Modern Store",
          links: [
            { label: "About", href: "#about" },
            { label: "Contact", href: "#Contact" },
          ],
        },
        children: [],
      },
    ],
  },
  // Add another template
  {
    id: "minimal-boutique",
    name: "Minimal Boutique",
    description: "Elegant and minimalistic design for fashion stores",
    thumbnail: "/templates/minimal-boutique.jpg",
    category: "fashion",
    components: [
      // Similar structure but with different styling/content
      // Add components as needed
    ],
  },
];

interface TemplateStore {
  templates: Template[];
  selectedTemplate: Template | null;
  loadTemplate: (templateId: string) => void;
  clearTemplate: () => void;
}

export const useTemplateStore = create<TemplateStore>((set, get) => ({
  templates: SAMPLE_TEMPLATES,
  selectedTemplate: null,

  loadTemplate: (templateId: string) => {
    const template = SAMPLE_TEMPLATES.find((t) => t.id === templateId);
    if (!template) return;

    const clonedTemplate = {
      ...template,
      components: template.components.map((component) => ({
        ...component,
        id: crypto.randomUUID(),
      })),
    };

    set({ selectedTemplate: clonedTemplate });
  },

  clearTemplate: () => set({ selectedTemplate: null }),
}));
