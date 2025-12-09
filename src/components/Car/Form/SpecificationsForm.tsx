import { useFormContext } from 'react-hook-form';
import { Input } from '@/components';
import { UpdateCarRequest } from '@/interfaces';

const SpecificationsForm = () => {
  const { register } = useFormContext<UpdateCarRequest>();

  const inputClass =
    'w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary)';

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4 flex-1">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Specifications
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Year"
          type="number"
          {...register('year_of_manufacture', { required: 'Required' })}
        />
        <Input
          label="Mileage"
          type="number"
          {...register('mileage', { required: 'Required' })}
        />

        <Input label="Color" {...register('color', { required: 'Required' })} />

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Condition
          </label>
          <select {...register('condition')} className={inputClass}>
            {['new', 'used', 'certified'].map((opt) => (
              <option key={opt} value={opt} className="capitalize">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Second Condition
          </label>
          <select {...register('second_condition')} className={inputClass}>
            <option value="">None</option>
            {['Excellent', 'Good', 'Fair', 'Salvage'].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Transmission
          </label>
          <select {...register('transmission')} className={inputClass}>
            {[
              'automatic',
              'manual',
              'cvt',
              'dct',
              'semi_automatic',
              'sequential',
              'tiptronic',
              'dsg',
              'amt',
              'direct_shift',
              'e_cvt',
              'hybrid',
              'single_speed',
            ].map((opt) => (
              <option key={opt} value={opt} className="capitalize">
                {opt.replace('_', ' ')}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Fuel Type
          </label>
          <select {...register('fuel_type')} className={inputClass}>
            {['petrol', 'diesel', 'electric', 'hybrid'].map((opt) => (
              <option key={opt} value={opt} className="capitalize">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Gear Type
          </label>
          <select {...register('gear_type')} className={inputClass}>
            <option value="">Select Gear Type</option>
            {['type_s', 'type_a', 'type_b'].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <Input
          label="Number of Seats"
          type="number"
          {...register('number_of_seats')}
        />
        <Input
          label="Engine Size"
          type="number"
          step="0.1"
          {...register('engine_size')}
          placeholder="e.g. 2.0"
        />
        <Input
          label="Horse Power"
          {...register('horse_power')}
          placeholder="e.g. 250hp"
        />
      </div>
    </div>
  );
};

export default SpecificationsForm;
