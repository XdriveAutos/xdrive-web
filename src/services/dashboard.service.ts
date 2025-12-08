import { api, handleApiError } from '@/shared';
import {
  GetDashboardStatsResponse,
  GetRevenueAnalyticsResponse,
  GetUserGrowthResponse,
  GetListingsStatsResponse,
  GetSubscriptionsStatsResponse,
} from '@/interfaces';

export const dashboardService = {
  getStats: async (): Promise<GetDashboardStatsResponse> => {
    try {
      const response =
        await api.get<GetDashboardStatsResponse>('/admin/dashboard');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getRevenueAnalytics: async (): Promise<GetRevenueAnalyticsResponse> => {
    try {
      const response = await api.get<GetRevenueAnalyticsResponse>(
        '/admin/dashboard/revenue',
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getUsersGrowth: async (): Promise<GetUserGrowthResponse> => {
    try {
      const response = await api.get<GetUserGrowthResponse>(
        '/admin/dashboard/users-growth',
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getListingsStats: async (): Promise<GetListingsStatsResponse> => {
    try {
      const response = await api.get<GetListingsStatsResponse>(
        '/admin/dashboard/listings-stats',
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getSubscriptionsStats: async (): Promise<GetSubscriptionsStatsResponse> => {
    try {
      const response = await api.get<GetSubscriptionsStatsResponse>(
        '/admin/dashboard/subscriptions-stats',
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
