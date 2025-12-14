import { Button, Modal } from '@/components';
import { CarModel } from '@/interfaces';

interface ToggleCarModelStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  model: CarModel | null;
  isLoading?: boolean;
}

export const ToggleCarModelStatusModal = ({
  isOpen,
  onClose,
  onConfirm,
  model,
  isLoading,
}: ToggleCarModelStatusModalProps) => {
  const isActive = model?.is_active;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isActive ? 'Disable Model' : 'Enable Model'}
    >
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to {isActive ? 'disable' : 'enable'}{' '}
          <b>{model?.name}</b>?
          {isActive
            ? ' It will be hidden from selection lists.'
            : ' It will become available in selection lists.'}
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
            {isActive ? 'Disable' : 'Enable'}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
