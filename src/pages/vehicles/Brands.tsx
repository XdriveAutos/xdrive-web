import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import PageHeader from '@/components/PageHeader';
import {
  BuildingStorefrontIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { useBrand } from '@/queries/useBrand';
import { Button, Loading, Pagination } from '@/components';
import {
  BrandModal,
  BrandModelsModal,
  DeleteBrandModal,
} from '@/components/Brand';
import {
  Brand,
  CreateBrandRequest,
  UpdateBrandRequest,
} from '@/interfaces/brand';
import { toast } from 'sonner';

const Brands = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const { allBrandsQuery, createBrand, updateBrand, deleteBrand } = useBrand(
    null,
    page,
  );

  const { data: allBrands, isLoading: allBrandsLoading } = allBrandsQuery;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [viewingBrandId, setViewingBrandId] = useState<string | null>(null);

  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    isOpen: boolean;
    brandId: string | null;
  }>({
    isOpen: false,
    brandId: null,
  });

  const handleCreate = () => {
    setEditingBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand: Brand) => {
    setEditingBrand(brand);
    setIsModalOpen(true);
  };

  const confirmDelete = (id: string) => {
    setDeleteConfirmation({ isOpen: true, brandId: id });
  };

  const handleDelete = async () => {
    if (!deleteConfirmation.brandId) return;

    try {
      await deleteBrand(deleteConfirmation.brandId);
      setDeleteConfirmation({ isOpen: false, brandId: null });
    } catch (error) {
      console.error('Failed to delete brand', error);
      toast.error('Failed to delete brand');
    }
  };

  const handleToggleActive = async (brand: Brand) => {
    try {
      await updateBrand({
        id: brand.id,
        data: { is_active: !brand.is_active },
      });
    } catch (error) {
      console.error('Failed to update brand status', error);
      toast.error('Failed to update brand status');
    }
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const handleSubmit = async (data: CreateBrandRequest) => {
    setIsSubmitting(true);
    try {
      if (editingBrand) {
        await updateBrand({
          id: editingBrand.id,
          data: data as UpdateBrandRequest,
        });
      } else {
        await createBrand(data);
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      toast.error('Failed to save brand');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (allBrandsLoading) {
    return <Loading />;
  }

  const brandsList = allBrands?.data?.data || [];
  const pagination = allBrands?.data?.pagination;
  const isEmpty = brandsList.length === 0;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <PageHeader
          title="Vehicle Brands"
          description="Manage vehicle brands and their operations."
          icon={<BuildingStorefrontIcon className="h-12 w-12" />}
        />
        <Button onClick={handleCreate} icon={<PlusIcon className="h-5 w-5" />}>
          Create Brand
        </Button>
      </div>

      {isEmpty && !allBrandsLoading ? (
        <div className="text-center py-12 bg-(--color-surface) rounded-3xl border border-dashed border-(--color-border)">
          <BuildingStorefrontIcon className="h-12 w-12 mx-auto text-(--color-inactive) mb-3" />
          <h3 className="text-lg font-medium text-(--color-text)">
            No brands found
          </h3>
          <p className="text-(--color-body) mb-6">
            Get started by creating a new vehicle brand.
          </p>
          <Button
            onClick={handleCreate}
            icon={<PlusIcon className="h-5 w-5" />}
          >
            Create Brand
          </Button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {brandsList.map((brand) => (
              <div
                key={brand.id}
                className={`
                  relative bg-(--color-surface) rounded-2xl border transition-all duration-200 flex flex-col
                  ${
                    brand.is_active
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
                        brand.is_active
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-gray-50 text-gray-600 border-gray-200'
                      }
                    `}
                  >
                    {brand.is_active ? (
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
                  {/* Logo/Icon */}
                  <div className="mb-4">
                    <div className="h-20 w-20 rounded-xl border border-gray-100 shadow-sm bg-white p-2 flex items-center justify-center">
                      {brand.logo ? (
                        <img
                          src={brand.logo}
                          alt={brand.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <BuildingStorefrontIcon className="h-10 w-10 text-gray-300" />
                      )}
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="font-bold text-lg text-(--color-text) mb-1 truncate w-full">
                    {brand.name}
                  </h3>

                  {/* Count */}
                  <p className="text-xs text-(--color-body)">
                    {brand.car_models_count || 0} Models
                  </p>
                </div>

                {/* Actions */}
                <div className="p-4 border-t border-(--color-border) space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-center"
                      onClick={() => setViewingBrandId(brand.id)}
                      icon={<EyeIcon className="h-4 w-4" />}
                    >
                      Models
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-center"
                      onClick={() => handleEdit(brand)}
                      icon={<PencilIcon className="h-4 w-4" />}
                    >
                      Edit
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className={`justify-center ${
                        brand.is_active
                          ? 'text-gray-600 hover:bg-gray-50 border-gray-200'
                          : 'text-emerald-600 hover:bg-emerald-50 border-emerald-200'
                      }`}
                      onClick={() => handleToggleActive(brand)}
                      icon={
                        brand.is_active ? (
                          <XCircleIcon className="h-4 w-4" />
                        ) : (
                          <CheckCircleIcon className="h-4 w-4" />
                        )
                      }
                    >
                      {brand.is_active ? 'Disable' : 'Enable'}
                    </Button>

                    <Button
                      variant="outline"
                      size="sm"
                      className="justify-center text-red-600 hover:bg-red-50 border-red-200 hover:border-red-300"
                      onClick={() => confirmDelete(brand.id)}
                      icon={<TrashIcon className="h-4 w-4" />}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {pagination && (
            <Pagination
              pagination={pagination}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      <BrandModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={editingBrand}
        isLoading={isSubmitting}
      />

      <BrandModelsModal
        isOpen={!!viewingBrandId}
        onClose={() => setViewingBrandId(null)}
        brandId={viewingBrandId}
      />

      <DeleteBrandModal
        isOpen={deleteConfirmation.isOpen}
        onClose={() => setDeleteConfirmation({ isOpen: false, brandId: null })}
        onConfirm={handleDelete}
      />
    </div>
  );
};

export default Brands;
