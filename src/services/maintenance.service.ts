import { api, handleApiError } from '@/shared';
import { GetMaintenanceStatusResponse } from '@/interfaces';

export const maintenanceService = {
  getStatus: async (): Promise<GetMaintenanceStatusResponse> => {
    try {
      const response = await api.get<GetMaintenanceStatusResponse>(
        '/admin/maintenance/status',
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },

  toggleMode: async (): Promise<void> => {
    try {
      await api.post('/admin/maintenance/mode');
    } catch (error) {
      throw handleApiError(error);
    }
  },

  clearCache: async (): Promise<void> => {
    try {
      await api.post('/admin/cache/clear');
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
