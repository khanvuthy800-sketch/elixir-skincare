/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  category: string;
  tag?: string;
  price: number; // in JPY (¥)
  image: string;
  description: string;
  briefDescription: string;
  rating: number;
  reviewsCount: number;
  ingredients: string[];
  ritual: string[];
  skinBenefits: string[];
  branch?: string; // Brand Series Branch (e.g., "Elixir Superieur", "Elixir White", "Elixir Advanced")
  stores?: string[]; // Physical Store Branches (e.g., "Tokyo Flagship (Ginza)", "Kyoto Boutique", "Osaka Hub")
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  skinType: string;
}

export interface QuizQuestion {
  id: number;
  key: "skinType" | "concern" | "texture";
  question: string;
  description: string;
  options: {
    value: string;
    label: string;
    detail: string;
    icon: string;
  }[];
}

export interface QuizResult {
  regimenName: string;
  tagline: string;
  recommendedProductIds: string[];
  explanation: string;
  morningSteps: string[];
  eveningSteps: string[];
}
