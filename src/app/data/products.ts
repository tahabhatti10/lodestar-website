import sneaker from "../../imports/IMG_4145.PNG";

export type Condition = "New" | "Pre-loved";

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  gender: "Men" | "Women" | "Unisex";
  condition: Condition;
  image: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: "Lodestar Low 'Triple Black'", price: 180, category: "Lifestyle", gender: "Unisex", condition: "New", image: sneaker },
  { id: 2, name: "Lodestar Low 'Shadow'", price: 165, category: "Lifestyle", gender: "Men", condition: "New", image: sneaker },
  { id: 3, name: "Lodestar Runner 'Onyx'", price: 150, category: "Running", gender: "Women", condition: "New", image: sneaker },
  { id: 4, name: "Lodestar Court 'Slate'", price: 140, category: "Lifestyle", gender: "Unisex", condition: "New", image: sneaker },
  { id: 5, name: "Lodestar High 'Midnight'", price: 195, category: "High tops", gender: "Men", condition: "New", image: sneaker },
  { id: 6, name: "Lodestar Low 'Ash'", price: 170, category: "Lifestyle", gender: "Women", condition: "New", image: sneaker },
  { id: 7, name: "Lodestar Runner 'Carbon'", price: 160, category: "Running", gender: "Unisex", condition: "New", image: sneaker },
  { id: 8, name: "Lodestar Court 'Fog'", price: 135, category: "Lifestyle", gender: "Men", condition: "New", image: sneaker },
  { id: 9, name: "Lodestar High 'Eclipse'", price: 210, category: "High tops", gender: "Women", condition: "New", image: sneaker },
  { id: 10, name: "Lodestar Low 'Storm'", price: 155, category: "Lifestyle", gender: "Unisex", condition: "New", image: sneaker },
  { id: 11, name: "Lodestar Runner 'Graphite'", price: 165, category: "Running", gender: "Men", condition: "New", image: sneaker },
  { id: 12, name: "Lodestar Court 'Pearl'", price: 145, category: "Lifestyle", gender: "Women", condition: "New", image: sneaker },
  // Pre-loved / thrifted collection — gently used, quality-checked pairs.
  { id: 13, name: "Lodestar Low 'Vintage Black'", price: 95, category: "Lifestyle", gender: "Unisex", condition: "Pre-loved", image: sneaker },
  { id: 14, name: "Lodestar Runner 'Worn Onyx'", price: 85, category: "Running", gender: "Men", condition: "Pre-loved", image: sneaker },
  { id: 15, name: "Lodestar High 'Faded Slate'", price: 110, category: "High tops", gender: "Women", condition: "Pre-loved", image: sneaker },
  { id: 16, name: "Lodestar Court 'Broken-in Fog'", price: 78, category: "Lifestyle", gender: "Unisex", condition: "Pre-loved", image: sneaker },
];

export const CATEGORIES = ["All", "Lifestyle", "Running", "High tops"];
export const CONDITIONS = ["All", "New", "Pre-loved"] as const;
export const SIZES = ["Any size", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
export const PRICE_RANGES = ["Any price", "Under $150", "$150 – $180", "$180+"];
