import type { BaseResponse, PaginatedData } from './base';

export interface ReportParams {
  format?: 'json' | 'csv' | 'pdf';
  from?: string | null;
  to?: string | null;
}

export interface UsersReport {
  total_users: number;
  new_users: number;
  active_users: number;
  admins: number;
  mechanics: number;
  workshops: number;
  regular_users: number;
}

export interface ListingsReport {
  total_listings: number;
  new_listings: number;
  active_listings: number;
  sold_listings: number;
  pending_listings: number;
  by_body_type: Record<string, number>;
}

export interface RevenueReport {
  total_revenue: number;
  by_currency: any[]; // Specific structure unknown from example
  refunds: number;
}

// Placeholder for sales transaction
export interface SaleTransaction {
  id: string;
  [key: string]: any;
}

export interface SalesReport extends PaginatedData<SaleTransaction> {}

export interface SubscriptionsReport {
  total: number;
  active: number;
  canceled: number;
  by_plan: any[]; // Specific structure unknown
}

export interface PopularBrandItem {
  brand: string;
  listings: number;
}

// Response types
export type GetUsersReportResponse = BaseResponse<UsersReport>;
export type GetListingsReportResponse = BaseResponse<ListingsReport>;
export type GetRevenueReportResponse = BaseResponse<RevenueReport>;
export type GetSalesReportResponse = BaseResponse<SalesReport>;
export type GetSubscriptionsReportResponse = BaseResponse<SubscriptionsReport>;
export type GetPopularBrandsResponse = BaseResponse<PopularBrandItem[]>;
