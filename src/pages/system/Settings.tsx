import PageHeader from '@/components/PageHeader';
import { CogIcon } from '@heroicons/react/24/outline';

const Settings = () => {
  return (
    <div>
      <PageHeader
        title="System Settings"
        description="Manage system settings and configurations."
        icon={<CogIcon className="h-12 w-12" />}
      />
      <div className="mt-8">Settings panel coming soon...</div>
    </div>
  );
};

export default Settings;
