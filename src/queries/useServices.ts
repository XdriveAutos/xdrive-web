import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type { CreateServiceRequest, UpdateServiceRequest } from '@/interfaces';
import { serviceService } from '@/services';

export const useServices = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetServices = () => {
    return useQuery({
      queryKey: ['services'],
      queryFn: () => serviceService.getAll(),
    });
  };

  const useGetService = (id: string) => {
    return useQuery({
      queryKey: ['services', id],
      queryFn: () => serviceService.getById(id),
      enabled: !!id,
    });
  };

  // Mutations
  const createServiceMutation = useMutation({
    mutationFn: (data: CreateServiceRequest) => serviceService.create(data),
    onSuccess: () => {
      toast.success('Service created successfully');
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create service');
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceRequest }) =>
      serviceService.update(id, data),
    onSuccess: (_, variables) => {
      toast.success('Service updated successfully');
      queryClient.invalidateQueries({ queryKey: ['services'] });
      queryClient.invalidateQueries({ queryKey: ['services', variables.id] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update service');
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: (id: string) => serviceService.delete(id),
    onSuccess: () => {
      toast.success('Service deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['services'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete service');
    },
  });

  return {
    useGetServices,
    useGetService,

    createService: createServiceMutation.mutateAsync,
    createServiceStatus: createServiceMutation.status,
    createServiceError: createServiceMutation.error,
    createServicePending: createServiceMutation.isPending,

    updateService: updateServiceMutation.mutateAsync,
    updateServiceStatus: updateServiceMutation.status,
    updateServiceError: updateServiceMutation.error,
    updateServicePending: updateServiceMutation.isPending,

    deleteService: deleteServiceMutation.mutateAsync,
    deleteServiceStatus: deleteServiceMutation.status,
    deleteServiceError: deleteServiceMutation.error,
    deleteServicePending: deleteServiceMutation.isPending,
  };
};
