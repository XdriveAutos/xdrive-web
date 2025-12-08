import { UserGroupIcon } from '@heroicons/react/24/outline';
import PageHeader from '@/components/PageHeader';

const Users = () => {
  return (
    <div>
      <PageHeader
        title="Users Management"
        description="Manage all users in the system."
        icon={<UserGroupIcon className="h-12 w-12" />}
      />

      <div className="bg-(--color-surface) border border-dashed border-(--color-primary)/30 rounded-3xl p-16 text-center shadow-inner">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
          Coming Soon
        </h2>
        <p className="text-(--color-body) max-w-md mx-auto leading-relaxed">
          Users management interface is under development.
        </p>
      </div>
    </div>
  );
};

export default Users;
