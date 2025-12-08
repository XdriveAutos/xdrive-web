import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { maintenanceService } from '@/services';

export const useMaintenance = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetMaintenanceStatus = () => {
    return useQuery({
      queryKey: ['maintenance', 'status'],
      queryFn: () => maintenanceService.getStatus(),
    });
  };

  // Mutations
  const toggleMaintenanceModeMutation = useMutation({
    mutationFn: () => maintenanceService.toggleMode(),
    onSuccess: () => {
      toast.success('Maintenance mode toggled successfully');
      queryClient.invalidateQueries({ queryKey: ['maintenance', 'status'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to toggle maintenance mode');
    },
  });

  const clearCacheMutation = useMutation({
    mutationFn: () => maintenanceService.clearCache(),
    onSuccess: () => {
      toast.success('Cache cleared successfully');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to clear cache');
    },
  });

  return {
    useGetMaintenanceStatus,

    toggleMaintenanceMode: toggleMaintenanceModeMutation.mutateAsync,
    toggleMaintenanceModeStatus: toggleMaintenanceModeMutation.status,
    toggleMaintenanceModeError: toggleMaintenanceModeMutation.error,
    toggleMaintenanceModePending: toggleMaintenanceModeMutation.isPending,

    clearCache: clearCacheMutation.mutateAsync,
    clearCacheStatus: clearCacheMutation.status,
    clearCacheError: clearCacheMutation.error,
    clearCachePending: clearCacheMutation.isPending,
  };
};
