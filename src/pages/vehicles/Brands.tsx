import { PageHeader } from '@/components';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const Brands = () => {
  return (
    <div>
      <PageHeader
        title="Vehicle Brands"
        description="Manage vehicle brands and their operations."
        icon={<BuildingStorefrontIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Brands management coming soon...</div>
    </div>
  );
};

export default Brands;
