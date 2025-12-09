import { useFormContext } from 'react-hook-form';
import { SearchableSelect } from '@/components';
import { UpdateCarRequest } from '@/interfaces';
import { Brand } from '@/interfaces/brand';
import { CarModel } from '@/interfaces/car-model';
import { BodyType } from '@/interfaces/body-type';

interface ClassificationFormProps {
  brands: Brand[];
  carModels: CarModel[];
  bodyTypes: BodyType[];
  selectedBrandId: string;
  setBrandSearch: (search: string) => void;
}

const ClassificationForm = ({
  brands,
  carModels,
  bodyTypes,
  selectedBrandId,
  setBrandSearch,
}: ClassificationFormProps) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<UpdateCarRequest>();

  const inputClass =
    'w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary)';

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Classification
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <SearchableSelect
            label="Brand"
            placeholder="Select Brand"
            options={brands.map((b) => ({ id: b.id, name: b.name }))}
            value={selectedBrandId}
            onChange={(val) => {
              setValue('brand_id', val as string);
              setValue('car_model_id', '');
            }}
            onSearch={setBrandSearch}
            error={errors.brand_id?.message}
          />
          <input
            type="hidden"
            {...register('brand_id', { required: 'Brand is required' })}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Model
          </label>
          <select
            {...register('car_model_id', { required: 'Model is required' })}
            className={inputClass}
            disabled={!selectedBrandId}
          >
            <option value="">Select Model</option>
            {carModels.map((model) => (
              <option key={model.id} value={model.id}>
                {model.name}
              </option>
            ))}
          </select>
          {errors.car_model_id && (
            <span className="text-sm text-red-500">
              {errors.car_model_id.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Body Type
          </label>
          <select
            {...register('body_type_id', {
              required: 'Body Type is required',
            })}
            className={inputClass}
          >
            <option value="">Select Body Type</option>
            {bodyTypes.map((bt) => (
              <option key={bt.id} value={bt.id}>
                {bt.name}
              </option>
            ))}
          </select>
          {errors.body_type_id && (
            <span className="text-sm text-red-500">
              {errors.body_type_id.message}
            </span>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Trim
          </label>
          <select {...register('trim')} className={inputClass}>
            <option value="">Select Trim</option>
            {[
              'Base',
              'Sport',
              'Luxury',
              'Limited',
              'Premium',
              'Touring',
              'GT',
              'Elite',
              'Ultimate',
              'Type-S',
            ].map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ClassificationForm;
