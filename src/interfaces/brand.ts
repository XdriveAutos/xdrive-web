import type { BaseResponse, PaginatedData } from './base';
import { CarModel } from './car-model';

export interface Car {
  id: string;
  title: string;
  qr_code_url: string | null;
  slug: string | null;
  description: string;
  year_of_manufacture: number;
  trim: string;
  color: string;
  condition: string;
  second_condition: string;
  transmission: string;
  mileage: number;
  fuel_type: string;
  gear_type: string;
  engine_size: string;
  horse_power: string;
  number_of_seats: number;
  key_features: string;
  registered_car: string;
  my_chasis_number: string;
  price: string;
  price_negotiable: string;
  listing_type: string;
  swap_method: string;
  swap_with: string | null;
  status: string;
  rejection_reason: string | null;
  is_featured: boolean;
  flagged: number;
  views_count: number;
  sold_at: string | null;
  featured_until: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  car_models?: CarModel[];
  cars?: Car[];
}

// Request types
export interface CreateBrandRequest {
  name: string;
  is_active?: boolean;
  logo?: File | null;
}

export interface UpdateBrandRequest {
  name?: string;
  is_active?: boolean;
  logo?: File | null;
}

// Response types
export type GetBrandsResponse = BaseResponse<PaginatedData<Brand>>;
export type GetBrandResponse = BaseResponse<Brand>;
export type CreateBrandResponse = BaseResponse<Brand>;
export type UpdateBrandResponse = BaseResponse<Brand>;
export type DeleteBrandResponse = BaseResponse;

export interface UploadBrandLogoRequest {
  logo: File;
}

export type UploadBrandLogoResponse = BaseResponse<{ logo: string }>;
