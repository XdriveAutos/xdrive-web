import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { RejectWorkshopRequest, WorkshopQueryParams } from '@/interfaces';
import { workshopService } from '@/services';

export const useWorkshops = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetWorkshops = (params: WorkshopQueryParams = {}) => {
    return useQuery({
      queryKey: ['workshops', params],
      queryFn: () => workshopService.getAll(params),
    });
  };

  const useGetPendingWorkshops = (params: WorkshopQueryParams = {}) => {
    return useQuery({
      queryKey: ['workshops', 'pending', params],
      queryFn: () => workshopService.getPending(params),
    });
  };

  // Mutations
  const verifyWorkshopMutation = useMutation({
    mutationFn: (id: string) => workshopService.verify(id),
    onSuccess: () => {
      toast.success('Workshop verified successfully');
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to verify workshop');
    },
  });

  const rejectWorkshopMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectWorkshopRequest }) =>
      workshopService.reject(id, data),
    onSuccess: () => {
      toast.success('Workshop rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reject workshop');
    },
  });

  const deleteWorkshopMutation = useMutation({
    mutationFn: (id: string) => workshopService.delete(id),
    onSuccess: () => {
      toast.success('Workshop deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['workshops'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete workshop');
    },
  });

  return {
    useGetWorkshops,
    useGetPendingWorkshops,

    verifyWorkshop: verifyWorkshopMutation.mutateAsync,
    verifyWorkshopStatus: verifyWorkshopMutation.status,
    verifyWorkshopError: verifyWorkshopMutation.error,
    verifyWorkshopPending: verifyWorkshopMutation.isPending,

    rejectWorkshop: rejectWorkshopMutation.mutateAsync,
    rejectWorkshopStatus: rejectWorkshopMutation.status,
    rejectWorkshopError: rejectWorkshopMutation.error,
    rejectWorkshopPending: rejectWorkshopMutation.isPending,

    deleteWorkshop: deleteWorkshopMutation.mutateAsync,
    deleteWorkshopStatus: deleteWorkshopMutation.status,
    deleteWorkshopError: deleteWorkshopMutation.error,
    deleteWorkshopPending: deleteWorkshopMutation.isPending,
  };
};
