import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  CreateBodyTypeRequest,
  UpdateBodyTypeRequest,
} from '@/interfaces';
import { bodyTypeService } from '@/services';

export const useBodyType = () => {
  const queryClient = useQueryClient();

  // Queries
  const useGetBodyTypes = () => {
    return useQuery({
      queryKey: ['body-types'],
      queryFn: () => bodyTypeService.getAll(),
    });
  };

  const useGetBodyType = (id: string) => {
    return useQuery({
      queryKey: ['body-types', id],
      queryFn: () => bodyTypeService.getById(id),
      enabled: !!id,
    });
  };

  // Mutations
  const createBodyTypeMutation = useMutation({
    mutationFn: (data: CreateBodyTypeRequest) => bodyTypeService.create(data),
    onSuccess: () => {
      toast.success('Body type created successfully');
      queryClient.invalidateQueries({ queryKey: ['body-types'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create body type');
    },
  });

  const updateBodyTypeMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBodyTypeRequest }) =>
      bodyTypeService.update(id, data),
    onSuccess: () => {
      toast.success('Body type updated successfully');
      queryClient.invalidateQueries({ queryKey: ['body-types'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update body type');
    },
  });

  const deleteBodyTypeMutation = useMutation({
    mutationFn: (id: string) => bodyTypeService.delete(id),
    onSuccess: () => {
      toast.success('Body type deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['body-types'] });
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete body type');
    },
  });

  return {
    useGetBodyTypes,
    useGetBodyType,
    createBodyType: createBodyTypeMutation.mutateAsync,
    createBodyTypeStatus: createBodyTypeMutation.status,
    createBodyTypeError: createBodyTypeMutation.error,
    createBodyTypePending: createBodyTypeMutation.isPending,
    updateBodyType: updateBodyTypeMutation.mutateAsync,
    updateBodyTypeStatus: updateBodyTypeMutation.status,
    updateBodyTypeError: updateBodyTypeMutation.error,
    updateBodyTypePending: updateBodyTypeMutation.isPending,
    deleteBodyType: deleteBodyTypeMutation.mutateAsync,
    deleteBodyTypeStatus: deleteBodyTypeMutation.status,
    deleteBodyTypeError: deleteBodyTypeMutation.error,
    deleteBodyTypePending: deleteBodyTypeMutation.isPending,
  };
};
