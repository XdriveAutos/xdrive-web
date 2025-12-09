import { useFormContext } from 'react-hook-form';
import { Input } from '@/components';
import { UpdateCarRequest } from '@/interfaces';

const LocationForm = () => {
  const { register } = useFormContext<UpdateCarRequest>();

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Location
      </h2>
      <div className="space-y-4">
        <Input label="Address" {...register('address')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="City" {...register('city')} />
          <Input label="State" {...register('state')} />
        </div>
        <Input label="Country" {...register('country')} />
      </div>
    </div>
  );
};

export default LocationForm;
