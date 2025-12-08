import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Button from '@/components/Button';
import xdriveLogo from '@/assets/xdrive.png';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-2xl px-8 py-12">
        <div className="text-center">
          {/* Logo */}
          <div className="w-24 h-24 mx-auto mb-8">
            <img
              src={xdriveLogo}
              alt="Xdrive"
              className="w-full h-full object-contain"
            />
          </div>

          {/* 404 Icon */}
          <div className="mb-6">
            <SearchOffIcon sx={{ fontSize: 80, color: '#366BD6' }} />
          </div>

          {/* 404 Text */}
          <h1 className="text-8xl font-bold text-gray-900 mb-4">404</h1>

          {/* Title */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Page Not Found
          </h2>

          {/* Description */}
          <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Please
            check the URL or return to the dashboard.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={() => navigate('/dashboard')}
              icon={<HomeIcon fontSize="small" />}
              iconPosition="left"
            >
              Go to Dashboard
            </Button>

            <button
              onClick={() => navigate(-1)}
              className="text-blue-600 hover:text-blue-700 font-medium transition-colors px-6 py-2"
            >
              Go Back
            </button>
          </div>

          {/* Additional Help */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">
              Need help? Contact support at support@xdrive.com
            </p>
            <p className="text-xs text-gray-400">
              © 2025 Xdrive Automobile Limited. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
