import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { paymentService } from '@/services';
import type { RefundPaymentRequest } from '@/interfaces';

export const usePayments = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetPayments = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['payments', page, perPage],
      queryFn: () => paymentService.getAll(page, perPage),
    });
  };

  const useGetPendingPayments = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['payments', 'pending', page, perPage],
      queryFn: () => paymentService.getPending(page, perPage),
    });
  };

  const useGetFailedPayments = (page = 1, perPage = 20) => {
    return useQuery({
      queryKey: ['payments', 'failed', page, perPage],
      queryFn: () => paymentService.getFailed(page, perPage),
    });
  };

  const useGetPayment = (id: string) => {
    return useQuery({
      queryKey: ['payments', id],
      queryFn: () => paymentService.getById(id),
      enabled: !!id,
    });
  };

  // Mutations
  const refundPaymentMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data?: RefundPaymentRequest }) =>
      paymentService.refund(id, data),
    onSuccess: (_, variables) => {
      toast.success('Payment refunded successfully');
      queryClient.invalidateQueries({ queryKey: ['payments'] });
      queryClient.invalidateQueries({ queryKey: ['payments', variables.id] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to refund payment');
    },
  });

  return {
    useGetPayments,
    useGetPendingPayments,
    useGetFailedPayments,
    useGetPayment,

    refundPayment: refundPaymentMutation.mutateAsync,
    refundPaymentStatus: refundPaymentMutation.status,
    refundPaymentError: refundPaymentMutation.error,
    refundPaymentPending: refundPaymentMutation.isPending,
  };
};
