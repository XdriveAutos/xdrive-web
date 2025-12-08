import PageHeader from '@/components/PageHeader';
import { BellIcon } from '@heroicons/react/24/outline';

const Notifications = () => {
  return (
    <div>
      <PageHeader
        title="Notifications"
        description="Manage system notifications and alerts."
        icon={<BellIcon className="h-12 w-12" />}
      />

      <div className="bg-(--color-surface) border border-dashed border-(--color-primary)/30 rounded-3xl p-16 text-center shadow-inner mt-8">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
          Coming Soon
        </h2>
        <p className="text-(--color-body) max-w-md mx-auto leading-relaxed">
          Notification center is under development.
        </p>
      </div>
    </div>
  );
};

export default Notifications;
