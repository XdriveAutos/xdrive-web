import PageHero from '@/components/Landing/PageHero';
import {
  WrenchScrewdriverIcon,
  GlobeAltIcon,
  BuildingStorefrontIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

const About = () => {
  const businessActivities = [
    {
      title: 'Manufacturing & Assembly',
      description:
        'We proudly operate as assemblers and manufacturers of high-quality motor vehicles, ensuring top-tier engineering and performance.',
      icon: WrenchScrewdriverIcon,
    },
    {
      title: 'Import & Export',
      description:
        'Connecting global markets, we act as major importers and exporters, bridging the gap between international automotive standards and local needs.',
      icon: GlobeAltIcon,
    },
    {
      title: 'Supply & Dealership',
      description:
        'As trusted suppliers and dealers, we provide a wide range of vehicles to meet diverse consumer and commercial demands.',
      icon: BuildingStorefrontIcon,
    },
    {
      title: 'Vehicle Categories',
      description:
        'Our expertise covers a broad spectrum of motor vehicles including Cars, Lorries, Buses, Vans, and other specialized automobiles.',
      icon: TruckIcon,
    },
  ];

  return (
    <div className="min-h-[60vh]">
      <PageHero
        title="About Us"
        subtitle="Driving innovation in the automobile industry."
      />
      <div className="container mx-auto px-4 py-16">
        {/* Mission Statement */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <p className="text-gray-600 leading-relaxed text-lg">
            At XDRIVE, we are dedicated to revolutionizing the automobile
            industry. Our mission is to provide a seamless, trustworthy, and
            premium experience for all your vehicle needs. Whether you are
            looking to buy, sell, rent, or service your car, we have you covered
            with our state-of-the-art platform and expert team.
          </p>
        </div>

        {/* What We Do Section */}
        <div>
          <h2 className="text-3xl font-bold text-center text-(--color-primary) mb-12">
            What We Do
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {businessActivities.map((activity, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 flex flex-col items-center text-center group"
              >
                <div className="h-16 w-16 bg-blue-50 text-(--color-primary) rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <activity.icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {activity.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {activity.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
