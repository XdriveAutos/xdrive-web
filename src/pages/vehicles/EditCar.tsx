import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { useCars } from '@/queries/useCars';
import { useBrand } from '@/queries/useBrand';
import { useBodyType } from '@/queries/useBodyType';
import { useCarModel } from '@/queries/useCarModel';
import { Button, Loading, PageHeader } from '@/components';
import {
  BasicInfoForm,
  ClassificationForm,
  FeaturesForm,
  LocationForm,
  PricingListingForm,
  SettingsForm,
  SpecificationsForm,
} from '@/components/Car/Form';
import { UpdateCarRequest } from '@/interfaces';

const EditCar = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { useGetCar, updateCar, updateCarPending } = useCars();
  const [brandSearch, setBrandSearch] = useState('');

  const { allBrandsQuery } = useBrand(null, 1, brandSearch);
  const { useGetBodyTypes } = useBodyType();
  const { data: bodyTypesData } = useGetBodyTypes();
  const brands = allBrandsQuery.data?.data.data || [];
  const bodyTypes = bodyTypesData?.data || [];

  const { data: carResponse, isLoading: carLoading } = useGetCar(id || '');
  const car = carResponse?.data;

  // Form setup
  const methods = useForm<UpdateCarRequest>();
  const { handleSubmit, reset, watch } = methods;

  const selectedBrandId = watch('brand_id');

  // Fetch models based on selected brand
  const { useGetCarModels } = useCarModel();
  const { data: modelsResponse } = useGetCarModels(selectedBrandId || '');
  const carModels = modelsResponse?.data.data || [];

  // Populate form
  useEffect(() => {
    if (car) {
      reset({
        // Basic
        title: car.title,
        description: car.description,

        // Classification
        brand_id: car.brand?.id,
        car_model_id: car.car_model?.id,
        body_type_id: car.body_type?.id,
        trim: car.trim,

        // Specs
        year_of_manufacture: car.year_of_manufacture,
        mileage: car.mileage,
        engine_size: parseFloat(car.engine_size) || undefined,
        horse_power: car.horse_power,
        color: car.color,
        condition: car.condition as any,
        second_condition: car.second_condition as any,
        transmission: car.transmission as any,
        fuel_type: car.fuel_type as any,
        gear_type: car.gear_type as any,
        number_of_seats: car.number_of_seats,

        // Pricing
        price: parseFloat(car.price),
        price_negotiable: car.price_negotiable as any,
        listing_type: car.listing_type as any,
        swap_method: car.swap_method as any,
        swap_with: car.swap_with || '',

        // Details
        registered_car: car.registered_car || '',
        my_chasis_number: car.my_chasis_number || '',
        key_features: car.key_features,

        // Location
        address: car.address,
        city: car.city,
        state: car.state,
        country: car.country,

        // Settings
        status: car.status as any,
        is_featured: car.is_featured,
        flagged: !!car.flagged,
        is_approved: !!car.is_approved,
        rejection_reason: car.rejection_reason || '',
      });
    }
  }, [car, reset]);

  const onSubmit = async (data: UpdateCarRequest) => {
    if (!id) return;
    try {
      const payload = {
        ...data,
        year_of_manufacture: Number(data.year_of_manufacture),
        price: Number(data.price),
        mileage: Number(data.mileage),
        number_of_seats: Number(data.number_of_seats),
        engine_size: Number(data.engine_size),
      };

      await updateCar({ id, data: payload });
      navigate(`/vehicles/cars/${id}`);
    } catch (error) {
      console.error('Failed to update car', error);
    }
  };

  if (carLoading) return <Loading />;
  if (!car) return <div>Car not found</div>;

  return (
    <div className="pb-20">
      <PageHeader
        title="Edit Car Details"
        description="Update car details and settings"
        icon={<PencilSquareIcon className="h-8 w-8" />}
      />

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 flex flex-col gap-6 h-full">
              <BasicInfoForm />

              <ClassificationForm
                brands={brands}
                carModels={carModels}
                bodyTypes={bodyTypes}
                selectedBrandId={selectedBrandId || ''}
                setBrandSearch={setBrandSearch}
              />

              <SpecificationsForm />
            </div>

            {/* Right Column (Sidebar) */}
            <div className="flex flex-col gap-6 h-full">
              <PricingListingForm />
              <LocationForm />
              <SettingsForm />
            </div>
          </div>

          <FeaturesForm />

          {/* Action Buttons */}
          <div className="flex justify-center gap-3 pt-6 border-t border-(--color-border)">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              type="button"
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={updateCarPending}>
              Save Changes
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

export default EditCar;
