import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { notificationService } from '@/services';
import type {
  BroadcastNotificationRequest,
  SendNotificationRequest,
} from '@/interfaces';

export const useNotifications = (page = 1, perPage = 20) => {
  // Query
  const notificationsQuery = useQuery({
    queryKey: ['notifications', page, perPage],
    queryFn: () => notificationService.getAll(page, perPage),
  });

  // Mutations
  const broadcastNotificationMutation = useMutation({
    mutationFn: (data: BroadcastNotificationRequest) =>
      notificationService.broadcast(data),
    onSuccess: () => {
      toast.success('Notification broadcasted');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to broadcast notification');
    },
  });

  const sendNotificationMutation = useMutation({
    mutationFn: ({
      userId,
      data,
    }: {
      userId: string;
      data: SendNotificationRequest;
    }) => notificationService.sendToUser(userId, data),
    onSuccess: () => {
      toast.success('Notification sent');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send notification');
    },
  });

  return {
    notifications: notificationsQuery.data,
    notificationsLoading: notificationsQuery.isLoading,
    notificationsError: notificationsQuery.error,

    broadcastNotification: broadcastNotificationMutation.mutateAsync,
    broadcastNotificationStatus: broadcastNotificationMutation.status,
    broadcastNotificationError: broadcastNotificationMutation.error,
    broadcastNotificationPending: broadcastNotificationMutation.isPending,

    sendNotification: sendNotificationMutation.mutateAsync,
    sendNotificationStatus: sendNotificationMutation.status,
    sendNotificationError: sendNotificationMutation.error,
    sendNotificationPending: sendNotificationMutation.isPending,
  };
};
