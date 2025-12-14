import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components';
import { UserQueryParams } from '@/interfaces';

interface UsersFilterProps {
  currentFilters: UserQueryParams;
  onApply: (filters: UserQueryParams) => void;
  onClear: () => void;
}

export const UsersFilter = ({
  currentFilters,
  onApply,
  onClear,
}: UsersFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<UserQueryParams>(currentFilters);

  // Sync internal state with props when drawer opens
  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleChange = (key: keyof UserQueryParams, value: string) => {
    setFilters((prev) => {
      if (!value) {
        const newFilters = { ...prev };
        delete newFilters[key];
        return newFilters;
      }
      return { ...prev, [key]: value };
    });
  };

  const handleApply = () => {
    onApply(filters);
    setIsOpen(false);
  };

  const handleClear = () => {
    setFilters({}); // Clear local
    onClear(); // Clear parent
    setIsOpen(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="outline" icon={<FunnelIcon className="h-5 w-5" />}>
          Filters
        </Button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />

        <Dialog.Content
          className="
                fixed inset-y-0 right-0 z-50 h-full w-full max-w-md border-l border-(--color-border) bg-white p-6 shadow-2xl transition ease-in-out duration-300
                data-[state=open]:animate-in data-[state=closed]:animate-out
                data-[state=closed]:slide-out-to-right
                data-[state=open]:slide-in-from-right
                flex flex-col
            "
        >
          <div className="flex items-center justify-between mb-6">
            <Dialog.Title className="text-lg font-semibold text-gray-900">
              Filters
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <XMarkIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.status || ''}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="suspended">Suspended</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            {/* Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.role || ''}
                onChange={(e) => handleChange('role', e.target.value)}
              >
                <option value="">All Roles</option>
                <option value="user">User</option>
                <option value="mechanic">Mechanic</option>
                <option value="workshop">Workshop</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            {/* Verified */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Verified
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.verified || ''}
                onChange={(e) => handleChange('verified', e.target.value)}
              >
                <option value="">Any</option>
                <option value="true">Verified</option>
                <option value="false">Unverified</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Country
              </label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                placeholder="e.g. USA"
                value={filters.country || ''}
                onChange={(e) => handleChange('country', e.target.value)}
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State
              </label>
              <input
                type="text"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                placeholder="e.g. California"
                value={filters.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created From
                </label>
                <input
                  type="date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  value={filters.createdFrom || ''}
                  onChange={(e) => handleChange('createdFrom', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Created To
                </label>
                <input
                  type="date"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  value={filters.createdTo || ''}
                  onChange={(e) => handleChange('createdTo', e.target.value)}
                />
              </div>
            </div>

            {/* Sorting */}
            <div className="pt-4 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Sort By
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Column
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    value={filters.sortBy || ''}
                    onChange={(e) => handleChange('sortBy', e.target.value)}
                  >
                    <option value="created_at">Date Created</option>
                    <option value="first_name">First Name</option>
                    <option value="last_name">Last Name</option>
                    <option value="email">Email</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                    value={filters.order || 'desc'}
                    onChange={(e) => handleChange('order', e.target.value)}
                  >
                    <option value="desc">Newest / Z-A</option>
                    <option value="asc">Oldest / A-Z</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-6 pt-6">
            <div className="flex gap-3">
              <Button className="flex-1 justify-center" onClick={handleApply}>
                Apply Filters
              </Button>
              <Button
                variant="outline"
                className="flex-1 justify-center"
                onClick={handleClear}
              >
                Clear All
              </Button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
