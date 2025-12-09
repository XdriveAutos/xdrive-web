import PageHero from '@/components/Landing/PageHero';

const Partners = () => {
  return (
    <div className="min-h-[60vh]">
      <PageHero
        title="Our Partners"
        subtitle="Collaborating with industry leaders to bring you the best."
      />
      <div className="container mx-auto px-4 py-16">
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto text-center mb-12 text-lg">
          We collaborate with industry leaders to bring you the best automotive
          services. Together, we drive innovation and excellence.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Placeholder for partners grid */}
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-medium border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            Partner 1
          </div>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-medium border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            Partner 2
          </div>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-medium border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            Partner 3
          </div>
          <div className="h-32 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 font-medium border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            Partner 4
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partners;
