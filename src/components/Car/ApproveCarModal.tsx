import React from 'react';
import { Modal, Button } from '@/components';

interface ApproveCarModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  carId: string | null;
  isLoading?: boolean;
}

const ApproveCarModal: React.FC<ApproveCarModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Approve Car">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to approve this car listing? This will make it
          visible to all users on the platform.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            isLoading={isLoading}
          >
            Approve
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ApproveCarModal;
