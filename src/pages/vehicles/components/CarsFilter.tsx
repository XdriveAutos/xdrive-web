import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { XMarkIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components';
import { CarQueryParams } from '@/interfaces';
import { useBrand } from '@/queries/useBrand';

interface CarsFilterProps {
  currentFilters: CarQueryParams;
  onApply: (filters: CarQueryParams) => void;
  onClear: () => void;
}

export const CarsFilter = ({
  currentFilters,
  onApply,
  onClear,
}: CarsFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<CarQueryParams>(currentFilters);
  const { allBrandsQuery } = useBrand();
  const { data: brandsData } = allBrandsQuery;
  const brands = brandsData?.data?.data || [];

  useEffect(() => {
    if (isOpen) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleChange = (
    key: keyof CarQueryParams,
    value: string | number | boolean,
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
              Car Filters
            </Dialog.Title>
            <Dialog.Close className="rounded-full p-2 hover:bg-gray-100 transition-colors">
              <XMarkIcon className="h-6 w-6 text-gray-500" />
              <span className="sr-only">Close</span>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto pr-2 space-y-6">
            {/* Brand */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Brand
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.brand || ''}
                onChange={(e) => handleChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min Price
                </label>
                <input
                  type="number"
                  min="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  placeholder="e.g. 1000000"
                  value={filters.minPrice || ''}
                  onChange={(e) =>
                    handleChange(
                      'minPrice',
                      e.target.value ? Number(e.target.value) : '',
                    )
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Price
                </label>
                <input
                  type="number"
                  min="0"
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                  placeholder="e.g. 5000000"
                  value={filters.maxPrice || ''}
                  onChange={(e) =>
                    handleChange(
                      'maxPrice',
                      e.target.value ? Number(e.target.value) : '',
                    )
                  }
                />
              </div>
            </div>

            {/* Min Year */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min. Year
              </label>
              <input
                type="number"
                min="1900"
                max={new Date().getFullYear() + 1}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                placeholder="e.g. 2020"
                value={filters.minYear || ''}
                onChange={(e) =>
                  handleChange(
                    'minYear',
                    e.target.value ? Number(e.target.value) : '',
                  )
                }
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
                placeholder="e.g. Lagos"
                value={filters.state || ''}
                onChange={(e) => handleChange('state', e.target.value)}
              />
            </div>

            {/* Condition */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Condition
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.condition || ''}
                onChange={(e) => handleChange('condition', e.target.value)}
              >
                <option value="">Any</option>
                <option value="new">New</option>
                <option value="used">Used</option>
                <option value="certified">Certified</option>
              </select>
            </div>

            {/* Listing Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Listing Type
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.listingType || ''}
                onChange={(e) => handleChange('listingType', e.target.value)}
              >
                <option value="">Any</option>
                <option value="sell">Sale</option>
                <option value="swap">Swap</option>
                <option value="rent">Rent</option>
              </select>
            </div>

            {/* Status - Note: usually handled by tabs, but good to have explicit override */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2 px-3 border"
                value={filters.status || ''}
                onChange={(e) => handleChange('status', e.target.value)}
              >
                <option value="">Any</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="sold">Sold</option>
                <option value="rejected">Rejected</option>
                <option value="flagged">Flagged</option>
              </select>
            </div>

            {/* Flagged */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="flagged-filter"
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                checked={filters.flagged === true}
                onChange={(e) => handleChange('flagged', e.target.checked)}
              />
              <label
                htmlFor="flagged-filter"
                className="text-sm font-medium text-gray-700"
              >
                Show Flagged Only
              </label>
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
                    <option value="price">Price</option>
                    <option value="year_of_manufacture">Year</option>
                    <option value="title">Title</option>
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
