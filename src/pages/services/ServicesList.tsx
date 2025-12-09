import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import {
  WrenchScrewdriverIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useServices } from '@/queries/useServices';
import { Button, Loading } from '@/components';
import {
  ServiceModal,
  DeleteServiceModal,
  ToggleServiceStatusModal,
} from '@/components/Service';
import {
  Service,
  CreateServiceRequest,
  UpdateServiceRequest,
} from '@/interfaces/service';

const ServicesList = () => {
  const { useGetServices, createService, updateService, deleteService } =
    useServices();

  const { data: servicesResponse, isLoading: servicesLoading } =
    useGetServices();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    serviceId: string | null;
  }>({
    isOpen: false,
    serviceId: null,
  });

  const [toggleConfirmation, setToggleConfirmation] = useState<{
    isOpen: boolean;
    service: Service | null;
  }>({
    isOpen: false,
    service: null,
  });

  const handleCreate = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmation({ isOpen: true, serviceId: id });
  };

  const handleDelete = async () => {
    if (!deleteConfirmation.serviceId) return;

    try {
      await deleteService(deleteConfirmation.serviceId);
      setDeleteConfirmation({ isOpen: false, serviceId: null });
    } catch (error) {
      console.error('Failed to delete service', error);
    }
  };

  const handleToggleActive = (service: Service) => {
    setToggleConfirmation({ isOpen: true, service: service });
  };

  const confirmToggleActive = async () => {
    if (!toggleConfirmation.service) return;

    try {
      await updateService({
        id: toggleConfirmation.service.id,
        data: { is_active: !toggleConfirmation.service.is_active },
      });
      setToggleConfirmation({ isOpen: false, service: null });
    } catch (error) {
      console.error('Failed to update service status', error);
    }
  };

  const handleSubmit = async (data: CreateServiceRequest) => {
    setIsSubmitting(true);
    try {
      if (editingService) {
        await updateService({
          id: editingService.id,
          data: data as UpdateServiceRequest,
        });
      } else {
        await createService(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (servicesLoading) {
    return <Loading />;
  }

  const servicesList = servicesResponse?.data || [];
  const isEmpty = servicesList.length === 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Services"
          description="Manage all available services."
          icon={<WrenchScrewdriverIcon className="h-12 w-12" />}
        />
        <Button onClick={handleCreate} icon={<PlusIcon className="h-5 w-5" />}>
          Create Service
        </Button>
      </div>

      {isEmpty && !servicesLoading ? (
        <div className="text-center py-12 bg-(--color-surface) rounded-3xl border border-dashed border-(--color-border)">
          <WrenchScrewdriverIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
          <h3 className="text-lg font-medium text-(--color-text)">
            No services found
          </h3>
          <p className="text-(--color-body) mb-6">
            Get started by creating a new service.
          </p>
          <Button
            onClick={handleCreate}
            icon={<PlusIcon className="h-5 w-5" />}
          >
            Create Service
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {servicesList.map((service) => (
            <div
              key={service.id}
              className={`
                relative bg-(--color-surface) rounded-2xl border transition-all duration-200 flex flex-col
                ${
                  service.is_active
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
                      service.is_active
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                        : 'bg-gray-50 text-gray-600 border-gray-200'
                    }
                  `}
                >
                  {service.is_active ? (
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
                {/* Icon */}
                <div className="mb-4">
                  <div className="h-20 w-20 rounded-full border-4 border-white dark:border-gray-800 shadow-sm bg-linear-to-br from-orange-50 to-amber-50 text-orange-600 flex items-center justify-center">
                    <WrenchScrewdriverIcon className="h-10 w-10" />
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-bold text-lg text-(--color-text) mb-2">
                  {service.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-(--color-body) leading-relaxed line-clamp-3 mb-4">
                  {service.description}
                </p>
              </div>

              {/* Actions */}
              <div className="p-4 border-t border-(--color-border) space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="justify-center"
                    onClick={() => handleEdit(service)}
                    icon={<PencilIcon className="h-4 w-4" />}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className={`justify-center ${
                      service.is_active
                        ? 'text-gray-600 hover:bg-gray-50 border-gray-200'
                        : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200'
                    }`}
                    onClick={() => handleToggleActive(service)}
                    icon={
                      service.is_active ? (
                        <XCircleIcon className="h-4 w-4" />
                      ) : (
                        <CheckCircleIcon className="h-4 w-4" />
                      )
                    }
                  >
                    {service.is_active ? 'Disable' : 'Enable'}
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-center text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                  onClick={() => confirmDelete(service.id)}
                  icon={<TrashIcon className="h-4 w-4" />}
                >
                  Delete Service
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ServiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingService}
        isLoading={isSubmitting}
      />

      <DeleteServiceModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() =>
          setDeleteConfirmation({ isOpen: false, serviceId: null })
        }
        onConfirm={handleDelete}
      />

      <ToggleServiceStatusModal
        isOpen={toggleConfirmation.isOpen}
        onClose={() => setToggleConfirmation({ isOpen: false, service: null })}
        onConfirm={confirmToggleActive}
        service={toggleConfirmation.service}
      />
    </div>
  );
};

export default ServicesList;
