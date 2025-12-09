import { PageHeader, Input, Button } from '@/components';
import { useAuthStore } from '@/stores';

const Profile = () => {
  const { admin } = useAuthStore();

  const getInitials = (name: string) =>
    name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

  const fullName =
    `${admin?.first_name || ''} ${admin?.last_name || ''}`.trim() || 'Admin';

  return (
    <div className="p-6">
      <PageHeader
        title="Profile Settings"
        description="View and manage your account information."
      />

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-sm p-6 flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full bg-(--color-primary) flex items-center justify-center text-white text-2xl font-bold mb-4">
              {getInitials(fullName)}
            </div>
            <h2 className="text-xl font-bold text-(--color-text)">
              {fullName}
            </h2>
            <p className="text-(--color-body) text-sm mt-1">{admin?.email}</p>
            <span className="mt-3 px-3 py-1 bg-(--color-primary-container) text-(--color-primary) text-xs font-medium rounded-full">
              {admin?.role || 'Administrator'}
            </span>
          </div>
        </div>

        {/* Details Form */}
        <div className="lg:col-span-2">
          <div className="bg-(--color-surface) rounded-xl border border-(--color-border) shadow-sm p-6">
            <h3 className="text-lg font-semibold text-(--color-text) mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Input
                label="First Name"
                value={admin?.first_name || ''}
                readOnly
                className="bg-(--color-background) cursor-not-allowed"
              />
              <Input
                label="Last Name"
                value={admin?.last_name || ''}
                readOnly
                className="bg-(--color-background) cursor-not-allowed"
              />
              <div className="md:col-span-2">
                <Input
                  label="Email Address"
                  value={admin?.email || ''}
                  readOnly
                  className="bg-(--color-background) cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2">
                <Input
                  label="Phone Number"
                  value={admin?.phone_number || ''}
                  readOnly
                  className="bg-(--color-background) cursor-not-allowed"
                />
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button disabled variant="primary">
                Save Changes
              </Button>
            </div>
            <p className="mt-2 text-xs text-(--color-inactive) text-center">
              * Profile editing is currently disabled.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
