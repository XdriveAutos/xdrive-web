import PageHeader from '@/components/PageHeader';
import { CreditCardIcon } from '@heroicons/react/24/outline';

const Subscriptions = () => {
  return (
    <div>
      <PageHeader
        title="Subscriptions"
        description="Manage customer subscriptions and billing."
        icon={<CreditCardIcon className="h-12 w-12" />}
      />

      <div className="bg-(--color-surface) border border-dashed border-(--color-primary)/30 rounded-3xl p-16 text-center shadow-inner mt-8">
        <h2 className="text-2xl font-bold text-(--color-text) mb-4">
          Coming Soon
        </h2>
        <p className="text-(--color-body) max-w-md mx-auto leading-relaxed">
          Subscriptions management interface is under development.
        </p>
      </div>
    </div>
  );
};

export default Subscriptions;
