import { useFormContext } from 'react-hook-form';
import { UpdateCarRequest } from '@/interfaces';

const SettingsForm = () => {
  const { register } = useFormContext<UpdateCarRequest>();

  const inputClass =
    'w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary)';

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4 flex-1">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Settings
      </h2>
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Status
          </label>
          <select {...register('status')} className={inputClass}>
            {[
              'active',
              'inactive',
              'sold',
              'pending',
              'approved',
              'rejected',
            ].map((opt) => (
              <option key={opt} value={opt} className="capitalize">
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Rejection Reason
          </label>
          <textarea
            {...register('rejection_reason')}
            className={inputClass}
            placeholder="Reason if rejected"
            rows={2}
          />
        </div>
      </div>

      <div className="space-y-3 mt-4 border-t border-(--color-border) pt-4">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('is_featured')}
            className="h-4 w-4 rounded border-gray-300 text-(--color-primary) focus:ring-(--color-primary)"
          />
          <span className="text-sm text-(--color-text)">Featured</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('flagged')}
            className="h-4 w-4 rounded border-gray-300 text-(--color-primary) focus:ring-(--color-primary)"
          />
          <span className="text-sm text-(--color-text)">Flagged</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            {...register('is_approved')}
            className="h-4 w-4 rounded border-gray-300 text-(--color-primary) focus:ring-(--color-primary)"
          />
          <span className="text-sm text-(--color-text)">Approved</span>
        </label>
      </div>
    </div>
  );
};

export default SettingsForm;
