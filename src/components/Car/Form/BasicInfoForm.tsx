import { useFormContext } from 'react-hook-form';
import { Input } from '@/components';
import { UpdateCarRequest } from '@/interfaces';

const BasicInfoForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<UpdateCarRequest>();

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Basic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <Input
            label="Title"
            {...register('title', {
              required: 'Title is required',
              maxLength: 255,
            })}
            error={errors.title?.message}
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Description
          </label>
          <textarea
            {...register('description', { maxLength: 5000 })}
            className="w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary) min-h-[120px]"
          />
          {errors.description && (
            <span className="text-sm text-red-500">
              {errors.description.message}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicInfoForm;
