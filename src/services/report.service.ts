import { api, handleApiError } from '@/shared';
import {
  ReportParams,
  GetUsersReportResponse,
  GetListingsReportResponse,
  GetRevenueReportResponse,
  GetSalesReportResponse,
  GetSubscriptionsReportResponse,
  GetPopularBrandsResponse,
} from '@/interfaces';

export const reportService = {
  getUsers: async (params?: ReportParams): Promise<GetUsersReportResponse> => {
    try {
      const response = await api.get<GetUsersReportResponse>(
        '/admin/reports/users',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getListings: async (
    params?: ReportParams,
  ): Promise<GetListingsReportResponse> => {
    try {
      const response = await api.get<GetListingsReportResponse>(
        '/admin/reports/listings',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRevenue: async (
    params?: ReportParams,
  ): Promise<GetRevenueReportResponse> => {
    try {
      const response = await api.get<GetRevenueReportResponse>(
        '/admin/reports/revenue',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSales: async (
    params?: ReportParams & { page?: number; per_page?: number },
  ): Promise<GetSalesReportResponse> => {
    try {
      const response = await api.get<GetSalesReportResponse>(
        '/admin/reports/sales',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSubscriptions: async (
    params?: ReportParams,
  ): Promise<GetSubscriptionsReportResponse> => {
    try {
      const response = await api.get<GetSubscriptionsReportResponse>(
        '/admin/reports/subscriptions',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPopularBrands: async (
    params?: ReportParams,
  ): Promise<GetPopularBrandsResponse> => {
    try {
      const response = await api.get<GetPopularBrandsResponse>(
        '/admin/reports/popular-brands',
        { params },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
