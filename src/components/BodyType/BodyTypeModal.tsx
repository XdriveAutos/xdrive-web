import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { BodyType, CreateBodyTypeRequest } from '@/interfaces/body-type';

interface BodyTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreateBodyTypeRequest) => Promise<void>;
  initialData?: BodyType | null;
  isLoading?: boolean;
}

const BodyTypeModal: React.FC<BodyTypeModalProps> = ({
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
  } = useForm<CreateBodyTypeRequest>({
    defaultValues: {
      name: '',
      is_active: true,
    },
  });

  useEffect(() => {
    if (initialData) {
      setValue('name', initialData.name);
      setValue('is_active', initialData.is_active);
    } else {
      reset({
        name: '',
        is_active: true,
      });
    }
  }, [initialData, setValue, reset, isOpen]);

  const handleFormSubmit = async (data: CreateBodyTypeRequest) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Body Type' : 'Create New Body Type'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <Input
          label="Body Type Name"
          placeholder="e.g. SUV"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />

        <div className="flex items-center gap-2">
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
            {initialData ? 'Update Body Type' : 'Create Body Type'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BodyTypeModal;
