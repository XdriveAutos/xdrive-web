import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import { useUsers } from '@/queries/useUsers';
import { Button, Input, PageHeader } from '@/components';
import { CreateUserRequest } from '@/interfaces/users';

const CreateUser = () => {
  const navigate = useNavigate();
  const { createUser, createUserPending } = useUsers();

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

      <div className="mt-6 max-w-4xl mx-auto">
        <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 md:p-8 shadow-sm">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              type="password"
              {...register('password', {
                required: 'Password is required for new users',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              })}
              error={errors.password?.message}
              placeholder="********"
            />

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

            <div className="flex justify-end gap-3 pt-6 border-t border-(--color-border)">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/management/users')}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={createUserPending}>
                Create User
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
