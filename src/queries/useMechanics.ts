import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { RejectMechanicRequest, MechanicQueryParams } from '@/interfaces';
import { mechanicService } from '@/services';

export const useMechanics = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetMechanics = (params: MechanicQueryParams = {}) => {
    return useQuery({
      queryKey: ['mechanics', params],
      queryFn: () => mechanicService.getAll(params),
    });
  };

  const useGetPendingMechanics = (params: MechanicQueryParams = {}) => {
    return useQuery({
      queryKey: ['mechanics', 'pending', params],
      queryFn: () => mechanicService.getPending(params),
    });
  };

  // Mutations
  const verifyMechanicMutation = useMutation({
    mutationFn: (id: string) => mechanicService.verify(id),
    onSuccess: () => {
      toast.success('Mechanic verified successfully');
      queryClient.invalidateQueries({ queryKey: ['mechanics'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to verify mechanic');
    },
  });

  const rejectMechanicMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RejectMechanicRequest }) =>
      mechanicService.reject(id, data),
    onSuccess: () => {
      toast.success('Mechanic rejected successfully');
      queryClient.invalidateQueries({ queryKey: ['mechanics'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reject mechanic');
    },
  });

  const deleteMechanicMutation = useMutation({
    mutationFn: (id: string) => mechanicService.delete(id),
    onSuccess: () => {
      toast.success('Mechanic deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['mechanics'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete mechanic');
    },
  });

  return {
    useGetMechanics,
    useGetPendingMechanics,

    verifyMechanic: verifyMechanicMutation.mutateAsync,
    verifyMechanicStatus: verifyMechanicMutation.status,
    verifyMechanicError: verifyMechanicMutation.error,
    verifyMechanicPending: verifyMechanicMutation.isPending,

    rejectMechanic: rejectMechanicMutation.mutateAsync,
    rejectMechanicStatus: rejectMechanicMutation.status,
    rejectMechanicError: rejectMechanicMutation.error,
    rejectMechanicPending: rejectMechanicMutation.isPending,

    deleteMechanic: deleteMechanicMutation.mutateAsync,
    deleteMechanicStatus: deleteMechanicMutation.status,
    deleteMechanicError: deleteMechanicMutation.error,
    deleteMechanicPending: deleteMechanicMutation.isPending,
  };
};
