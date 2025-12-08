import { api, handleApiError } from '@/shared';
import {
  GetSubscriptionsResponse,
  GetSubscriptionResponse,
  ExtendSubscriptionRequest,
} from '@/interfaces';

export const subscriptionService = {
  getAll: async (page = 1, perPage = 20): Promise<GetSubscriptionsResponse> => {
    try {
      const response = await api.get<GetSubscriptionsResponse>(
        '/admin/subscriptions',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getExpiringSoon: async (
    page = 1,
    perPage = 20,
  ): Promise<GetSubscriptionsResponse> => {
    try {
      const response = await api.get<GetSubscriptionsResponse>(
        '/admin/subscriptions/expiring-soon',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getExpired: async (
    page = 1,
    perPage = 20,
  ): Promise<GetSubscriptionsResponse> => {
    try {
      const response = await api.get<GetSubscriptionsResponse>(
        '/admin/subscriptions/expired',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getByUser: async (userId: string): Promise<GetSubscriptionsResponse> => {
    try {
      const response = await api.get<GetSubscriptionsResponse>(
        `/admin/subscriptions/user/${userId}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetSubscriptionResponse> => {
    try {
      const response = await api.get<GetSubscriptionResponse>(
        `/admin/subscriptions/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  cancel: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/subscriptions/${id}/cancel`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  extend: async (
    id: string,
    data: ExtendSubscriptionRequest,
  ): Promise<void> => {
    try {
      await api.post(`/admin/subscriptions/${id}/extend`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
