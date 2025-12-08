import type { BaseResponse, PaginatedData } from './base';
import type { CarOwner, Car } from './cars';

export interface Comment {
  id: string;
  user_id: string;
  car_id: string;
  parent_id: string | null;
  content: string;
  flagged: number;
  flagged_at: string | null;
  created_at: string;
  updated_at: string;
  user: CarOwner;
  car: Car;
  likes_count: number;
  is_liked: boolean;
}

// Response types
export type GetCommentsResponse = BaseResponse<PaginatedData<Comment>>;
