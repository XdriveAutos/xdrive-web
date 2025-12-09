import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  TrashIcon,
  MapPinIcon,
  StarIcon,
  PhoneIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';
import PageHeader from '@/components/PageHeader';
import { Button, Loading, Pagination, Input } from '@/components';
import { useMechanics } from '@/queries/useMechanics';
import { Mechanic, RejectMechanicRequest } from '@/interfaces/mechanic';
import {
  MechanicDeleteModal,
  MechanicVerifyModal,
  MechanicRejectModal,
} from '@/components/Mechanic';

const Mechanics = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;
  const [searchQuery, setSearchQuery] = useState('');

  const { useGetMechanics, deleteMechanic, verifyMechanic, rejectMechanic } =
    useMechanics();

  const { data: mechanicsData, isLoading } = useGetMechanics(page);
  const mechanicsList = mechanicsData?.data?.data || [];
  const pagination = mechanicsData?.data?.pagination;

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    mechanicId: string | null;
  }>({
    isOpen: false,
    mechanicId: null,
  });

  const [verifyConfirmation, setVerifyConfirmation] = useState<{
    isOpen: boolean;
    mechanic: Mechanic | null;
  }>({
    isOpen: false,
    mechanic: null,
  });

  const [rejectConfirmation, setRejectConfirmation] = useState<{
    isOpen: boolean;
    mechanic: Mechanic | null;
  }>({
    isOpen: false,
    mechanic: null,
  });

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const confirmDelete = (mechanicId: string) => {
    setDeleteConfirmation({ isOpen: true, mechanicId });
  };

  const handleDelete = async () => {
    if (deleteConfirmation.mechanicId) {
      try {
        await deleteMechanic(deleteConfirmation.mechanicId);
        setDeleteConfirmation({ isOpen: false, mechanicId: null });
      } catch (error) {
        console.error('Failed to delete mechanic', error);
      }
    }
  };

  const confirmVerify = (mechanic: Mechanic) => {
    setVerifyConfirmation({ isOpen: true, mechanic });
  };

  const handleVerify = async () => {
    if (verifyConfirmation.mechanic) {
      try {
        await verifyMechanic(verifyConfirmation.mechanic.id);
        setVerifyConfirmation({ isOpen: false, mechanic: null });
      } catch (error) {
        console.error('Failed to verify mechanic', error);
      }
    }
  };

  const confirmReject = (mechanic: Mechanic) => {
    setRejectConfirmation({ isOpen: true, mechanic });
  };

  const handleReject = async (data: RejectMechanicRequest) => {
    if (rejectConfirmation.mechanic) {
      try {
        await rejectMechanic({
          id: rejectConfirmation.mechanic.id,
          data,
        });
        setRejectConfirmation({ isOpen: false, mechanic: null });
      } catch (error) {
        console.error('Failed to reject mechanic', error);
      }
    }
  };

  // Filter mechanics based on search query
  const filteredMechanics = mechanicsList.filter((mechanic) =>
    mechanic.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const isEmpty = filteredMechanics.length === 0;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Mechanics Management"
          description="Manage mechanics, verify profiles, and handle applications."
          icon={<WrenchScrewdriverIcon className="h-12 w-12" />}
        />
        <div className="w-full sm:w-72">
          <Input
            placeholder="Search mechanics..."
            leftIcon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        {isEmpty ? (
          <div className="text-center py-12 bg-(--color-surface) rounded-3xl border border-dashed border-(--color-border)">
            <WrenchScrewdriverIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
            <h3 className="text-lg font-medium text-(--color-text)">
              No mechanics found
            </h3>
            <p className="text-(--color-body)">
              There are no mechanics matching your search.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMechanics.map((mechanic) => (
                <div
                  key={mechanic.id}
                  className={`
                    relative bg-(--color-surface) rounded-2xl border transition-all duration-200 flex flex-col
                    ${
                      mechanic.is_active
                        ? 'border-(--color-border) shadow-sm hover:shadow-md'
                        : 'border-(--color-border) opacity-75 bg-(--color-background)/50'
                    }
                  `}
                >
                  {/* Status Badge */}
                  <div className="absolute top-4 right-4">
                    <span
                      className={`
                        px-2.5 py-1 rounded-full text-xs font-medium border flex items-center gap-1
                        ${
                          mechanic.is_verified
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }
                      `}
                    >
                      {mechanic.is_verified ? (
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
                    {/* Avatar/Image */}
                    <div className="mb-4">
                      <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow-sm bg-linear-to-br from-orange-50 to-amber-50 text-orange-600 flex items-center justify-center font-bold text-3xl overflow-hidden">
                        {mechanic.images && mechanic.images.length > 0 ? (
                          <img
                            src={mechanic.images[0]}
                            alt={mechanic.name}
                            className="h-full w-full object-cover"
                          />
                        ) : mechanic.user?.profile_image ? (
                          <img
                            src={mechanic.user.profile_image}
                            alt={mechanic.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          mechanic.name.charAt(0)
                        )}
                      </div>
                    </div>

                    {/* Name & Role */}
                    <h3 className="font-bold text-lg text-(--color-text) mb-1">
                      {mechanic.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1 mb-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                        Mechanic
                      </span>
                      {mechanic.years_of_experience > 0 && (
                        <span className="text-xs text-(--color-body)">
                          • {mechanic.years_of_experience}y exp
                        </span>
                      )}
                    </div>

                    {/* Details */}
                    <div className="w-full space-y-2 text-sm text-(--color-body)">
                      <div className="flex items-center justify-center gap-2">
                        <StarIcon className="h-4 w-4 shrink-0 text-amber-400" />
                        <span className="font-medium text-(--color-text)">
                          {mechanic.average_rating || 'New'}
                        </span>
                        <span className="text-xs">
                          ({mechanic.total_reviews} reviews)
                        </span>
                      </div>

                      {mechanic.phone_number && (
                        <div className="flex items-center justify-center gap-2">
                          <PhoneIcon className="h-4 w-4 shrink-0 text-gray-400" />
                          <span className="truncate">
                            {mechanic.phone_number}
                          </span>
                        </div>
                      )}

                      {(mechanic.city || mechanic.country) && (
                        <div className="flex items-center justify-center gap-2">
                          <MapPinIcon className="h-4 w-4 shrink-0 text-gray-400" />
                          <span className="truncate">
                            {[mechanic.city, mechanic.country]
                              .filter(Boolean)
                              .join(', ')}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-(--color-border) space-y-2">
                    {!mechanic.is_verified && (
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-center text-emerald-600 hover:bg-emerald-50 border-emerald-200"
                          onClick={() => confirmVerify(mechanic)}
                          icon={<CheckCircleIcon className="h-4 w-4" />}
                        >
                          Verify
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="justify-center text-red-600 hover:bg-red-50 border-red-200"
                          onClick={() => confirmReject(mechanic)}
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
                      onClick={() => confirmDelete(mechanic.id)}
                      icon={<TrashIcon className="h-4 w-4" />}
                    >
                      Delete Mechanic
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

      <MechanicDeleteModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, mechanicId: null })
        }
        onConfirm={handleDelete}
        isLoading={false}
      />

      <MechanicVerifyModal
        isOpen={verifyConfirmation.isOpen}
        onClose={() => setVerifyConfirmation({ isOpen: false, mechanic: null })}
        onConfirm={handleVerify}
        mechanic={verifyConfirmation.mechanic}
        isLoading={false}
      />

      <MechanicRejectModal
        isOpen={rejectConfirmation.isOpen}
        onClose={() => setRejectConfirmation({ isOpen: false, mechanic: null })}
        onConfirm={handleReject}
        mechanic={rejectConfirmation.mechanic}
        isLoading={false}
      />
    </div>
  );
};

export default Mechanics;
