// src/lib/types/header.ts
export interface HeaderBaseConfig {
    // Core layout
    layout: {
      sticky: boolean;
      containerWidth: 'full' | 'contained';
    };
    
    // Logo
    logo: {
      text: string;
      fontSize: {
        desktop: string;
        mobile: string;
      };
    };
  
    // Navigation
    navigation: Array<{
      id: string;
      label: string;
      href: string;
    }>;
  
    // Spacing
    spacing: {
      padding: {
        desktop: {
          x: string;
          y: string;
        };
        mobile: {
          x: string;
          y: string;
        };
      };
    };
  
    // Basic styling
    style: {
      colors: {
        background: string;
        text: string;
      };
      border: {
        show: boolean;
        color: string;
      };
    };
  
    // Mobile specific
    mobile: {
      menuType: 'hamburger';
      breakpoint: 'sm' | 'md' | 'lg';
    };
  
    // Core features
    features: {
      cart: boolean;
    };
  }