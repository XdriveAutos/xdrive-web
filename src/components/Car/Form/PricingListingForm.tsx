import { useFormContext } from 'react-hook-form';
import { Input } from '@/components';
import { UpdateCarRequest } from '@/interfaces';

const PricingListingForm = () => {
  const { register, watch } = useFormContext<UpdateCarRequest>();
  const listingType = watch('listing_type');

  const inputClass =
    'w-full rounded-lg border border-(--color-border) bg-(--color-background) p-2.5 text-sm text-(--color-text) focus:border-(--color-primary) focus:outline-none focus:ring-1 focus:ring-(--color-primary)';

  return (
    <div className="bg-(--color-surface) rounded-2xl border border-(--color-border) p-6 space-y-4">
      <h2 className="text-lg font-bold text-(--color-text) border-b pb-2">
        Pricing & Listing
      </h2>
      <div className="space-y-4">
        <Input
          label="Price"
          type="number"
          {...register('price', { required: 'Required' })}
        />

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Price Type
          </label>
          <select {...register('price_negotiable')} className={inputClass}>
            <option value="fix_amount">Fixed Amount</option>
            <option value="negotiable">Negotiable</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-(--color-text)">
            Listing Type
          </label>
          <select {...register('listing_type')} className={inputClass}>
            <option value="sell">Sell</option>
            <option value="swap">Swap</option>
          </select>
        </div>

        {(listingType === 'swap' || listingType === 'sell') && (
          <>
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--color-text)">
                Swap Method
              </label>
              <select {...register('swap_method')} className={inputClass}>
                <option value="">Select Method</option>
                {['sell', 'swap', 'both'].map((opt) => (
                  <option key={opt} value={opt} className="capitalize">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-(--color-text)">
                Swap With
              </label>
              <textarea
                {...register('swap_with')}
                className={inputClass}
                placeholder="What to swap with?"
                rows={3}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PricingListingForm;
