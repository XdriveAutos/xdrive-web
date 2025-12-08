import { api, handleApiError } from '@/shared';
import {
  BroadcastNotificationRequest,
  SendNotificationRequest,
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
};
