import type { BaseResponse, PaginatedData } from './base';
import type { CarOwner } from './cars';

export interface Reviewable {
  id: string;
  type: string; // 'workshop' | 'mechanic' or others
  name: string | null;
  [key: string]: any; // Allow other properties like address, years_of_experience, etc.
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  flagged: number;
  flagged_at: string | null;
  created_at: string;
  user: CarOwner;
  reviewable: Reviewable;
}

// Response types
export type GetReviewsResponse = BaseResponse<PaginatedData<Review>>;
