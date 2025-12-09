import React from 'react';
import { Modal, Button } from '@/components';

interface WorkshopDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const WorkshopDeleteModal: React.FC<WorkshopDeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Workshop">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to delete this workshop? This action cannot be
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

export default WorkshopDeleteModal;
