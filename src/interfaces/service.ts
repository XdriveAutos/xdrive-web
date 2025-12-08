import type { BaseResponse } from './base';

export interface Service {
  id: string;
  name: string;
  icon: string | null;
  description: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Request types
export interface CreateServiceRequest {
  name: string;
  icon?: string | null;
  description?: string;
  is_active?: boolean;
}

export interface UpdateServiceRequest {
  name?: string;
  icon?: string | null;
  description?: string;
  is_active?: boolean;
}

// Response types
// API returns a direct array in data, not paginated
export type GetServicesResponse = BaseResponse<Service[]>;
export type GetServiceResponse = BaseResponse<Service>;
export type CreateServiceResponse = BaseResponse<Service>;
export type UpdateServiceResponse = BaseResponse<Service>;
