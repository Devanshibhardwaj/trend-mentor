
/// <reference types="vite/client" />
/// <reference types="react" />
/// <reference types="react-dom" />

// Fix for JSX runtime errors
declare namespace React {
  interface JSX {
    Element: React.ReactElement<any, any>;
    IntrinsicElements: any;
  }
}

// Fix for OutfitCardProps type error in MoodBasedStyling.tsx and OccasionStyling.tsx
interface OutfitCardProps {
  index: number;
  style: string;
  occasion: string;
  description: string;
  image?: string;
  className?: string;
  shoppingOptions?: {
    name: string;
    url: string;
    price: number;
    rating: number;
  }[];
}
