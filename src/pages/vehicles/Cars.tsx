import { PageHeader } from '@/components';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const Cars = () => {
  return (
    <div>
      <PageHeader
        title="Cars"
        description="Manage cars and their operations."
        icon={<BuildingStorefrontIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Cars management coming soon...</div>
    </div>
  );
};

export default Cars;
