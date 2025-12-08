import { api, handleApiError } from '@/shared';
import type {
  GetPlansResponse,
  GetPlanResponse,
  CreatePlanRequest,
  CreatePlanResponse,
  UpdatePlanRequest,
  UpdatePlanResponse,
  DeletePlanResponse,
  ActivatePlanResponse,
  DeactivatePlanResponse,
  GetPlanFeaturesResponse,
  AddPlanFeatureRequest,
  AddPlanFeatureResponse,
  UpdatePlanFeatureRequest,
  UpdatePlanFeatureResponse,
  DeletePlanFeatureResponse,
} from '@/interfaces';

export const planService = {
  // Plan operations
  getAll: async (): Promise<GetPlansResponse> => {
    try {
      const response = await api.get<GetPlansResponse>('/admin/plans');
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getById: async (id: string): Promise<GetPlanResponse> => {
    try {
      const response = await api.get<GetPlanResponse>(`/admin/plans/${id}`);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  create: async (data: CreatePlanRequest): Promise<CreatePlanResponse> => {
    try {
      const response = await api.post<CreatePlanResponse>('/admin/plans', data);
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  update: async (
    id: string,
    data: UpdatePlanRequest,
  ): Promise<UpdatePlanResponse> => {
    try {
      const response = await api.put<UpdatePlanResponse>(
        `/admin/plans/${id}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  delete: async (id: string): Promise<DeletePlanResponse> => {
    try {
      const response = await api.delete<DeletePlanResponse>(
        `/admin/plans/${id}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  activate: async (id: string): Promise<ActivatePlanResponse> => {
    try {
      const response = await api.post<ActivatePlanResponse>(
        `/admin/plans/${id}/activate`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deactivate: async (id: string): Promise<DeactivatePlanResponse> => {
    try {
      const response = await api.post<DeactivatePlanResponse>(
        `/admin/plans/${id}/deactivate`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  // Plan features operations
  getFeatures: async (planId: string): Promise<GetPlanFeaturesResponse> => {
    try {
      const response = await api.get<GetPlanFeaturesResponse>(
        `/admin/plans/${planId}/features`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  addFeature: async (
    planId: string,
    data: AddPlanFeatureRequest,
  ): Promise<AddPlanFeatureResponse> => {
    try {
      const response = await api.post<AddPlanFeatureResponse>(
        `/admin/plans/${planId}/features`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  updateFeature: async (
    planId: string,
    featureId: string,
    data: UpdatePlanFeatureRequest,
  ): Promise<UpdatePlanFeatureResponse> => {
    try {
      const response = await api.put<UpdatePlanFeatureResponse>(
        `/admin/plans/${planId}/features/${featureId}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  deleteFeature: async (
    planId: string,
    featureId: string,
  ): Promise<DeletePlanFeatureResponse> => {
    try {
      const response = await api.delete<DeletePlanFeatureResponse>(
        `/admin/plans/${planId}/features/${featureId}`,
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
