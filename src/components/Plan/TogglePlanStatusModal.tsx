import { Button, Modal } from '@/components';
import { Plan } from '@/interfaces/plan';

interface TogglePlanStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  plan: Plan | null;
  isLoading?: boolean;
}

export const TogglePlanStatusModal = ({
  isOpen,
  onClose,
  onConfirm,
  plan,
  isLoading,
}: TogglePlanStatusModalProps) => {
  const isActive = plan?.is_active;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isActive ? 'Deactivate Plan' : 'Activate Plan'}
    >
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to {isActive ? 'deactivate' : 'activate'}{' '}
          <b>{plan?.name}</b>?
          {isActive
            ? ' New users will not be able to subscribe to it.'
            : ' Users will be able to subscribe to it.'}
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className={
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }
            loading={isLoading}
          >
            {isActive ? 'Deactivate' : 'Activate'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
