import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button, Loading } from '@/components';
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckIcon,
} from '@heroicons/react/24/outline';
import { usePlan } from '@/queries/usePlan';
import {
  Plan,
  PlanFeature,
  AddPlanFeatureRequest,
  UpdatePlanFeatureRequest,
} from '@/interfaces/plan';
import { Feature, FEATURE_LABELS, getFeatureLabel } from '@/enums/Feature';
import { toast } from 'sonner';

interface PlanFeaturesModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: Plan | null;
}

const PlanFeaturesModal: React.FC<PlanFeaturesModalProps> = ({
  isOpen,
  onClose,
  plan,
}) => {
  const {
    planFeatures,
    planFeaturesLoading,
    addFeature,
    updateFeature,
    deleteFeature,
  } = usePlan(plan?.id);

  const [editingFeature, setEditingFeature] = useState<PlanFeature | null>(
    null,
  );
  const [isAdding, setIsAdding] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AddPlanFeatureRequest>();

  useEffect(() => {
    if (editingFeature) {
      setValue('feature_name', editingFeature.feature_name);
      setValue('feature_value', editingFeature.feature_value);
      setValue('sort_order', editingFeature.sort_order);
      setValue('is_active', editingFeature.is_active);
    } else {
      reset({
        feature_name: '',
        feature_value: '',
        sort_order: 0,
        is_active: true,
      });
    }
  }, [editingFeature, setValue, reset]);

  const onFormSubmit = async (data: AddPlanFeatureRequest) => {
    if (!plan) return;

    try {
      if (editingFeature) {
        await updateFeature({
          featureId: editingFeature.id,
          data: data as UpdatePlanFeatureRequest,
        });
        setEditingFeature(null);
      } else {
        await addFeature(data);
        setIsAdding(false);
      }
      reset();
    } catch (error) {
      console.error('Failed to save feature', error);
      toast.error('Failed to save feature');
    }
  };

  const handleDelete = async (featureId: string) => {
    if (window.confirm('Are you sure you want to delete this feature?')) {
      try {
        await deleteFeature(featureId);
      } catch (error) {
        console.error('Failed to delete feature', error);
        toast.error('Failed to delete feature');
      }
    }
  };

  const toggleFeatureStatus = async (feature: PlanFeature) => {
    try {
      await updateFeature({
        featureId: feature.id,
        data: { is_active: !feature.is_active },
      });
    } catch (error) {
      console.error('Failed to update status', error);
      toast.error('Failed to update status');
    }
  };

  const handleCancel = () => {
    setEditingFeature(null);
    setIsAdding(false);
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Features - ${plan?.name || 'Loading...'}`}
    >
      <div className="space-y-6">
        {planFeaturesLoading && !planFeatures ? (
          <Loading />
        ) : (
          <div className="space-y-4">
            {/* List of features */}
            <div className="max-h-[60vh] overflow-y-auto space-y-3 pr-1">
              {planFeatures?.data?.length === 0 && !isAdding && (
                <div className="text-center py-8 text-(--color-body)">
                  No features found for this plan.
                </div>
              )}

              {planFeatures?.data?.map((feature) => (
                <div
                  key={feature.id}
                  className={`
                    flex items-center justify-between p-4 rounded-xl border transition-all
                    ${
                      feature.is_active
                        ? 'bg-(--color-surface) border-(--color-border)'
                        : 'bg-gray-50 border-gray-200 opacity-75'
                    }
                    ${editingFeature?.id === feature.id ? 'ring-2 ring-(--color-primary)' : ''}
                  `}
                >
                  <div className="flex-1 mr-4">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-(--color-text)">
                        {getFeatureLabel(feature.feature_name)}
                      </p>
                      {!feature.is_active && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-gray-200 text-gray-600">
                          Inactive
                        </span>
                      )}
                    </div>
                    {feature.feature_value && (
                      <p className="text-sm text-(--color-body)">
                        {feature.feature_value}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleFeatureStatus(feature)}
                      className={`p-1.5 rounded-lg transition-colors ${feature.is_active ? 'text-emerald-500 hover:bg-emerald-50' : 'text-gray-400 hover:bg-gray-100'}`}
                      title={feature.is_active ? 'Deactivate' : 'Activate'}
                    >
                      <CheckIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => {
                        setEditingFeature(feature);
                        setIsAdding(false);
                      }}
                      className="p-1.5 rounded-lg text-blue-500 hover:bg-blue-50 transition-colors"
                      title="Edit"
                    >
                      <PencilIcon className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(feature.id)}
                      className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                      title="Delete"
                    >
                      <TrashIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add/Edit Form Area */}
            {(isAdding || editingFeature) && (
              <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="bg-(--color-background) p-4 rounded-xl border border-(--color-border) space-y-4"
              >
                <h4 className="font-medium text-(--color-text)">
                  {editingFeature ? 'Edit Feature' : 'Add New Feature'}
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-(--color-text)">
                      Feature
                    </label>
                    <select
                      className="flex h-10 w-full rounded-md border border-(--color-border) bg-(--color-background) px-3 py-2 text-sm text-(--color-text) ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      {...register('feature_name', {
                        required: 'Feature is required',
                      })}
                    >
                      <option value="">Select a feature</option>
                      {Object.values(Feature).map((feature) => (
                        <option key={feature} value={feature}>
                          {FEATURE_LABELS[feature]}
                        </option>
                      ))}
                    </select>
                    {errors.feature_name && (
                      <p className="text-sm text-red-500">
                        {errors.feature_name.message}
                      </p>
                    )}
                  </div>

                  <Input
                    label="Value (Optional)"
                    placeholder="e.g. 5"
                    error={errors.feature_value?.message}
                    {...register('feature_value')}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Sort Order"
                    type="number"
                    placeholder="0"
                    error={errors.sort_order?.message}
                    {...register('sort_order')}
                  />
                  <div className="flex items-center gap-2 pt-8">
                    <input
                      type="checkbox"
                      id="feature_active"
                      className="h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
                      {...register('is_active')}
                    />
                    <label
                      htmlFor="feature_active"
                      className="text-sm text-(--color-text)"
                    >
                      Active
                    </label>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button size="sm" type="submit" isLoading={isSubmitting}>
                    {editingFeature ? 'Update' : 'Add'}
                  </Button>
                </div>
              </form>
            )}

            {/* Add Button */}
            {!isAdding && !editingFeature && (
              <Button
                variant="outline"
                className="w-full border-dashed"
                icon={<PlusIcon className="h-5 w-5" />}
                onClick={() => setIsAdding(true)}
              >
                Add Feature
              </Button>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default PlanFeaturesModal;
