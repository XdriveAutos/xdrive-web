import { PageHeader } from '@/components';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const Models = () => {
  return (
    <div>
      <PageHeader
        title="Vehicle Models"
        description="Manage vehicle models and their operations."
        icon={<BuildingStorefrontIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Models management coming soon...</div>
    </div>
  );
};

export default Models;
