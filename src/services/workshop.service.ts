import { api, handleApiError } from '@/shared';
import { GetWorkshopsResponse, RejectWorkshopRequest } from '@/interfaces';

export const workshopService = {
  getAll: async (page = 1, perPage = 20): Promise<GetWorkshopsResponse> => {
    try {
      const response = await api.get<GetWorkshopsResponse>('/admin/workshops', {
        params: { page, per_page: perPage },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPending: async (page = 1, perPage = 20): Promise<GetWorkshopsResponse> => {
    try {
      const response = await api.get<GetWorkshopsResponse>(
        '/admin/workshops/pending',
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
      await api.post(`/admin/workshops/${id}/verify`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  reject: async (id: string, data: RejectWorkshopRequest): Promise<void> => {
    try {
      await api.post(`/admin/workshops/${id}/reject`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/workshops/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
