import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useUsers } from '@/queries/useUsers';
import { Button, Input, Loading, PageHeader } from '@/components';
import { UpdateUserRequest } from '@/interfaces/users';

const EditUser = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useGetUser, updateUser, updateUserPending } = useUsers();

  const { data: userResponse, isLoading: userLoading } = useGetUser(id || '');
  const user = userResponse?.data;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserRequest>();

  useEffect(() => {
    if (user) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role as 'user' | 'mechanic' | 'workshop',
        country: user.country,
        state: user.state,
        town_city: user.town_city,
        address: user.address,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: UpdateUserRequest) => {
    if (!id) return;
    try {
      await updateUser({ id, data });
      navigate('/management/users');
    } catch (error) {
      console.error('Failed to update user', error);
    }
  };

  if (userLoading) return <Loading />;
  if (!user && !userLoading) return <div>User not found</div>;

  return (
    <div className="pb-20">
      <PageHeader
        title="Edit User Details"
        description={`Update details for ${user?.first_name} ${user?.last_name}`}
        icon={<PencilSquareIcon className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Personal Info Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-(--color-text) mb-6">
                Personal Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    {...register('first_name', {
                      required: 'First Name is required',
                    })}
                    error={errors.first_name?.message}
                    placeholder="John"
                  />
                  <Input
                    label="Last Name"
                    {...register('last_name', {
                      required: 'Last Name is required',
                    })}
                    error={errors.last_name?.message}
                    placeholder="Doe"
                  />
                </div>

                <Input
                  label="Email"
                  type="email"
                  {...register('email', { required: 'Email is required' })}
                  error={errors.email?.message}
                  placeholder="john.doe@example.com"
                />

                <Input
                  label="Phone Number"
                  {...register('phone_number', {
                    required: 'Phone Number is required',
                  })}
                  error={errors.phone_number?.message}
                  placeholder="+1 234 567 890"
                />
              </div>
            </div>

            {/* Address Info Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 md:p-8 shadow-sm">
              <h3 className="text-lg font-bold text-(--color-text) mb-6">
                Address Information
              </h3>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Country"
                    {...register('country')}
                    placeholder="Country"
                  />
                  <Input
                    label="State/Province"
                    {...register('state')}
                    placeholder="State"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="City"
                    {...register('town_city')}
                    placeholder="City"
                  />
                  <Input
                    label="Address"
                    {...register('address')}
                    placeholder="Address"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-6">
            {/* Account Settings Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm">
              <h3 className="text-lg font-bold text-(--color-text) mb-4">
                Account Settings
              </h3>
              <div>
                <label className="block text-sm font-medium text-(--color-text) mb-1">
                  Role
                </label>
                <select
                  {...register('role', { required: 'Role is required' })}
                  className="w-full px-4 py-3.5 bg-(--color-background) border border-(--color-border) rounded-xl text-(--color-text) focus:ring-4 focus:ring-(--color-primary)/20 focus:border-(--color-primary) outline-none transition-all"
                >
                  <option value="user">User</option>
                  <option value="mechanic">Mechanic</option>
                  <option value="workshop">Workshop</option>
                </select>
                {errors.role && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.role.message}
                  </p>
                )}
              </div>
            </div>

            {/* Actions Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm space-y-3">
              <h3 className="text-lg font-bold text-(--color-text) mb-4">
                Actions
              </h3>
              <Button type="submit" isLoading={updateUserPending} fullWidth>
                Save Changes
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/management/users')}
                fullWidth
              >
                Cancel
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
