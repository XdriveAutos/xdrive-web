import { PageHeader } from '@/components';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const BodyTypes = () => {
  return (
    <div>
      <PageHeader
        title="Body Types"
        description="Manage body types and their operations."
        icon={<BuildingStorefrontIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Body types management coming soon...</div>
    </div>
  );
};

export default BodyTypes;
