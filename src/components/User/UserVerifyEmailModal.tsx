import { Button, Modal } from '@/components';

interface UserVerifyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

export const UserVerifyEmailModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: UserVerifyEmailModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Verify User Email">
      <div className="space-y-4">
        <p className="text-(--color-body)">
          Are you sure you want to manually verify this user's email address?
          This will allow them to access features requiring email verification.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            loading={isLoading}
          >
            Verify Email
          </Button>
        </div>
      </div>
    </Modal>
  );
};
