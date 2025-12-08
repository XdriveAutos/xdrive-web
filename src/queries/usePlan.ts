import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import type {
  CreatePlanRequest,
  CreatePlanResponse,
  AddPlanFeatureRequest,
  AddPlanFeatureResponse,
  UpdatePlanRequest,
  UpdatePlanResponse,
  UpdatePlanFeatureRequest,
  UpdatePlanFeatureResponse,
} from '@/interfaces';
import { planService } from '@/services';

export const usePlan = (planId?: string | null) => {
  const queryClient = useQueryClient();

  // Query hooks
  const allPlansQuery = useQuery({
    queryKey: ['plans'],
    queryFn: () => planService.getAll(),
  });

  const planByIdQuery = useQuery({
    queryKey: ['plans', planId],
    queryFn: () => planService.getById(planId || ''),
    enabled: !!planId,
  });

  const planFeaturesQuery = useQuery({
    queryKey: ['plans', 'features', planId],
    queryFn: () => planService.getFeatures(planId || ''),
    enabled: !!planId,
  });

  // Plan mutations
  const createMutation = useMutation({
    mutationFn: (data: CreatePlanRequest) => planService.create(data),
    onSuccess: (data: CreatePlanResponse) => {
      toast.success(data.message || 'Plan created successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePlanRequest }) =>
      planService.update(id, data),
    onSuccess: (data: UpdatePlanResponse, variables) => {
      toast.success(data.message || 'Plan updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans', variables.id],
      });
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => planService.delete(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Plan deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const activateMutation = useMutation({
    mutationFn: (id: string) => planService.activate(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Plan activated successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const deactivateMutation = useMutation({
    mutationFn: (id: string) => planService.deactivate(id),
    onSuccess: (data) => {
      toast.success(data.message || 'Plan deactivated successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans'],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  // Feature mutations
  const addFeatureMutation = useMutation({
    mutationFn: (data: AddPlanFeatureRequest) =>
      planService.addFeature(planId || '', data),
    onSuccess: (data: AddPlanFeatureResponse) => {
      toast.success(data.message || 'Feature added successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans', 'features', planId],
      });
      queryClient.invalidateQueries({
        queryKey: ['plans', planId],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const updateFeatureMutation = useMutation({
    mutationFn: ({
      featureId,
      data,
    }: {
      featureId: string;
      data: UpdatePlanFeatureRequest;
    }) => planService.updateFeature(planId || '', featureId, data),
    onSuccess: (data: UpdatePlanFeatureResponse) => {
      toast.success(data.message || 'Feature updated successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans', 'features', planId],
      });
      queryClient.invalidateQueries({
        queryKey: ['plans', planId],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  const deleteFeatureMutation = useMutation({
    mutationFn: (featureId: string) =>
      planService.deleteFeature(planId || '', featureId),
    onSuccess: (data) => {
      toast.success(data.message || 'Feature deleted successfully');
      queryClient.invalidateQueries({
        queryKey: ['plans', 'features', planId],
      });
      queryClient.invalidateQueries({
        queryKey: ['plans', planId],
      });
    },
    onError: (error) => {
      throw error;
    },
  });

  return {
    // Queries
    allPlans: allPlansQuery.data,
    allPlansLoading: allPlansQuery.isLoading,
    allPlansError: allPlansQuery.error,

    planById: planByIdQuery.data,
    planByIdLoading: planByIdQuery.isLoading,
    planByIdError: planByIdQuery.error,

    planFeatures: planFeaturesQuery.data,
    planFeaturesLoading: planFeaturesQuery.isLoading,
    planFeaturesError: planFeaturesQuery.error,

    // Plan mutations
    create: createMutation.mutateAsync,
    createStatus: createMutation.status,
    createError: createMutation.error,

    update: updateMutation.mutateAsync,
    updateStatus: updateMutation.status,
    updateError: updateMutation.error,

    delete: deleteMutation.mutateAsync,
    deleteStatus: deleteMutation.status,
    deleteError: deleteMutation.error,

    activate: activateMutation.mutateAsync,
    activateStatus: activateMutation.status,
    activateError: activateMutation.error,

    deactivate: deactivateMutation.mutateAsync,
    deactivateStatus: deactivateMutation.status,
    deactivateError: deactivateMutation.error,

    // Feature mutations
    addFeature: addFeatureMutation.mutateAsync,
    addFeatureStatus: addFeatureMutation.status,
    addFeatureError: addFeatureMutation.error,

    updateFeature: updateFeatureMutation.mutateAsync,
    updateFeatureStatus: updateFeatureMutation.status,
    updateFeatureError: updateFeatureMutation.error,

    deleteFeature: deleteFeatureMutation.mutateAsync,
    deleteFeatureStatus: deleteFeatureMutation.status,
    deleteFeatureError: deleteFeatureMutation.error,
  };
};
