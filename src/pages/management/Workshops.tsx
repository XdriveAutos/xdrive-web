import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  BuildingStorefrontIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  WrenchScrewdriverIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/PageHeader';
import { Button, Loading, Pagination, Input } from '@/components';
import { useWorkshops } from '@/queries/useWorkshops';
import { Workshop, RejectWorkshopRequest } from '@/interfaces/workshop';
import {
  WorkshopDeleteModal,
  WorkshopVerifyModal,
  WorkshopRejectModal,
} from '@/components/Workshop';

const Workshops = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState('');

  const { useGetWorkshops, deleteWorkshop, verifyWorkshop, rejectWorkshop } =
    useWorkshops();

  const { data: workshopsData, isLoading } = useGetWorkshops(page);
  const workshopsList = workshopsData?.data?.data || [];
  const pagination = workshopsData?.data?.pagination;

  // Modal States
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    workshopId: string | null;
  }>({
    isOpen: false,
    workshopId: null,
  });

  const [verifyConfirmation, setVerifyConfirmation] = useState<{
    isOpen: boolean;
    workshop: Workshop | null;
  }>({
    isOpen: false,
    workshop: null,
  });

  const [rejectConfirmation, setRejectConfirmation] = useState<{
    isOpen: boolean;
    workshop: Workshop | null;
  }>({
    isOpen: false,
    workshop: null,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const confirmDelete = (workshopId: string) => {
    setDeleteConfirmation({ isOpen: true, workshopId });
  };

  const handleDelete = async () => {
    if (deleteConfirmation.workshopId) {
      try {
        await deleteWorkshop(deleteConfirmation.workshopId);
        setDeleteConfirmation({ isOpen: false, workshopId: null });
      } catch (error) {
        console.error('Failed to delete workshop', error);
      }
    }
  };

  const confirmVerify = (workshop: Workshop) => {
    setVerifyConfirmation({ isOpen: true, workshop });
  };

  const handleVerify = async () => {
    if (verifyConfirmation.workshop) {
      try {
        await verifyWorkshop(verifyConfirmation.workshop.id);
        setVerifyConfirmation({ isOpen: false, workshop: null });
      } catch (error) {
        console.error('Failed to verify workshop', error);
      }
    }
  };

  const confirmReject = (workshop: Workshop) => {
    setRejectConfirmation({ isOpen: true, workshop });
  };

  const handleReject = async (data: RejectWorkshopRequest) => {
    if (rejectConfirmation.workshop) {
      try {
        await rejectWorkshop({
          id: rejectConfirmation.workshop.id,
          data,
        });
        setRejectConfirmation({ isOpen: false, workshop: null });
      } catch (error) {
        console.error('Failed to reject workshop', error);
      }
    }
  };

  // Filter workshops based on search query
  const filteredWorkshops = workshopsList.filter((workshop) =>
    workshop.workshop_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isEmpty = filteredWorkshops.length === 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Workshops Management"
          description="Manage workshops, verify profiles, and handle applications."
          icon={<BuildingStorefrontIcon className="h-12 w-12" />}
        />
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search workshops..."
            leftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {isEmpty ? (
          <div className="text-center py-12 bg-(--color-surface) rounded-3xl border border-dashed border-(--color-border)">
            <BuildingStorefrontIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
            <h3 className="text-lg font-medium text-(--color-text)">
              No workshops found
            </h3>
            <p className="text-(--color-body)">
              There are no workshops matching your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredWorkshops.map((workshop) => (
                <div
                  key={workshop.id}
                  className={`
                    relative bg-(--color-surface) rounded-2xl border transition-all duration-200 flex flex-col
                    ${
                      workshop.is_active
                        ? 'border-(--color-border) shadow-sm hover:shadow-md'
                        : 'border-(--color-border) opacity-75 bg-(--color-background)/50'
                    }
                  `}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span
                      className={`
                        px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1
                        ${
                          workshop.is_verified
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }
                      `}
                    >
                      {workshop.is_verified ? (
                        <>
                          <CheckCircleIcon className="h-3 w-3" />
                          Verified
                        </>
                      ) : (
                        <>
                          <ClockIcon className="h-3 w-3" />
                          Pending
                        </>
                      )}
                    </span>
                  </div>

                  <div className="p-6 flex-1 flex flex-col items-center text-center mt-4">
                    {/* Image */}
                    <div className="mb-4">
                      <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow-sm bg-linear-to-br from-indigo-50 to-purple-50 text-indigo-600 flex items-center justify-center font-bold text-3xl overflow-hidden">
                        {workshop.images && workshop.images.length > 0 ? (
                          <img
                            src={workshop.images[0]}
                            alt={workshop.workshop_name}
                            className="h-full w-full object-cover"
                          />
                        ) : workshop.user?.profile_image ? (
                          <img
                            src={workshop.user.profile_image}
                            alt={workshop.workshop_name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <BuildingStorefrontIcon className="h-8 w-8" />
                        )}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-bold text-lg text-(--color-text) mb-1">
                      {workshop.workshop_name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                        Workshop
                      </span>
                      {workshop.years_of_experience > 0 && (
                        <span className="text-xs text-(--color-body)">
                          • {workshop.years_of_experience}y exp
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="w-full space-y-2 text-sm text-(--color-body)">
                      <div className="flex items-center justify-center gap-4">
                        <div className="flex items-center gap-1">
                          <StarIcon className="h-4 w-4 shrink-0 text-amber-400" />
                          <span className="font-medium text-(--color-text)">
                            {workshop.average_rating || 'New'}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <WrenchScrewdriverIcon className="h-4 w-4 shrink-0 text-gray-400" />
                          <span className="font-medium text-(--color-text)">
                            {workshop.no_of_mechanics}
                          </span>
                          <span className="text-xs">mechs</span>
                        </div>
                      </div>

                      {workshop.phone_number && (
                        <div className="flex items-center justify-center gap-2">
                          <PhoneIcon className="h-4 w-4 shrink-0 text-gray-400" />
                          <span className="truncate">
                            {workshop.phone_number}
                          </span>
                        </div>
                      )}

                      {(workshop.city || workshop.country) && (
                        <div className="flex items-center justify-center gap-2">
                          <MapPinIcon className="h-4 w-4 shrink-0 text-gray-400" />
                          <span className="truncate">
                            {[workshop.city, workshop.country]
                              .filter(Boolean)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-(--color-border) space-y-2">
                    {!workshop.is_verified && (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-center text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                          onClick={() => confirmVerify(workshop)}
                          icon={<CheckCircleIcon className="h-4 w-4" />}
                        >
                          Verify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-center text-red-600 hover:bg-red-50 border-red-200"
                          onClick={() => confirmReject(workshop)}
                          icon={<XCircleIcon className="h-4 w-4" />}
                        >
                          Reject
                        </Button>
                      </div>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full justify-center text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                      onClick={() => confirmDelete(workshop.id)}
                      icon={<TrashIcon className="h-4 w-4" />}
                    >
                      Delete Workshop
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {pagination && (
              <Pagination
                pagination={pagination}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      <WorkshopDeleteModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, workshopId: null })
        }
        onConfirm={handleDelete}
        isLoading={false}
      />

      <WorkshopVerifyModal
        isOpen={verifyConfirmation.isOpen}
        onClose={() => setVerifyConfirmation({ isOpen: false, workshop: null })}
        onConfirm={handleVerify}
        workshop={verifyConfirmation.workshop}
        isLoading={false}
      />

      <WorkshopRejectModal
        isOpen={rejectConfirmation.isOpen}
        onClose={() => setRejectConfirmation({ isOpen: false, workshop: null })}
        onConfirm={handleReject}
        workshop={rejectConfirmation.workshop}
        isLoading={false}
      />
    </div>
  );
};

export default Workshops;
