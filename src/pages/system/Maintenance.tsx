import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import {
  WrenchScrewdriverIcon,
  ServerStackIcon,
  SignalIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { useMaintenance } from '@/queries/useMaintenance';
import { Button, Loading, Modal } from '@/components';

const Maintenance = () => {
  const {
    useGetMaintenanceStatus,
    toggleMaintenanceMode,
    clearCache,
    toggleMaintenanceModePending,
    clearCachePending,
  } = useMaintenance();

  const { data: statusResponse, isLoading: statusLoading } =
    useGetMaintenanceStatus();
  const maintenanceStatus = statusResponse?.data;

  // Modal states
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [showCacheModal, setShowCacheModal] = useState(false);

  const handleToggleMaintenance = async () => {
    try {
      await toggleMaintenanceMode();
      setShowToggleModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClearCache = async () => {
    try {
      await clearCache();
      setShowCacheModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (statusLoading) {
    return <Loading />;
  }

  return (
    <div>
      <PageHeader
        title="Maintenance Mode"
        description="Manage system maintenance mode and operations."
        icon={<WrenchScrewdriverIcon className="h-12 w-12" />}
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Maintenance Mode Card */}
        <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 relative overflow-hidden">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <SignalIcon className="h-6 w-6" />
            </div>
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                maintenanceStatus?.enabled
                  ? 'bg-amber-50 text-amber-700 border-amber-100'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-100'
              }`}
            >
              {maintenanceStatus?.enabled
                ? 'Maintenance Active'
                : 'System Online'}
            </span>
          </div>

          <h3 className="text-lg font-bold text-(--color-text) mb-2">
            System Status
          </h3>
          <p className="text-(--color-body) text-sm mb-6">
            {maintenanceStatus?.enabled
              ? 'The system is currently in maintenance mode. Only administrators can access the application.'
              : 'The system is online and accessible to all users. Enable maintenance mode to prevent user access during updates.'}
          </p>

          {maintenanceStatus?.enabled && maintenanceStatus?.bypass_url && (
            <div className="mb-6 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
              <p className="text-xs font-medium text-amber-800 mb-1 uppercase tracking-inuse">
                Bypass URL
              </p>
              <code className="text-sm text-amber-900 break-all">
                {maintenanceStatus.bypass_url}
              </code>
            </div>
          )}

          <Button
            onClick={() => setShowToggleModal(true)}
            className={`w-full justify-center ${
              maintenanceStatus?.enabled
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                : 'bg-amber-600 hover:bg-amber-700 text-white'
            }`}
          >
            {maintenanceStatus?.enabled
              ? 'Deactivate Maintenance Mode'
              : 'Activate Maintenance Mode'}
          </Button>
        </div>

        {/* System Cache Card */}
        <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <ServerStackIcon className="h-6 w-6" />
            </div>
            <div className="p-1">
              <ShieldCheckIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>

          <h3 className="text-lg font-bold text-(--color-text) mb-2">
            System Cache
          </h3>
          <p className="text-(--color-body) text-sm mb-6">
            Clear the application cache to force a refresh of all system data.
            This action might temporarily affect system performance as caches
            are rebuilt.
          </p>

          <div className="mt-auto">
            <Button
              variant="outline"
              onClick={() => setShowCacheModal(true)}
              className="w-full justify-center hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Clear System Cache
            </Button>
          </div>
        </div>
      </div>

      {/* Toggle Maintenance Modal */}
      <Modal
        isOpen={showToggleModal}
        onClose={() => setShowToggleModal(false)}
        title={
          maintenanceStatus?.enabled
            ? 'Deactivate Maintenance Mode?'
            : 'Activate Maintenance Mode?'
        }
      >
        <div className="space-y-4">
          <p className="text-(--color-body)">
            {maintenanceStatus?.enabled
              ? 'This will make the application accessible to all users again. Are you sure you want to proceed?'
              : 'This will prevent regular users from accessing the application. Are you sure you want to proceed?'}
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowToggleModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleToggleMaintenance}
              isLoading={toggleMaintenanceModePending}
              className={
                maintenanceStatus?.enabled
                  ? 'bg-emerald-600 hover:bg-emerald-700 text-white'
                  : 'bg-amber-600 hover:bg-amber-700 text-white'
              }
            >
              {maintenanceStatus?.enabled ? 'Go Online' : 'Activate'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Clear Cache Modal */}
      <Modal
        isOpen={showCacheModal}
        onClose={() => setShowCacheModal(false)}
        title="Clear System Cache?"
      >
        <div className="space-y-4">
          <p className="text-(--color-body)">
            This action will clear all server-side caches. It may cause a
            temporary slowdown while caches are rebuilt.
          </p>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowCacheModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleClearCache}
              isLoading={clearCachePending}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Clear Cache
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Maintenance;
