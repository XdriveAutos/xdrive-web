import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import {
  BuildingStorefrontIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useBodyType } from '@/queries/useBodyType';
import { Button, Loading } from '@/components';
import { BodyTypeModal, DeleteBodyTypeModal } from '@/components/BodyType';
import {
  BodyType,
  CreateBodyTypeRequest,
  UpdateBodyTypeRequest,
} from '@/interfaces';

const BodyTypes = () => {
  const { useGetBodyTypes, createBodyType, updateBodyType, deleteBodyType } =
    useBodyType();

  const { data: bodyTypesResponse, isLoading: bodyTypesLoading } =
    useGetBodyTypes();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBodyType, setEditingBodyType] = useState<BodyType | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    bodyTypeId: string | null;
  }>({
    isOpen: false,
    bodyTypeId: null,
  });

  const handleCreate = () => {
    setEditingBodyType(null);
    setIsModalOpen(true);
  };

  const handleEdit = (bodyType: BodyType) => {
    setEditingBodyType(bodyType);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmation({ isOpen: true, bodyTypeId: id });
  };

  const handleDelete = async () => {
    if (!deleteConfirmation.bodyTypeId) return;

    try {
      await deleteBodyType(deleteConfirmation.bodyTypeId);
      setDeleteConfirmation({ isOpen: false, bodyTypeId: null });
    } catch (error) {
      console.error('Failed to delete body type', error);
    }
  };

  const handleToggleActive = async (bodyType: BodyType) => {
    try {
      await updateBodyType({
        id: bodyType.id,
        data: { is_active: !bodyType.is_active },
      });
    } catch (error) {
      console.error('Failed to update body type status', error);
    }
  };

  const handleSubmit = async (data: CreateBodyTypeRequest) => {
    setIsSubmitting(true);
    try {
      if (editingBodyType) {
        await updateBodyType({
          id: editingBodyType.id,
          data: data as UpdateBodyTypeRequest,
        });
      } else {
        await createBodyType(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (bodyTypesLoading) {
    return <Loading />;
  }

  // Assuming the API returns array in data property based on previous check
  const bodyTypesList = bodyTypesResponse?.data || [];
  const isEmpty = bodyTypesList.length === 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Vehicle Body Types"
          description="Manage vehicle body types and their operations."
          icon={<BuildingStorefrontIcon className="h-12 w-12" />}
        />
        <Button onClick={handleCreate} icon={<PlusIcon className="h-5 w-5" />}>
          Create Body Type
        </Button>
      </div>

      {isEmpty && !bodyTypesLoading ? (
        <div className="text-center py-12 bg-(--color-surface) rounded-3xl border border-dashed border-(--color-border)">
          <BuildingStorefrontIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
          <h3 className="text-lg font-medium text-(--color-text)">
            No body types found
          </h3>
          <p className="text-(--color-body) mb-6">
            Get started by creating a new body type.
          </p>
          <Button
            onClick={handleCreate}
            icon={<PlusIcon className="h-5 w-5" />}
          >
            Create Body Type
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bodyTypesList.map((bodyType) => (
            <div
              key={bodyType.id}
              className={`
                relative bg-(--color-surface) rounded-2xl border transition-all duration-200 flex flex-col
                ${
                  bodyType.is_active
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
                      bodyType.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }
                  `}
                >
                  {bodyType.is_active ? (
                    <>
                      <CheckCircleIcon className="h-3 w-3" />
                      Active
                    </>
                  ) : (
                    <>
                      <XCircleIcon className="h-3 w-3" />
                      Inactive
                    </>
                  )}
                </span>
              </div>

              <div className="p-6 flex-1 flex flex-col items-center text-center mt-4">
                {/* Icon/Initial */}
                <div className="mb-4">
                  <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow-sm bg-blue-50 text-blue-600 flex items-center justify-center">
                    <span className="text-3xl font-bold">
                      {bodyType.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-lg text-(--color-text) mb-1 truncate w-full">
                  {bodyType.name}
                </h3>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-(--color-border) space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-center"
                    onClick={() => handleEdit(bodyType)}
                    icon={<PencilIcon className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`justify-center ${
                      bodyType.is_active
                        ? 'text-gray-600 hover:bg-gray-50 border-gray-200'
                        : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200'
                    }`}
                    onClick={() => handleToggleActive(bodyType)}
                    icon={
                      bodyType.is_active ? (
                        <XCircleIcon className="h-4 w-4" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4" />
                      )
                    }
                  >
                    {bodyType.is_active ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                  onClick={() => confirmDelete(bodyType.id)}
                  icon={<TrashIcon className="h-4 w-4" />}
                >
                  Delete Body Type
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <BodyTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingBodyType}
        isLoading={isSubmitting}
      />

      <DeleteBodyTypeModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, bodyTypeId: null })
        }
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default BodyTypes;
