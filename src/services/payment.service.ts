import { api, handleApiError } from '@/shared';
import {
  GetPaymentsResponse,
  GetPaymentResponse,
  RefundPaymentRequest,
} from '@/interfaces';

export const paymentService = {
  getAll: async (page = 1, perPage = 20): Promise<GetPaymentsResponse> => {
    try {
      const response = await api.get<GetPaymentsResponse>('/admin/payments', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPending: async (page = 1, perPage = 20): Promise<GetPaymentsResponse> => {
    try {
      const response = await api.get<GetPaymentsResponse>(
        '/admin/payments/pending',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getFailed: async (page = 1, perPage = 20): Promise<GetPaymentsResponse> => {
    try {
      const response = await api.get<GetPaymentsResponse>(
        '/admin/payments/failed',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetPaymentResponse> => {
    try {
      const response = await api.get<GetPaymentResponse>(
        `/admin/payments/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  refund: async (id: string, data?: RefundPaymentRequest): Promise<void> => {
    try {
      await api.post(`/admin/payments/${id}/refund`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
