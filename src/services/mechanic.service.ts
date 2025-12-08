import { api, handleApiError } from '@/shared';
import { GetMechanicsResponse, RejectMechanicRequest } from '@/interfaces';

export const mechanicService = {
  getAll: async (page = 1, perPage = 20): Promise<GetMechanicsResponse> => {
    try {
      const response = await api.get<GetMechanicsResponse>('/admin/mechanics', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPending: async (page = 1, perPage = 20): Promise<GetMechanicsResponse> => {
    try {
      const response = await api.get<GetMechanicsResponse>(
        '/admin/mechanics/pending',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  verify: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/mechanics/${id}/verify`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  reject: async (id: string, data: RejectMechanicRequest): Promise<void> => {
    try {
      await api.post(`/admin/mechanics/${id}/reject`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/mechanics/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
