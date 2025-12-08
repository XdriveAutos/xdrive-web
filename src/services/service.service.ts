import { api, handleApiError } from '@/shared';
import {
  GetServicesResponse,
  GetServiceResponse,
  CreateServiceRequest,
  CreateServiceResponse,
  UpdateServiceRequest,
  UpdateServiceResponse,
} from '@/interfaces';

export const serviceService = {
  getAll: async (): Promise<GetServicesResponse> => {
    try {
      const response = await api.get<GetServicesResponse>('/admin/services');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetServiceResponse> => {
    try {
      const response = await api.get<GetServiceResponse>(
        `/admin/services/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (
    data: CreateServiceRequest,
  ): Promise<CreateServiceResponse> => {
    try {
      const response = await api.post<CreateServiceResponse>(
        '/admin/services',
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: UpdateServiceRequest,
  ): Promise<UpdateServiceResponse> => {
    try {
      const response = await api.put<UpdateServiceResponse>(
        `/admin/services/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/admin/services/${id}`);
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
