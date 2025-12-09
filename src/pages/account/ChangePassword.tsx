import { PageHeader, Input, Button } from '@/components';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm();

  const newPassword = watch('new_password');

  const onSubmit = async (data: any) => {
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success('Password changed successfully');
    reset();
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Change Password"
        description="Update your password to keep your account secure."
      />

      <div className="mt-6 max-w-2xl">
        <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-sm p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Current Password"
              type="password"
              placeholder="Enter current password"
              error={errors.current_password?.message as string}
              {...register('current_password', {
                required: 'Current password is required',
              })}
            />

            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              error={errors.new_password?.message as string}
              {...register('new_password', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
            />

            <Input
              label="Confirm New Password"
              type="password"
              placeholder="Confirm new password"
              error={errors.confirm_password?.message as string}
              {...register('confirm_password', {
                required: 'Please confirm your new password',
                validate: (value) =>
                  value === newPassword || 'Passwords do not match',
              })}
            />

            <div className="pt-2 flex justify-end">
              <Button type="submit" isLoading={isSubmitting}>
                Update Password
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
