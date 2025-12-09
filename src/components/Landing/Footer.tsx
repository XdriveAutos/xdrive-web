import { Link } from 'react-router-dom';
import Logo from '../../assets/xdrive.png';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
          {/* Logo and Description */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={Logo} alt="XDRIVE" className="h-8 w-auto" />
              <span className="text-xl font-bold tracking-tight">XDRIVE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              TO CARRY ON BUSINESS AS ASSEMBLERS, MANUFACTURERS, IMPORTERS,
              EXPORTERS, SUPPLIERS AND DEALERS IN MOTOR VEHICLES, WHETHER
              CLASSIFIED AS CARS, LORRIES, BUSES, VANS OR OTHERWISE.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col md:items-end gap-4">
            <h3 className="text-lg font-semibold mb-2">Legal</h3>
            <div className="flex flex-col md:items-end gap-3 text-gray-400">
              <Link to="#" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-sm text-gray-500 text-center md:text-left">
          &copy; {new Date().getFullYear()} XDRIVE AUTOMOBILES LIMITED. RC
          7538475. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
