import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { subscriptionService } from '@/services';
import type { ExtendSubscriptionRequest } from '@/interfaces';

export const useSubscriptions = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetSubscriptions = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['subscriptions', page, perPage],
      queryFn: () => subscriptionService.getAll(page, perPage),
    });
  };

  const useGetExpiringSoonSubscriptions = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['subscriptions', 'expiring-soon', page, perPage],
      queryFn: () => subscriptionService.getExpiringSoon(page, perPage),
    });
  };

  const useGetExpiredSubscriptions = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['subscriptions', 'expired', page, perPage],
      queryFn: () => subscriptionService.getExpired(page, perPage),
    });
  };

  const useGetUserSubscriptions = (userId: string) => {
    return useQuery({
      queryKey: ['subscriptions', 'user', userId],
      queryFn: () => subscriptionService.getByUser(userId),
      enabled: !!userId,
    });
  };

  const useGetSubscription = (id: string) => {
    return useQuery({
      queryKey: ['subscriptions', id],
      queryFn: () => subscriptionService.getById(id),
      enabled: !!id,
    });
  };

  // Mutations
  const cancelSubscriptionMutation = useMutation({
    mutationFn: (id: string) => subscriptionService.cancel(id),
    onSuccess: (_, id) => {
      toast.success('Subscription canceled successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({ queryKey: ['subscriptions', id] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to cancel subscription');
    },
  });

  const extendSubscriptionMutation = useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: ExtendSubscriptionRequest;
    }) => subscriptionService.extend(id, data),
    onSuccess: (_, variables) => {
      toast.success('Subscription extended successfully');
      queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
      queryClient.invalidateQueries({
        queryKey: ['subscriptions', variables.id],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to extend subscription');
    },
  });

  return {
    useGetSubscriptions,
    useGetExpiringSoonSubscriptions,
    useGetExpiredSubscriptions,
    useGetUserSubscriptions,
    useGetSubscription,

    cancelSubscription: cancelSubscriptionMutation.mutateAsync,
    cancelSubscriptionStatus: cancelSubscriptionMutation.status,
    cancelSubscriptionError: cancelSubscriptionMutation.error,
    cancelSubscriptionPending: cancelSubscriptionMutation.isPending,

    extendSubscription: extendSubscriptionMutation.mutateAsync,
    extendSubscriptionStatus: extendSubscriptionMutation.status,
    extendSubscriptionError: extendSubscriptionMutation.error,
    extendSubscriptionPending: extendSubscriptionMutation.isPending,
  };
};
