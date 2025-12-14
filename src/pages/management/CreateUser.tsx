import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  UserPlusIcon,
  EyeIcon,
  EyeSlashIcon,
} from '@heroicons/react/24/outline';
import { useUsers } from '@/queries/useUsers';
import { Button, Input, PageHeader } from '@/components';
import { CreateUserRequest } from '@/interfaces/users';

const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser, createUserPending } = useUsers();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateUserRequest>({
    defaultValues: {
      role: 'user',
    },
  });

  const onSubmit = async (data: CreateUserRequest) => {
    try {
      await createUser(data);
      navigate('/management/users');
    } catch (error) {
      console.error('Failed to create user', error);
    }
  };

  return (
    <div className="pb-20">
      <PageHeader
        title="Create New User"
        description="Add a new user to the system."
        icon={<UserPlusIcon className="h-8 w-8" />}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="contents">
          {/* Left Column (Main Content) */}
          <div className="lg:col-span-2">
            {/* Personal Info Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 md:p-8 shadow-sm h-full">
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

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required for new users',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters',
                    },
                  })}
                  rightIcon={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  }
                  error={errors.password?.message}
                  placeholder="********"
                />
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div className="flex flex-col gap-6">
            {/* Address Info Card */}
            <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 shadow-sm">
              <h3 className="text-lg font-bold text-(--color-text) mb-6">
                Address Information
              </h3>
              <div className="space-y-6">
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
          </div>

          {/* Actions (Centered) */}
          <div className="lg:col-span-3 flex justify-center pt-6">
            <div className="flex items-center gap-4 w-full max-w-md">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/management/users')}
                fullWidth
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={createUserPending} fullWidth>
                Create
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
