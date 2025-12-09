import { api, handleApiError } from '@/shared';
import {
  BroadcastNotificationRequest,
  SendNotificationRequest,
  GetNotificationsResponse,
} from '@/interfaces';

export const notificationService = {
  broadcast: async (data: BroadcastNotificationRequest): Promise<void> => {
    try {
      await api.post('/admin/notifications/broadcast', data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  sendToUser: async (
    userId: string,
    data: SendNotificationRequest,
  ): Promise<void> => {
    try {
      await api.post(`/admin/notifications/user/${userId}`, data);
    } catch (error) {
      throw handleApiError(error);
    }
  },

  getAll: async (page = 1, perPage = 20): Promise<GetNotificationsResponse> => {
    try {
      const response = await api.get<GetNotificationsResponse>(
        '/admin/notifications',
        {
          params: { page, per_page: perPage },
        },
      );
      return response.data;
    } catch (error) {
      throw handleApiError(error);
    }
  },
};
