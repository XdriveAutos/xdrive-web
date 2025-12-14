import { api, handleApiError } from '@/shared';
import {
  GetMechanicsResponse,
  RejectMechanicRequest,
  MechanicQueryParams,
} from '@/interfaces';

export const mechanicService = {
  getAll: async (
    params: MechanicQueryParams = {},
  ): Promise<GetMechanicsResponse> => {
    try {
      const response = await api.get<GetMechanicsResponse>('/admin/mechanics', {
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
    params: MechanicQueryParams = {},
  ): Promise<GetMechanicsResponse> => {
    try {
      const response = await api.get<GetMechanicsResponse>(
        '/admin/mechanics/pending',
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
