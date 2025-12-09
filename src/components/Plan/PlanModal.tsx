import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { Plan, CreatePlanRequest } from '@/interfaces/plan';

interface PlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePlanRequest) => Promise<void>;
  initialData?: Plan | null;
  isLoading?: boolean;
}

const PlanModal: React.FC<PlanModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm<CreatePlanRequest>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      billing_cycle: 'monthly',
      trial_days: 0,
      is_active: true,
      sort_order: 0,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description);
      setValue('price', initialData.price);
      setValue('billing_cycle', initialData.billing_cycle);
      setValue('trial_days', initialData.trial_days);
      setValue('is_active', initialData.is_active);
      setValue('sort_order', initialData.sort_order);
    } else {
      reset({
        name: '',
        description: '',
        price: 0,
        billing_cycle: 'monthly',
        trial_days: 0,
        is_active: true,
        sort_order: 0,
      });
    }
  }, [initialData, setValue, reset, isOpen]);

  const handleFormSubmit = async (data: CreatePlanRequest) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Plan' : 'Create New Plan'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
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

        <div className="grid grid-cols-2 gap-4">
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
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Trial Days"
            type="number"
            placeholder="0"
            error={errors.trial_days?.message}
            {...register('trial_days', {
              min: { value: 0, message: 'Days must be positive' },
            })}
          />
          <Input
            label="Sort Order"
            type="number"
            placeholder="0"
            error={errors.sort_order?.message}
            {...register('sort_order')}
          />
        </div>

        <div className="flex items-center gap-2 pt-2">
          <input
            type="checkbox"
            id="is_active"
            className="h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
            {...register('is_active')}
          />
          <label htmlFor="is_active" className="text-sm text-(--color-text)">
            Active (Visible to users)
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? 'Update Plan' : 'Create Plan'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default PlanModal;
