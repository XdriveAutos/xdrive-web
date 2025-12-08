import PageHeader from '@/components/PageHeader';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const Plans = () => {
  return (
    <div>
      <PageHeader
        title="Service Plans"
        description="Manage service plans and their operations."
        icon={<CurrencyDollarIcon className="h-12 w-12" />}
      />

      <div className="bg-(--color-surface) border border-dashed border-(--color-primary)/30 rounded-3xl p-16 text-center shadow-inner mt-8">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
          Coming Soon
        </h2>
        <p className="text-(--color-body) max-w-md mx-auto leading-relaxed">
          Plans management interface is under development.
        </p>
      </div>
    </div>
  );
};

export default Plans;
