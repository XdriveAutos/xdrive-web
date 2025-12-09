import React from 'react';
import { Modal, Button } from '@/components';
import { Mechanic } from '@/interfaces';

interface MechanicVerifyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  mechanic: Mechanic | null;
  isLoading?: boolean;
}

const MechanicVerifyModal: React.FC<MechanicVerifyModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  mechanic,
  isLoading,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify Mechanic">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to verify <b>{mechanic?.name}</b>? This will
          mark them as a trusted mechanic on the platform.
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

export default MechanicVerifyModal;
