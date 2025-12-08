import { api, handleApiError } from '@/shared';
import { GetCommentsResponse } from '@/interfaces';

export const commentService = {
  getAll: async (page = 1, perPage = 20): Promise<GetCommentsResponse> => {
    try {
      const response = await api.get<GetCommentsResponse>('/admin/comments', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getFlagged: async (page = 1, perPage = 20): Promise<GetCommentsResponse> => {
    try {
      const response = await api.get<GetCommentsResponse>(
        '/admin/comments/flagged',
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
      await api.delete(`/admin/comments/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  flag: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/comments/${id}/flag`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  unflag: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/comments/${id}/unflag`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
