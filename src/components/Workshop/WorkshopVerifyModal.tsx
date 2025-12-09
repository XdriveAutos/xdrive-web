import React from 'react';
import { Modal, Button } from '@/components';
import { Workshop } from '@/interfaces';

interface WorkshopVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  workshop: Workshop | null;
  isLoading?: boolean;
}

const WorkshopVerifyModal: React.FC<WorkshopVerifyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  workshop,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Workshop">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to verify <b>{workshop?.workshop_name}</b>? This
          will mark them as a trusted workshop on the platform.
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
            Verify
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default WorkshopVerifyModal;
