import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { Service, CreateServiceRequest } from '@/interfaces/service';

interface ServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateServiceRequest) => Promise<void>;
  initialData?: Service | null;
  isLoading?: boolean;
}

const ServiceModal: React.FC<ServiceModalProps> = ({
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
    setValue,
    formState: { errors },
  } = useForm<CreateServiceRequest>({
    defaultValues: {
      name: '',
      description: '',
      is_active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('description', initialData.description);
      setValue('is_active', initialData.is_active);
    } else {
      reset({
        name: '',
        description: '',
        is_active: true,
      });
    }
  }, [initialData, setValue, reset, isOpen]);

  const handleFormSubmit = async (data: CreateServiceRequest) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Service' : 'Create New Service'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Input
          label="Service Name"
          placeholder="e.g. Oil Change"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-(--color-text)">
            Description
          </label>
          <textarea
            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-placeholder) focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) outline-none transition-all duration-200 min-h-[100px]"
            placeholder="Describe the service..."
            {...register('description', {
              required: 'Description is required',
            })}
          />
          {errors.description && (
            <p className="text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="is_active"
            className="h-4 w-4 rounded border-(--color-border) text-(--color-primary) focus:ring-(--color-primary)"
            {...register('is_active')}
          />
          <label htmlFor="is_active" className="text-sm text-(--color-text)">
            Active (Available for booking)
          </label>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            {initialData ? 'Update Service' : 'Create Service'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ServiceModal;
