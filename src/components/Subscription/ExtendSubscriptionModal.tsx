import { useForm } from 'react-hook-form';
import { Modal, Input, Button } from '@/components';
import { Subscription, ExtendSubscriptionRequest } from '@/interfaces';

interface ExtendSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ExtendSubscriptionRequest) => Promise<void>;
  subscription: Subscription | null;
  isLoading?: boolean;
}

const ExtendSubscriptionModal: React.FC<ExtendSubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  subscription,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExtendSubscriptionRequest>({
    defaultValues: {
      days: 30,
    },
  });

  const handleFormSubmit = async (data: ExtendSubscriptionRequest) => {
    await onSubmit(data);
    onClose();
    reset();
  };

  if (!subscription) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Extend Subscription">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="bg-(--color-background) p-4 rounded-lg border border-(--color-border)">
          <p className="text-sm text-(--color-body)">
            Extending subscription for:
          </p>
          <p className="font-medium text-(--color-text)">
            {subscription.user.first_name} {subscription.user.last_name}
          </p>
          <p className="text-xs text-(--color-body) mt-1">
            {subscription.plan.name}
          </p>
        </div>

        <Input
          label="Days to Extend"
          type="number"
          placeholder="30"
          error={errors.days?.message}
          {...register('days', {
            required: 'Number of days is required',
            min: { value: 1, message: 'Must be at least 1 day' },
            valueAsNumber: true,
          })}
        />

        <div className="flex justify-end gap-3 pt-4">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={isLoading}>
            Extend Subscription
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ExtendSubscriptionModal;
