import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Modal, Button, Input } from '@/components';
import { Workshop, RejectWorkshopRequest } from '@/interfaces';

interface WorkshopRejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: RejectWorkshopRequest) => void;
  workshop: Workshop | null;
  isLoading?: boolean;
}

const WorkshopRejectModal: React.FC<WorkshopRejectModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  workshop,
  isLoading,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RejectWorkshopRequest>();

  useEffect(() => {
    if (isOpen) {
      reset({ reason: '' });
    }
  }, [isOpen, reset]);

  const onSubmit = (data: RejectWorkshopRequest) => {
    onConfirm(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Reject Workshop">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to reject <b>{workshop?.workshop_name}</b>?
          Please provide a reason for the rejection.
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

export default WorkshopRejectModal;
