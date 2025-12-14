import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'sonner';
import PageHeader from '@/components/PageHeader';
import { Input, Button } from '@/components';
import { CreatePlanRequest } from '@/interfaces/plan';
import { usePlan } from '@/queries/usePlan';
import { Feature, FEATURE_LABELS } from '@/enums/Feature';
import {
  CurrencyDollarIcon,
  PlusIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

const CreatePlan = () => {
  const navigate = useNavigate();
  const { create } = usePlan();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatePlanRequest>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      billing_cycle: 'monthly',
      trial_days: 0,
      is_active: true,
      sort_order: 0,
      features: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'features',
  });

  const onSubmit = async (data: CreatePlanRequest) => {
    setIsSubmitting(true);
    try {
      await create(data);
      toast.success('Plan created successfully');
      navigate('/services/plans');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create plan');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Create Service Plan"
          description="Create a new service plan with features."
          icon={<CurrencyDollarIcon className="h-12 w-12" />}
        />
      </div>

      <div className="pb-20">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {/* Basic Details (Row 1, Left) */}
          <div className="lg:col-span-2 lg:row-start-1 bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm h-full">
            <h3 className="text-lg font-bold text-(--color-text) mb-6">
              Basic Details
            </h3>
            <div className="space-y-6">
              <Input
                label="Plan Name"
                placeholder="e.g. Basic Plan"
                error={errors.name?.message}
                {...register('name', { required: 'Plan name is required' })}
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-(--color-text)">
                  Description
                </label>
                <textarea
                  rows={3}
                  className="block w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3.5 text-(--color-text) placeholder:text-(--color-inactive) transition-all duration-200 outline-none focus:ring-4 focus:ring-(--color-primary)/20 focus:border-(--color-primary)"
                  placeholder="Describe the plan features..."
                  {...register('description')}
                />
              </div>
            </div>
          </div>

          {/* Pricing & Billing (Row 1, Right) */}
          <div className="lg:col-span-1 lg:row-start-1 bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm h-full">
            <h3 className="text-lg font-bold text-(--color-text) mb-4">
              Pricing & Billing
            </h3>
            <div className="space-y-4">
              <Input
                label="Price (₦)"
                type="number"
                placeholder="0.00"
                error={errors.price?.message}
                {...register('price', {
                  required: 'Price is required',
                  min: { value: 0, message: 'Price must be positive' },
                })}
              />

              <div className="space-y-1.5">
                <label className="block text-sm font-medium text-(--color-text)">
                  Billing Cycle
                </label>
                <select
                  className="block w-full rounded-xl border border-(--color-border) bg-(--color-surface) px-4 py-3.5 text-(--color-text) outline-none focus:ring-4 focus:ring-(--color-primary)/20 focus:border-(--color-primary)"
                  {...register('billing_cycle', { required: true })}
                >
                  <option value="monthly">Monthly</option>
                  <option value="quarterly">Quarterly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>

              <Input
                label="Trial Days"
                type="number"
                placeholder="0"
                error={errors.trial_days?.message}
                {...register('trial_days', {
                  min: { value: 0, message: 'Days must be positive' },
                })}
              />
            </div>
          </div>

          {/* Features (Row 2, Left) */}
          <div className="lg:col-span-2 lg:row-start-2 bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm h-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-(--color-text)">
                  Features
                </h3>
                <p className="text-sm text-(--color-body)">
                  Add features included in this plan.
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    name: '',
                    value: '',
                    sort_order: 0,
                    is_active: true,
                  })
                }
                icon={<PlusIcon className="h-4 w-4" />}
              >
                Add Feature
              </Button>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="p-4 rounded-xl border border-(--color-border) bg-gray-50 space-y-3 relative"
                >
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-(--color-text)">
                        Feature
                      </label>
                      <select
                        className="flex h-9 w-full rounded-md border border-(--color-border) bg-(--color-background) px-3 py-1 text-sm text-(--color-text) ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...register(`features.${index}.name` as const, {
                          required: 'Feature is required',
                        })}
                      >
                        <option value="">Select feature</option>
                        {Object.values(Feature).map((feature) => (
                          <option key={feature} value={feature}>
                            {FEATURE_LABELS[feature]}
                          </option>
                        ))}
                      </select>
                      {errors.features?.[index]?.name && (
                        <p className="text-xs text-red-500">
                          {errors.features[index]?.name?.message}
                        </p>
                      )}
                    </div>
                    <Input
                      label="Value"
                      placeholder="e.g. 5"
                      {...register(`features.${index}.value` as const)}
                      className="h-9 py-1 text-sm"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3 items-end">
                    <Input
                      label="Sort Order"
                      type="number"
                      placeholder="0"
                      {...register(`features.${index}.sort_order` as const)}
                      className="h-9 py-1 text-sm"
                    />
                    <div className="flex items-center gap-2 pb-2">
                      <input
                        type="checkbox"
                        id={`features.${index}.is_active`}
                        className="h-3.5 w-3.5 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
                        {...register(`features.${index}.is_active` as const)}
                      />
                      <label
                        htmlFor={`features.${index}.is_active`}
                        className="text-xs text-(--color-text)"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>
              ))}
              {fields.length === 0 && (
                <div className="text-center py-8 text-sm text-gray-500 border border-dashed border-gray-200 rounded-lg">
                  No features added yet. Click "Add Feature" to get started.
                </div>
              )}
            </div>
          </div>

          {/* Display Settings (Row 2, Right) */}
          <div className="lg:col-span-1 lg:row-start-2 bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm h-full">
            <h3 className="text-lg font-bold text-(--color-text) mb-4">
              Display Settings
            </h3>
            <div className="space-y-4">
              <Input
                label="Sort Order"
                type="number"
                placeholder="0"
                error={errors.sort_order?.message}
                {...register('sort_order')}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="is_active"
                  className="h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
                  {...register('is_active')}
                />
                <label
                  htmlFor="is_active"
                  className="text-sm text-(--color-text)"
                >
                  Active (Visible to users)
                </label>
              </div>
            </div>
          </div>

          {/* Actions (Row 3, Centered) */}
          <div className="lg:col-span-3 flex justify-center pt-6">
            <div className="flex items-center gap-4 w-full max-w-md">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/services/plans')}
                fullWidth
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={isSubmitting} fullWidth>
                Create Plan
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
