import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components';
import { MechanicQueryParams } from '@/interfaces';
import { useServices } from '@/queries/useServices';

interface MechanicsFilterProps {
  currentFilters: MechanicQueryParams;
  onApply: (filters: MechanicQueryParams) => void;
  onClear: () => void;
}

export const MechanicsFilter = ({
  currentFilters,
  onApply,
  onClear,
}: MechanicsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<MechanicQueryParams>(currentFilters);
  const { useGetServices } = useServices();
  const { data: servicesData } = useGetServices();
  const services = servicesData?.data || [];

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleChange = (
    key: keyof MechanicQueryParams,
    value: string | number,
  ) => {
    setFilters((prev) => {
      if (value === '' || value === undefined) {
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
    setFilters({});
    onClear();
    setIsOpen(false);
  };

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

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
              Mechanic Filters
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <XMarkIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Verified */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Verification Status
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

            {/* Service */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Service
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.service || ''}
                onChange={(e) => handleChange('service', e.target.value)}
              >
                <option value="">All Services</option>
                {services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Min Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Experience (Years)
              </label>
              <input
                type="number"
                min="0"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                placeholder="e.g. 3"
                value={filters.minExperience || ''}
                onChange={(e) =>
                  handleChange(
                    'minExperience',
                    e.target.value ? Number(e.target.value) : '',
                  )
                }
              />
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  placeholder="e.g. Lagos"
                  value={filters.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  placeholder="e.g. Lagos"
                  value={filters.state || ''}
                  onChange={(e) => handleChange('state', e.target.value)}
                />
              </div>
            </div>

            {/* Min Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Rating
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.minRating || ''}
                onChange={(e) =>
                  handleChange(
                    'minRating',
                    e.target.value ? Number(e.target.value) : '',
                  )
                }
              >
                <option value="">Any Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Stars & Up
                  </option>
                ))}
              </select>
            </div>

            {/* Available Day */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Available Day
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.availableDay || ''}
                onChange={(e) =>
                  handleChange('availableDay', e.target.value.toLowerCase())
                }
              >
                <option value="">Any Day</option>
                {days.map((day) => (
                  <option key={day} value={day.toLowerCase()}>
                    {day}
                  </option>
                ))}
              </select>
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
                    <option value="name">Name</option>
                    <option value="average_rating">Rating</option>
                    <option value="years_of_experience">Experience</option>
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
                    <option value="desc">Desc</option>
                    <option value="asc">Asc</option>
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
