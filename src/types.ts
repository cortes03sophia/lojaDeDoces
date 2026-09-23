export type Category = 'todos' | 'bombons' | 'macarons' | 'bolos' | 'trufas';

export interface Product {
  id: string;
  name: string;
  category: Category;
  tagline: string;
  description: string;
  price: number;
  unit: string;
  image: string;
  tastingNotes: string[];
  ingredients: string[];
  allergens: string[];
  dietary?: string;
  isBestseller?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  customNotes?: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  event: string;
  rating: number;
  avatarText: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'encomendas' | 'produtos' | 'entrega';
}

export interface PastryAnalysisResult {
  sweetType: string;
  flavorProfile: string;
  pastryTechniques: string[];
  recommendedPortions: string;
  estimatedPriceRange: string;
  pairingSuggestion: string;
  chefVerdict: string;
}
