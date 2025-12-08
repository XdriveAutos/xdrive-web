import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { notificationService } from '@/services';
import type {
  BroadcastNotificationRequest,
  SendNotificationRequest,
} from '@/interfaces';

export const useNotifications = () => {
  // Mutations
  const broadcastNotificationMutation = useMutation({
    mutationFn: (data: BroadcastNotificationRequest) =>
      notificationService.broadcast(data),
    onSuccess: () => {
      toast.success('Notification broadcasted successfully');
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
      toast.success('Notification sent successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to send notification');
    },
  });

  return {
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
