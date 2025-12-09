import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import {
  BellIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  MegaphoneIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useNotifications } from '@/queries/useNotifications';
import { Button, Loading, Pagination, BroadcastModal } from '@/components';
import { BroadcastNotificationRequest } from '@/interfaces';

const Notifications = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);

  const {
    notifications: notificationsResponse,
    notificationsLoading,
    broadcastNotification,
    broadcastNotificationPending,
  } = useNotifications(page);

  const notifications = notificationsResponse?.data?.data || [];
  const pagination = notificationsResponse?.data?.pagination;

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleBroadcast = async (data: BroadcastNotificationRequest) => {
    try {
      await broadcastNotification(data);
    } catch (error) {
      console.error('Broadcast failed', error);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'security_alert':
        return <ShieldCheckIcon className="h-6 w-6 text-red-500" />;
      case 'car_approval':
        return <CheckCircleIcon className="h-6 w-6 text-emerald-500" />;
      case 'account_verification':
        return <CheckCircleIcon className="h-6 w-6 text-blue-500" />;
      case 'new_user_registered':
        return <InformationCircleIcon className="h-6 w-6 text-indigo-500" />;
      case 'support_ticket':
        return <ExclamationTriangleIcon className="h-6 w-6 text-amber-500" />;
      default:
        return <BellIcon className="h-6 w-6 text-gray-500" />;
    }
  };

  if (notificationsLoading) return <Loading />;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Notifications"
          description="Manage system notifications and broadcast messages."
          icon={<BellIcon className="h-12 w-12" />}
        />
        <Button
          onClick={() => setIsBroadcastModalOpen(true)}
          icon={<MegaphoneIcon className="h-5 w-5" />}
        >
          Broadcast Message
        </Button>
      </div>

      <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) overflow-hidden shadow-sm">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <BellIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
            <h3 className="text-lg font-medium text-(--color-text)">
              No notifications
            </h3>
            <p className="text-(--color-body)">
              There are no notifications to display at this time.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-(--color-border)">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 sm:p-6 hover:bg-(--color-background) transition-colors ${
                  !notification.is_read ? 'bg-indigo-50/30' : ''
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-(--color-background) rounded-full shadow-sm border border-(--color-border)">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-4 mb-1">
                      <h3
                        className={`text-sm font-semibold text-(--color-text) ${!notification.is_read ? 'text-indigo-900' : ''}`}
                      >
                        {notification.title}
                      </h3>
                      <span className="text-xs text-(--color-inactive) whitespace-nowrap">
                        {notification.time_ago}
                      </span>
                    </div>
                    <p className="text-sm text-(--color-body) leading-relaxed">
                      {notification.message}
                    </p>
                    {notification.data &&
                      Object.keys(notification.data).length > 0 && (
                        <div className="mt-3 p-3 bg-(--color-background) rounded-lg border border-(--color-border) text-xs font-mono text-(--color-body) overflow-x-auto">
                          <pre className="whitespace-pre-wrap truncate">
                            {JSON.stringify(notification.data, null, 2)}
                          </pre>
                        </div>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {pagination && (
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      )}

      <BroadcastModal
        isOpen={isBroadcastModalOpen}
        onClose={() => setIsBroadcastModalOpen(false)}
        onSubmit={handleBroadcast}
        isLoading={broadcastNotificationPending}
      />
    </div>
  );
};

export default Notifications;
