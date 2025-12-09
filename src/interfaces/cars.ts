import type { BaseResponse, PaginatedData } from './base';
import type { Brand } from './brand';
import type { CarModel } from './car-model';
import type { BodyType } from './body-type';
import { User } from './users';

export interface CarImage {
  id: string;
  car_id: string;
  image_url: string;
  order: number;
  is_primary: boolean;
  created_at: string;
  updated_at: string;
}

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
  key_features: string; // JSON string
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
  is_approved: boolean;
  views_count: number;
  sold_at: string | null;
  featured_until: string | null;
  address: string;
  city: string;
  state: string;
  country: string;
  created_at: string;
  updated_at: string;

  // Relations
  user?: User;
  brand?: Brand;
  car_model?: CarModel;
  body_type?: BodyType;
  primary_image?: CarImage | null;
  images?: CarImage[];
}

// Responses
export type GetCarsResponse = BaseResponse<PaginatedData<Car>>;
export type GetCarResponse = BaseResponse<Car>;

// Requests
export interface UpdateCarRequest {
  title?: string;
  description?: string;
  brand_id?: string;
  car_model_id?: string;
  body_type_id?: string;
  year_of_manufacture?: number;
  trim?: string;
  color?: string;
  condition?: 'new' | 'used' | 'certified';
  second_condition?: 'Excellent' | 'Good' | 'Fair' | 'Salvage';
  transmission?:
    | 'automatic'
    | 'manual'
    | 'cvt'
    | 'dct'
    | 'semi_automatic'
    | 'sequential'
    | 'tiptronic'
    | 'dsg'
    | 'amt'
    | 'direct_shift'
    | 'e_cvt'
    | 'hybrid'
    | 'single_speed';
  mileage?: number;
  fuel_type?: 'petrol' | 'diesel' | 'electric' | 'hybrid';
  gear_type?: 'type_s' | 'type_a' | 'type_b';
  engine_size?: number;
  horse_power?: string;
  number_of_seats?: number;
  key_features?: string;
  registered_car?: string;
  my_chasis_number?: string;
  price?: number;
  price_negotiable?: 'negotiable' | 'fix_amount';
  listing_type?: 'sell' | 'swap';
  swap_method?: 'sell' | 'swap' | 'both';
  swap_with?: string;
  status?: 'active' | 'inactive' | 'sold' | 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  is_featured?: boolean;
  flagged?: boolean;
  is_approved?: boolean;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
}

export interface RejectCarRequest {
  reason: string;
}
