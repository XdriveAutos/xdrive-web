import { api, handleApiError } from '@/shared';
import {
  GetCarsResponse,
  GetCarResponse,
  UpdateCarRequest,
  RejectCarRequest,
  CarQueryParams,
} from '@/interfaces';

export const carService = {
  getAll: async (params: CarQueryParams = {}): Promise<GetCarsResponse> => {
    try {
      const queryParams = new URLSearchParams();
      if (!params.page) queryParams.set('page', '1');
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.set(key, value.toString());
        }
      });

      const response = await api.get<GetCarsResponse>(
        `/admin/cars?${queryParams.toString()}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getPending: async (): Promise<GetCarsResponse> => {
    try {
      const response = await api.get<GetCarsResponse>('/admin/cars/pending');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getFlagged: async (): Promise<GetCarsResponse> => {
    try {
      const response = await api.get<GetCarsResponse>('/admin/cars/flagged');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetCarResponse> => {
    try {
      const response = await api.get<GetCarResponse>(`/admin/cars/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: UpdateCarRequest,
  ): Promise<GetCarResponse> => {
    try {
      const response = await api.put<GetCarResponse>(`/admin/cars/${id}`, data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/cars/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  approve: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/cars/${id}/approve`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  reject: async (id: string, data: RejectCarRequest): Promise<void> => {
    try {
      await api.post(`/admin/cars/${id}/reject`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  feature: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/cars/${id}/feature`);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  unfeature: async (id: string): Promise<void> => {
    try {
      await api.post(`/admin/cars/${id}/unfeature`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
