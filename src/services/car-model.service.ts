import { api, handleApiError } from '@/shared';
import {
  GetCarModelsResponse,
  CreateCarModelRequest,
  CreateCarModelResponse,
  UpdateCarModelRequest,
  UpdateCarModelResponse,
  DeleteCarModelResponse,
} from '@/interfaces';

export const carModelService = {
  // Car Model operations
  getByBrand: async (brandId: string): Promise<GetCarModelsResponse> => {
    try {
      const response = await api.get<GetCarModelsResponse>(
        `/admin/brands/${brandId}/models`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (
    brandId: string,
    data: CreateCarModelRequest,
  ): Promise<CreateCarModelResponse> => {
    try {
      const response = await api.post<CreateCarModelResponse>(
        `/admin/brands/${brandId}/models`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: UpdateCarModelRequest,
  ): Promise<UpdateCarModelResponse> => {
    try {
      const response = await api.put<UpdateCarModelResponse>(
        `/admin/models/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<DeleteCarModelResponse> => {
    try {
      const response = await api.delete<DeleteCarModelResponse>(
        `/admin/models/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
