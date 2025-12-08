import PageHeader from '@/components/PageHeader';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

const Maintenance = () => {
  return (
    <div>
      <PageHeader
        title="Maintenance Mode"
        description="Manage system maintenance mode and operations."
        icon={<WrenchScrewdriverIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Maintenance controls coming soon...</div>
    </div>
  );
};

export default Maintenance;
