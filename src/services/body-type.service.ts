import { api, handleApiError } from '@/shared';
import {
  GetBodyTypesResponse,
  GetBodyTypeResponse,
  CreateBodyTypeRequest,
  CreateBodyTypeResponse,
  UpdateBodyTypeRequest,
  UpdateBodyTypeResponse,
  DeleteBodyTypeResponse,
} from '@/interfaces';

export const bodyTypeService = {
  // Body Type operations
  getAll: async (): Promise<GetBodyTypesResponse> => {
    try {
      const response = await api.get<GetBodyTypesResponse>('/admin/body-types');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetBodyTypeResponse> => {
    try {
      const response = await api.get<GetBodyTypeResponse>(
        `/admin/body-types/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (
    data: CreateBodyTypeRequest,
  ): Promise<CreateBodyTypeResponse> => {
    try {
      const response = await api.post<CreateBodyTypeResponse>(
        '/admin/body-types',
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: UpdateBodyTypeRequest,
  ): Promise<UpdateBodyTypeResponse> => {
    try {
      const response = await api.put<UpdateBodyTypeResponse>(
        `/admin/body-types/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<DeleteBodyTypeResponse> => {
    try {
      const response = await api.delete<DeleteBodyTypeResponse>(
        `/admin/body-types/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
