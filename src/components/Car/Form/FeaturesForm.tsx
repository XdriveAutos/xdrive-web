import { useFormContext } from 'react-hook-form';
import { Input } from '@/components';
import { UpdateCarRequest } from '@/interfaces';

const FeaturesForm = () => {
  const { register } = useFormContext<UpdateCarRequest>();

  const inputClass =
    'w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary)';

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Features & Identification
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="Registered Car No." {...register('registered_car')} />
        <Input label="Chassis Number" {...register('my_chasis_number')} />
      </div>

      <div className="space-y-2 mt-4">
        <label className="text-sm font-medium text-(--color-text)">
          Key Features (JSON)
        </label>
        <textarea
          {...register('key_features')}
          className={`${inputClass} min-h-[100px] font-mono text-xs`}
          placeholder='["Feature 1", "Feature 2"]'
        />
        <p className="text-xs text-gray-500">
          Enter features as a JSON array or string.
        </p>
      </div>
    </div>
  );
};

export default FeaturesForm;
