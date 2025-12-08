import type { BaseResponse } from './base';

export interface DashboardStats {
  total_users: number;
  new_users_today: number;
  new_users_yesterday: number;
  active_users_last7d: number;
  total_listings: number;
  new_listings_today: number;
  active_listings: number;
  total_revenue: string;
  revenue_today: string;
  active_subscriptions: number;
  new_subscriptions_today: number;
}

export type RevenueAnalytics = Record<string, number>;

export type UserGrowthAnalytics = Record<string, number>;

export interface ListingsStats {
  new_listings: Record<string, number>;
  top_brands: Record<string, number>;
}

export interface SubscriptionsStats {
  active: number;
  expiring_soon: number;
  by_plan: Record<string, number>;
}

// Response types
export type GetDashboardStatsResponse = BaseResponse<DashboardStats>;
export type GetRevenueAnalyticsResponse = BaseResponse<RevenueAnalytics>;
export type GetUserGrowthResponse = BaseResponse<UserGrowthAnalytics>;
export type GetListingsStatsResponse = BaseResponse<ListingsStats>;
export type GetSubscriptionsStatsResponse = BaseResponse<SubscriptionsStats>;
