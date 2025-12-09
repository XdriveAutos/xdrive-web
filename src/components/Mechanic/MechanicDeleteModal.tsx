import React from 'react';
import { Modal, Button } from '@/components';

interface MechanicDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const MechanicDeleteModal: React.FC<MechanicDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Mechanic">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to delete this mechanic? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default MechanicDeleteModal;
