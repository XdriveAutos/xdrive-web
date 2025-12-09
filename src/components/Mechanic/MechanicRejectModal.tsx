import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Input } from '@/components';
import { Mechanic, RejectMechanicRequest } from '@/interfaces';

interface MechanicRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: RejectMechanicRequest) => void;
  mechanic: Mechanic | null;
  isLoading?: boolean;
}

const MechanicRejectModal: React.FC<MechanicRejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  mechanic,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectMechanicRequest>();

  useEffect(() => {
    if (isOpen) {
      reset({ reason: '' });
    }
  }, [isOpen, reset]);

  const onSubmit = (data: RejectMechanicRequest) => {
    onConfirm(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reject Mechanic">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to reject <b>{mechanic?.name}</b>? Please
          provide a reason for the rejection.
        </p>

        <Input
          label="Rejection Reason"
          placeholder="e.g., Incomplete documentation"
          error={errors.reason?.message}
          {...register('reason', { required: 'Reason is required' })}
        />

        <div className="flex justify-end gap-3 pt-2">
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
            type="button"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white"
            isLoading={isLoading}
          >
            Reject
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default MechanicRejectModal;
