/**
 * Types & Enums for LifeOnPlus Platform
 */

export type Region = 'india' | 'international';

export type ProductGroup = 'digital-emergency' | 'preventive';

export interface ProductItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  bannerUrl?: string;
  badge?: string;
  linkText?: string;
  pricing?: {
    india: string;
    international: string;
  };
}

export interface B2BTrack {
  id: 'vendor' | 'provider' | 'franchise' | 'referral';
  title: string;
  description: string;
  tagline: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  group: 'general' | 'records' | 'partner' | 'card';
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  tag?: string;
}
