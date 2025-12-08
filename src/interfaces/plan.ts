import type { BaseResponse } from './base';

export type BillingCycle = 'monthly' | 'quarterly' | 'yearly';

export interface PlanFeature {
  id: string;
  plan_id: string;
  feature_name: string;
  feature_value: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface PlanSubscription {
  id: string;
  user_id: string;
  plan_id: string;
  status: 'active' | 'trial' | 'expired' | 'canceled';
  status_label: string;
  starts_at: string;
  ends_at: string;
  trial_ends_at: string | null;
  canceled_at: string | null;
  is_recurring: boolean;
  is_active: boolean;
  is_expired: boolean;
  is_on_trial: boolean;
  days_until_expiry: number;
}

export interface Plan {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  billing_cycle: BillingCycle;
  trial_days: number;
  is_active: boolean;
  sort_order: number;
  formatted_price: string;
  billing_cycle_label: string;
  price_per_month: number;
  formatted_price_per_month: string;
  has_trial: boolean;
  subscribers_count: number;
  created_at: string;
  updated_at: string;
  features: PlanFeature[];
  subscriptions?: PlanSubscription[];
}

// Request types
export interface CreatePlanFeatureRequest {
  name: string;
  value?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
}

export interface CreatePlanRequest {
  name: string;
  slug?: string | null;
  description?: string | null;
  price: number;
  billing_cycle: BillingCycle;
  trial_days?: number | null;
  is_active?: boolean | null;
  sort_order?: number | null;
  features?: CreatePlanFeatureRequest[] | null;
}

export interface UpdatePlanRequest {
  name?: string;
  slug?: string;
  description?: string | null;
  price?: number;
  billing_cycle?: BillingCycle;
  trial_days?: number | null;
  is_active?: boolean | null;
  sort_order?: number | null;
}

export interface AddPlanFeatureRequest {
  feature_name: string;
  feature_value?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
}

export interface UpdatePlanFeatureRequest {
  feature_name?: string;
  feature_value?: string | null;
  sort_order?: number | null;
  is_active?: boolean | null;
}

// Response types
export type GetPlansResponse = BaseResponse<Plan[]>;
export type GetPlanResponse = BaseResponse<Plan>;
export type CreatePlanResponse = BaseResponse<Plan>;
export type UpdatePlanResponse = BaseResponse<Plan>;
export type DeletePlanResponse = BaseResponse;
export type ActivatePlanResponse = BaseResponse<Plan>;
export type DeactivatePlanResponse = BaseResponse<Plan>;
export type GetPlanFeaturesResponse = BaseResponse<PlanFeature[]>;
export type AddPlanFeatureResponse = BaseResponse<PlanFeature>;
export type UpdatePlanFeatureResponse = BaseResponse<PlanFeature>;
export type DeletePlanFeatureResponse = BaseResponse;
