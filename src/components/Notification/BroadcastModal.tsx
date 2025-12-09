import { useForm } from 'react-hook-form';
import { MegaphoneIcon } from '@heroicons/react/24/outline';
import { Button, Input, Modal } from '@/components';
import { BroadcastNotificationRequest } from '@/interfaces';

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BroadcastNotificationRequest) => Promise<void>;
  isLoading?: boolean;
}

const BroadcastModal = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}: BroadcastModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<BroadcastNotificationRequest>();

  const handleFormSubmit = async (data: BroadcastNotificationRequest) => {
    await onSubmit(data);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Broadcast Notification">
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Title"
          placeholder="Enter notification title"
          error={errors.title?.message}
          {...register('title', { required: 'Title is required' })}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium text-(--color-text)">
            Message
          </label>
          <textarea
            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-2.5 text-sm text-(--color-text) placeholder:text-(--color-placeholder) focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) outline-none transition-all duration-200 min-h-[100px]"
            rows={4}
            placeholder="Enter notification message"
            {...register('body', { required: 'Message is required' })}
          />
          {errors.body && (
            <p className="text-xs text-red-500">{errors.body.message}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-(--color-text)">
            Target Audience
          </label>
          <select
            className="w-full rounded-xl border border-(--color-border) bg-(--color-background) px-4 py-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:ring-1 focus:ring-(--color-primary) outline-none transition-all duration-200"
            {...register('audience', { required: true })}
            defaultValue="all"
          >
            <option value="all">All Users</option>
            <option value="admins">Admins Only</option>
            <option value="mechanics">Mechanics Only</option>
            <option value="workshops">Workshops Only</option>
            <option value="users">Regular Users Only</option>
          </select>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <Button variant="outline" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isLoading={isLoading}
            icon={<MegaphoneIcon className="h-5 w-5" />}
          >
            Broadcast
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default BroadcastModal;
