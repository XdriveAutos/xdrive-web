import { api, handleApiError } from '@/shared';
import {
  GetWorkshopsResponse,
  RejectWorkshopRequest,
  WorkshopQueryParams,
} from '@/interfaces';

export const workshopService = {
  getAll: async (
    params: WorkshopQueryParams = {},
  ): Promise<GetWorkshopsResponse> => {
    try {
      const response = await api.get<GetWorkshopsResponse>('/admin/workshops', {
        params: {
          page: params.page || 1,
          per_page: params.per_page || 20,
          ...params,
        },
      });
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPending: async (
    params: WorkshopQueryParams = {},
  ): Promise<GetWorkshopsResponse> => {
    try {
      const response = await api.get<GetWorkshopsResponse>(
        '/admin/workshops/pending',
        {
          params: {
            page: params.page || 1,
            per_page: params.per_page || 20,
            ...params,
          },
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
