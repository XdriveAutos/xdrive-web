import { api, handleApiError } from '@/shared';
import { GetReviewsResponse } from '@/interfaces';

export const reviewService = {
  getAll: async (page = 1, perPage = 20): Promise<GetReviewsResponse> => {
    try {
      const response = await api.get<GetReviewsResponse>('/admin/reviews', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getFlagged: async (page = 1, perPage = 20): Promise<GetReviewsResponse> => {
    try {
      const response = await api.get<GetReviewsResponse>(
        '/admin/reviews/flagged',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/reviews/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  flag: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/reviews/${id}/flag`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  unflag: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/reviews/${id}/unflag`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
