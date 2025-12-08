import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  CreateCarModelRequest,
  UpdateCarModelRequest,
} from '@/interfaces';
import { carModelService } from '@/services';

export const useCarModel = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetCarModels = (brandId: string) => {
    return useQuery({
      queryKey: ['car-models', brandId],
      queryFn: () => carModelService.getByBrand(brandId),
      enabled: !!brandId,
    });
  };

  // Mutations
  const createCarModelMutation = useMutation({
    mutationFn: ({
      brandId,
      data,
    }: {
      brandId: string;
      data: CreateCarModelRequest;
    }) => carModelService.create(brandId, data),
    onSuccess: (_, variables) => {
      toast.success('Car model created successfully');
      queryClient.invalidateQueries({
        queryKey: ['car-models', variables.brandId],
      });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create car model');
    },
  });

  const updateCarModelMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCarModelRequest }) =>
      carModelService.update(id, data),
    onSuccess: () => {
      toast.success('Car model updated successfully');
      // We need to invalidate the specific list, but we might not have brandId here easily unless we pass it or invalidate all models
      // Invalidating all car-models queries is safer
      queryClient.invalidateQueries({ queryKey: ['car-models'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update car model');
    },
  });

  const deleteCarModelMutation = useMutation({
    mutationFn: (id: string) => carModelService.delete(id),
    onSuccess: () => {
      toast.success('Car model deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['car-models'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete car model');
    },
  });

  return {
    useGetCarModels,
    createCarModel: createCarModelMutation.mutateAsync,
    createCarModelStatus: createCarModelMutation.status,
    createCarModelError: createCarModelMutation.error,
    updateCarModel: updateCarModelMutation.mutateAsync,
    updateCarModelStatus: updateCarModelMutation.status,
    updateCarModelError: updateCarModelMutation.error,
    deleteCarModel: deleteCarModelMutation.mutateAsync,
    deleteCarModelStatus: deleteCarModelMutation.status,
    deleteCarModelError: deleteCarModelMutation.error,
  };
};
